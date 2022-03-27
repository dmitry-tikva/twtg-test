import { Injectable } from '@angular/core';
import { FiltersModel } from '@app/models';

@Injectable()
export class UtilsHelper {
  colors = ['#fb8072','#80b1d3','#bebada','#fdb462','#fdb462','#bc80bd','#bebada','#fccde5','#fccde5','#bc80bd','#80b1d3','#8dd3c7','#8dd3c7','#fdb462','#d9d9d9','#b3de69','#bebada','#fb8072','#ffffb3','#fb8072','#8dd3c7','#ffffb3','#ffffb3','#b3de69','#80b1d3','#ccebc5','#d9d9d9','#fb8072','#d9d9d9','#fb8072','#ccebc5','#bebada','#8dd3c7','#8dd3c7','#fb8072','#bebada','#80b1d3','#fccde5','#80b1d3','#bebada','#ffffb3','#8dd3c7','#80b1d3','#8dd3c7','#ffffb3','#bc80bd','#fdb462','#bebada','#d9d9d9','#8dd3c7','#fccde5','#8dd3c7','#fdb462','#8dd3c7','#b3de69','#fccde5','#ffed6f','#b3de69','#bebada','#b3de69','#80b1d3','#ffffb3','#b3de69','#fdb462','#80b1d3','#fb8072','#fdb462','#bebada','#ffffb3','#ffffb3','#ffffb3','#fb8072','#ffffb3','#fb8072','#bebada',
  ];

  queryParams(params: FiltersModel) {
    return Object.keys(params)
      .map((key) => {
        return key + '=' + params[key as keyof FiltersModel];
      })
      .join('&');
  }

  removeEmptyStrings(data: FiltersModel) {
    return Object.keys(data).reduce((acc, prop) => {
      // check if it's not empty or null ot undefined
      if (
        data[prop as keyof FiltersModel] !== '' &&
        data[prop as keyof FiltersModel] !== undefined &&
        data[prop as keyof FiltersModel] !== null
      ) {
        return Object.assign(acc, { [prop]: data[prop as keyof FiltersModel] });
      }

      return acc;
    }, {});
  }
}
