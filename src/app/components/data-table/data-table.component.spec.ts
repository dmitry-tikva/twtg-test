import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatPaginatorModule } from '@angular/material/paginator';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DataTableComponent } from './data-table.component';
import { DATASETS } from '../../../assets/mock/test-dataset';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { By } from '@angular/platform-browser';

describe('DataTableComponent', () => {
  let component: DataTableComponent;
  let fixture: ComponentFixture<DataTableComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [DataTableComponent],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        MatPaginatorModule,
        MatTableModule,
        MatSortModule,
        MatCheckboxModule,
        MatInputModule,
        BrowserAnimationsModule
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DataTableComponent);
    component = fixture.componentInstance;

    // Set mock input variables
    component.source = DATASETS;
    component.columns = [
      { name: 'Date', path: 'timestamp', type: 'date' },
      { name: 'Device', path: 'device.name', type: 'default' }
    ];
    component.searchFields = ['device.name'];

    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });

  it('should show correct tr amount', (done) => {
    expect(component.source).withContext('Datasets was not set correctly').toEqual(DATASETS);

    fixture.detectChanges();
    fixture.whenStable().then(() => {
      fixture.detectChanges();

      let tableRows = fixture.nativeElement.querySelectorAll('#data-table tr');
      expect(tableRows.length).withContext('Incorrect amount of rows').toBe(11);

      // Header row
      let headerRow = tableRows[0];
      expect(headerRow.cells[1].textContent.trim()).withContext('Incorrect second th title').toBe('Date');
      expect(headerRow.cells[2].textContent.trim()).withContext('Incorrect third th title').toBe('Device');

      // Data rows
      let row1 = tableRows[1];
      expect(row1.cells[1].textContent.trim()).toBe('1970-01-20 01:47:27');
      expect(row1.cells[2].textContent.trim()).toBe('BB-AXF-000-AB-004');

      done();
    });
  });

  it('should search by name', (done) => {
    expect(component.searchFields).withContext('search fields was not set correctly').toEqual(['device.name']);

    fixture.detectChanges();
    fixture.whenStable().then(() => {
      fixture.detectChanges();

      // Set search
      let searchInput = fixture.debugElement.query(By.css('#search-input')).nativeElement;
      searchInput.value = 'BB-AXF-000-AB-007';
      searchInput.dispatchEvent(new Event('keyup'));
      fixture.detectChanges();

      expect(component.dataSource.filter).withContext('search value was not set to table').toBe('bb-axf-000-ab-007');

      let tableRows = fixture.nativeElement.querySelectorAll('#data-table tr');
      expect(tableRows.length).withContext('incorrect amount of rows').toBe(2);

      // Data rows
      let row1 = tableRows[1];
      expect(row1.cells[1].textContent.trim()).toBe('1970-01-20 01:47:27');
      expect(row1.cells[2].textContent.trim()).toBe('BB-AXF-000-AB-007');

      // Clear search
      searchInput.value = '';
      searchInput.dispatchEvent(new Event('keyup'));
      fixture.detectChanges();

      let newTableRows = fixture.nativeElement.querySelectorAll('#data-table tr');
      expect(newTableRows.length).withContext('incorrect amount of rows').toBe(11);

      done();
    });
  });

  it('should select / unselect all items', (done) => {
    expect(component.selected.length).withContext('should no selected row by default').toBe(0);

    fixture.detectChanges();
    fixture.whenStable().then(() => {
      fixture.detectChanges();

      // Set search
      let masterCheckbox = fixture.debugElement.query(By.css('#data-table tr th .mat-checkbox label')).nativeElement;

      // Select all rows
      masterCheckbox.click();
      fixture.detectChanges();

      expect(component.selected.length).withContext('incorrect amount of selected row').toBe(10);

      // Unselect all rows
      masterCheckbox.click();
      fixture.detectChanges();

      expect(component.selected.length).withContext('incorrect amount of selected row').toBe(0);

      done();
    });
  });

  it('should select row', (done) => {
    expect(component.selected.length).withContext('should no selected row by default').toBe(0);

    fixture.detectChanges();
    fixture.whenStable().then(() => {
      fixture.detectChanges();

      // Set search
      let rowCheckbox = fixture.debugElement.query(By.css('#data-table tr.mat-row td .mat-checkbox label')).nativeElement;

      // Select first
      rowCheckbox.click();
      fixture.detectChanges();

      expect(component.selected.length).withContext('incorrect amount of selected row').toBe(1);
      expect(component.selected[0]).withContext('selected wrong row').toEqual(component.source[0]);

      // Unselect first row
      rowCheckbox.click();
      fixture.detectChanges();

      expect(component.selected.length).withContext('incorrect amount of selected row').toBe(0);

      done();
    });
  });
});
