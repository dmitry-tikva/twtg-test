import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { DashboardService } from './dashboard.service';
import { DATASETS } from '../../../assets/mock/test-dataset';

describe('DashboardService', () => {

  let dashboardService: DashboardService,
      httpTestingController: HttpTestingController;

  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        DashboardService
      ]
    })

    dashboardService = TestBed.get(DashboardService);
    httpTestingController = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    expect(dashboardService).toBeTruthy();
  });

  it('Should retrieve all data', () => {
    dashboardService.getAll({offset: 1, limit: 10, search: ''}).subscribe((response) => {
      expect(response.data).withContext('No data returned').toBeTruthy();
      expect(response.data.length).withContext('Incorrect number of items').toBe(10);
    });

    const req = httpTestingController.expectOne({method: 'GET', url: 'api/dataset?offset=1&limit=10'});
    req.flush({data: Object.values(DATASETS)});
  });

  afterEach(() => {
    httpTestingController.verify();
  });
});
