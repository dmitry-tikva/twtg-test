import { fakeAsync, ComponentFixture, TestBed, flush } from '@angular/core/testing';
import { DataChartComponent } from './data-chart.component';
import { DATASETS } from '../../../assets/mock/test-dataset';
import { By } from '@angular/platform-browser';

describe('DataChartComponent', () => {
  let component: DataChartComponent;
  let fixture: ComponentFixture<DataChartComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [DataChartComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DataChartComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
  
  it('should show placeholder', fakeAsync(() => {
    expect(component.selected.length).withContext('selected items should be empty by default').toBe(0);
    expect(component.chart.attached).withContext('chart is not attached').toBeTruthy();

    fixture.detectChanges();

    // Placeholder should be visible
    let placeholder = fixture.debugElement.query(By.css('.place-holder-chart'));
    expect(placeholder).withContext('incorrect amount of rows').toBeTruthy();

    // Set selected items
    component.selected = DATASETS;
    fixture.detectChanges();

    expect(component.selected).withContext('selected items was not set correctly').toEqual(DATASETS);

    let newPlaceholder = fixture.debugElement.query(By.css('.place-holder-chart'));
    expect(newPlaceholder).withContext('incorrect amount of rows').toBeFalsy();

  }));

  it('should set all selected items to chart', fakeAsync(() => {
    expect(component.selected.length).withContext('selected items should be empty by default').toBe(0);
    expect(component.chart.attached).withContext('chart is not attached').toBeTruthy();

    fixture.detectChanges();

    // Set selected items
    component.selected = DATASETS;
    fixture.detectChanges();
    
    expect(component.selected).withContext('selected items was not set correctly').toEqual(DATASETS);

    // Update chart
    component.updateView();

    expect(component.chart.data.datasets.length).withContext('chart wan not added').toBe(component.selected.length);

    // Set selected items
    component.selected = [];
    fixture.detectChanges();

    // Update chart
    component.updateView();

    expect(component.chart.data.datasets.length).withContext('chart wan not added').toBe(component.selected.length);

  }));
});
