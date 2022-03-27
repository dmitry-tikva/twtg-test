import { Injectable } from '@angular/core';
import {
  InMemoryDbService,
  RequestInfo,
  ResponseOptions,
  STATUS,
} from 'angular-in-memory-web-api';
import { DATASETS } from '@assets/mock/dataset';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const dataset = DATASETS;

    return { dataset };
  }

  // HTTP GET interceptor to support offset and limit query parameters
  get(reqInfo: RequestInfo) {
    if (
      reqInfo.query.has('offset') &&
      reqInfo.query.has('limit') &&
      reqInfo.collection
    ) {
      const offset = +reqInfo.query.get('offset')[0];
      const limit = +reqInfo.query.get('limit')[0];

      // Remove offset and limit from query parameters so they're not considered as filtering parameters for the
      // collection later on.
      reqInfo.query.delete('offset');
      reqInfo.query.delete('limit');

      return reqInfo.utils.createResponse$(() => {
        const collection = reqInfo.collection as Array<{ id: any }>;

        let body: any = {};
        let data: any;

        if (reqInfo.id) {
          data = reqInfo.utils.findById(collection, reqInfo.id);
        } else {
          const filteredCollection = InMemoryDataService.applyQuery(
            collection,
            reqInfo.query
          );

          body.currentPage = offset;
          body.totRecords = filteredCollection.length;
          body.totPages = Math.ceil(body.totRecords / limit);

          console.log(`offset: ${offset}, limit: ${limit}`);
          data = filteredCollection
            .sort(
              (a: any, b: any) =>
                Date.parse(b.createdAt) - Date.parse(a.createdAt)
            )
            .slice(offset * limit - limit, offset * limit);
          console.log(
            `Total count: ${body.totRecords}, and returned data count: ${data.length}`
          );
        }

        body.data = [...data];

        const options: ResponseOptions = body.data
          ? {
              body,
              status: STATUS.OK,
            }
          : {
              body: {
                error: `'${reqInfo.collectionName}' with id='${reqInfo.id}' not found`,
              },
              status: STATUS.NOT_FOUND,
            };
        return InMemoryDataService.finishOptions(options, reqInfo);
      });
    } else {
      return undefined;
    }
  }

  private static finishOptions(
    options: ResponseOptions,
    { headers, url }: RequestInfo
  ) {
    options.statusText = options.status?.toString();
    options.headers = headers;
    options.url = url;

    return options;
  }

  private static applyQuery(
    collection: Array<object>,
    query: Map<string, string[]>
  ) {
    if (!query.has('search')) {
      return collection;
    }

    // AND the RegExp conditions
    return collection.filter((row: any) => {
      if (row.device && row.device.name && row.device.name.indexOf(query.get('search')) > -1) {
        return true;
      }

      return false;
    });
  }

  private static genId(collection: any): number {
    return collection.length > 0
      ? Math.max(...collection.map((i: any) => i.id)) + 1
      : 11;
  }
}
