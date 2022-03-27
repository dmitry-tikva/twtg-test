import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataChartComponent } from './data-chart.component';
import { HelpersModule } from '@app/helpers/helpers.module';

@NgModule({
  imports: [CommonModule, HelpersModule],
  exports: [DataChartComponent],
  declarations: [DataChartComponent]
})
export class DataChartModule {}
