import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { DashboardService } from './dashboard.service';

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
});
