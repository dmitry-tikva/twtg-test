import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DashboardRoutes } from './dashboard.routing';

// import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { HelpersModule } from '@helpers/helpers.module';

// import { LoaderModule } from '@components/loader/loader.module';
// import { PaginationModule } from '@components/pagination/pagination.module';
// import { MatInputModule } from '@angular/material/input';
// import { MatIconModule } from '@angular/material/icon';
// import { MatDialogModule } from '@angular/material/dialog';
// import { MatButtonModule } from '@angular/material/button';
// import { MatCardModule } from '@angular/material/card';
// import { MatSnackBarModule } from '@angular/material/snack-bar';
// import { MatListModule } from '@angular/material/list';
// import { MatDividerModule } from '@angular/material/divider';

import { DashboardComponent } from './component/dashboard.component';
import { DataTableModule } from '@app/components/data-table/data-table.module';
import { LoaderModule } from '@app/components/loader/loader.module';
import { DataChartModule } from '@app/components/data-chart/data-chart.module';

@NgModule({
  imports: [
    CommonModule,
    // ReactiveFormsModule,
    // FormsModule,
    // HelpersModule,
    RouterModule.forChild(DashboardRoutes),

    LoaderModule,
    DataTableModule,
    DataChartModule
    
    // PaginationModule,
    // MatInputModule,
    // MatIconModule,
    // MatButtonModule,
    // MatDialogModule,
    // MatCardModule,
    // MatSnackBarModule,
    // MatListModule,
    // MatDividerModule,

    // LoaderModule,
  ],
  declarations: [
    DashboardComponent,
  ],
})
export class DashboardModule {}
