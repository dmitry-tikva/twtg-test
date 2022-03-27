import { Component, OnInit } from '@angular/core';
import { FiltersModel, DataModel, DisplayedColumns } from '@models/index';
import { FiltersService } from '@services/filters/filters.service';
import { DashboardService } from '@services/dashboard/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.styles.scss'],
})

export class DashboardComponent implements OnInit {
  public loading: boolean;
  public customFilters: FiltersModel = {};

  public rows: DataModel[] = [];
  public selected: DataModel[] = [];

  public displayedColumns: DisplayedColumns[] = [
    { name: 'Date', path: 'timestamp', type: 'date' },
    { name: 'Device', path: 'device.name', type: 'default' }
  ]

  public searchFields: string[] = ['device.name'];

  constructor(
    private dashboardService: DashboardService,
    private filterService: FiltersService
  ) {
    this.loading = true;
  }

  ngOnInit(): void {
    // Get default filters first
    this.getFilters();
  }

  /**
   * Get Filters
   */
  async getFilters() {
    this.customFilters = await this.filterService.dashboardFilters();

    this.getAllWithPagination();
  }

  /**
   * Get all items with pagination from server API
   */
  getAllWithPagination() {

    // Show loader
    this.loading = true;

    this.customFilters.limit = 300; // To get all items without pagination

    // Get all with new filters
    this.dashboardService.getAll(this.customFilters).subscribe((res: {data: DataModel[], totRecords: number}) => {

      // Save data
      this.rows = res.data;

      // Hide loader
      this.loading = false;
    });
  }
}
