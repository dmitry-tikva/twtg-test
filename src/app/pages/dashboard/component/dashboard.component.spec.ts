import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import {DebugElement} from '@angular/core';
import { DashboardComponent } from './dashboard.component';
import { DashboardService } from '../../../services/dashboard/dashboard.service';
import { FiltersService } from '../../../services/filters/filters.service';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let el: DebugElement;
  let fixture: ComponentFixture<DashboardComponent>;

  let dashboardService: any;
  let filtersService: any;

  beforeEach(fakeAsync(() => {
    const dashboardServiceSpy = jasmine.createSpyObj('DashboardService', ['getAll']);
    const filtersServiceSpy = jasmine.createSpyObj('FiltersService', ['dashboardFilters']);

    TestBed.configureTestingModule({
      declarations: [DashboardComponent],
      providers: [
        {provide: DashboardService, useValue: dashboardServiceSpy},
        {provide: FiltersService, useValue: filtersServiceSpy}
      ]
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(DashboardComponent);
      component = fixture.componentInstance;
      el = fixture.debugElement;
      dashboardService = TestBed.inject(DashboardService);
      filtersService = TestBed.inject(FiltersService);
    });

  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
