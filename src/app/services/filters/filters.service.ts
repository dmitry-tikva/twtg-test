import { Injectable } from '@angular/core';
import { FiltersModel } from '@models/index';

@Injectable()
export class FiltersService {
  public defaultFilters(): FiltersModel {
    return {
      offset: 1,
      limit: 50,
      search: '',
    };
  }

  public dashboardFilters(): FiltersModel {
    return {
      offset: 1,
      limit: 20,
      search: '',
      sortField: '',
      orderBy: ''
    };
  }
}
