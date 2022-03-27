import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { DataModel } from '@app/models';
import { UtilsHelper } from '@helpers/utils';
import Chart from 'chart.js/auto';
import zoomPlugin from 'chartjs-plugin-zoom';

@Component({
  selector: 'app-data-chart',
  templateUrl: './data-chart.component.html',
  styleUrls: ['./data-chart.styles.scss'],
})
export class DataChartComponent implements OnInit, OnChanges {
  public utilsHelper = new UtilsHelper();

  @Input() selected: DataModel[] = [];

  private labelsArray = Array.from(Array(7000).keys());
  public chart: any;

  private defaultItem = {
    label: '',
    data: [{ x: 0, y: 0 }],
    fill: false,
    borderColor: 'rgba(255, 255, 255, 0)',
  };

  private defaultData = {
    labels: this.labelsArray,
    datasets: [this.defaultItem],
  };

  /**
   * On Changes
   */
  ngOnInit() {
    const canvas = <HTMLCanvasElement>document.getElementById('chart');
    const ctx = canvas.getContext('2d');

    Chart.register(zoomPlugin);

    this.chart = new Chart(ctx, {
      type: 'line',
      data: this.defaultData,
      options: {
        responsive: true,
        interaction: {
          mode: 'index',
          intersect: false,
        },
        scales: {
            yAxes: {
              display: true,
              stacked: true,
              min: 0, // minimum value
            },
            xAxes: {
              display: true,
              stacked: true,
              min: 0, // minimum value
              max: 70000, // minimum value
            }
        },
        plugins: {
          zoom: {
            limits: {
              y: {min: 0, max: 100},
              x: {min: 0}
            },
            zoom: {
              wheel: {
                enabled: true,
              },
              pinch: {
                enabled: true
              },
              mode: 'xy',
            },
          }
        }
      },
    });
  }

  /**
   * On changes
   */
  ngOnChanges(changes: SimpleChanges) {
    if ( changes['selected'] && changes['selected'].currentValue && this.chart) {
      this.selected = changes['selected'].currentValue;
      this.updateView();
    }
  }

  /**
   * Update chart view after selected rows changed
   */
  updateView() {
    let newData: any[] = [];

    if (this.selected.length) {
      this.selected.forEach((item: DataModel, i: number) => {
        const colorIndex = i > this.utilsHelper.colors.length ? i % this.utilsHelper.colors.length : i;
        newData.push({
          label: item.device.name,
          data: item.data,
          borderColor: this.utilsHelper.colors[colorIndex],
          backgroundColor: this.utilsHelper.colors[colorIndex],
        });
      });
    }

    this.chart.data.datasets = [...newData];
    this.chart.update();
  }
}
