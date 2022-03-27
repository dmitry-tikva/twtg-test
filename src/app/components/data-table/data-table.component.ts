import { Component, EventEmitter, Input, Output, OnChanges, SimpleChanges, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DataModel, DisplayedColumns } from '@app/models';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-data-table',
  templateUrl: 'data-table.component.html',
  styleUrls: ['./data-table.styles.scss'],
})
export class DataTableComponent implements OnInit, OnChanges, AfterViewInit {
  @Input() source: DataModel[] = [];
  @Input() columns: DisplayedColumns[] = [];
  @Input() searchFields: string[] = [];

  @Input() selected: DataModel[] = [];
  @Output() selectedChange: EventEmitter<DataModel[]> = new EventEmitter<DataModel[]>();

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  pageSizeOptions = [10, 25, 50, 100];

  public dataSource: MatTableDataSource<DataModel>;
  public selection: SelectionModel<DataModel>;
  public displayedColumns: string[] = [];
  public displayedColumnsRefs: string[] = [];

  /**
   * On init
   */
  ngOnInit() {
    // Set data and create columns
    this.dataSource = new MatTableDataSource<DataModel>(this.source);

    // Set sorting fields
    this.dataSource.sortingDataAccessor = (item, property) => {
      return this.getDeepValue(item, property);
    };

    // Set filtering fields
    this.dataSource.filterPredicate = (item: DataModel, filter: string) => {
      return this.searchFields.filter((property) => {
        return this.getDeepValue(item, property).toLocaleLowerCase().includes(filter);
      }).length > 0;
    }

    // Set selection
    this.selection = new SelectionModel<DataModel>(true, this.selected, true);

    // Create columns
    this.displayedColumns = ['select', ...this.columns.map((el) => el.name)];
    this.displayedColumnsRefs = ['select', ...this.columns.map((el) => el.path)];
  }

  /**
   * On after view init
   */
  ngAfterViewInit() {
    // Set pagination and sort
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  /**
   * On Changes
   */
  ngOnChanges(changes: SimpleChanges) {
    if (changes['selected'] && changes['selected'].currentValue && this.selection) {
      this.selected = changes['selected'].currentValue
      this.selection.clear();
      this.selection.select(...this.selected);
    }
  }

  /**
   * Emit selected rows was changed
   */
  changeSelected() {
    this.selected = [...this.selection.selected];
    this.selectedChange.emit(this.selected);
  }

  /**
   * Filter table rows by search input value
   * @param event on keyUp input search event
   */
  search(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  /**
   * Check if all rows selected
   * @returns boolean if all rows selected
   */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /**
   * Select / Un select all rows in table
   */
  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();

      // Emit selection changed
      this.changeSelected();

      return;
    }

    this.selection.select(...this.dataSource.data);

    // Emit selection changed
    this.changeSelected();
  }

  /**
   * Select clicked row
   * @param row item of data list
   */
  selectRow(row: DataModel) {
    this.selection.toggle(row);

    // Emit selection changed
    this.changeSelected();
  }

  /**
   * Get label text of row
   * @param row item in table
   * @returns text for label of row
   */
  checkboxLabel(row?: DataModel): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${
      row.position + 1
    }`;
  }

  /**
   * Get deeply value in object by path
   * @param obj source object to get value
   * @param path string with path to value
   * @returns value source object's property by path
   */
  getDeepValue(obj: DataModel, path: string) {
    return path
      .replace(/\[|\]\.?/g, '.')
      .split('.')
      .filter((s) => s)
      .reduce((acc, val) => acc && acc[val], obj)
      .toString();
  }
}
