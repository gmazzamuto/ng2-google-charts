declare var google: any;

import { Injectable } from '@angular/core';

@Injectable()
export class GoogleChartsLoaderService {

  private chartPackage: { [id: string] : string; }= {
    'AnnotationChart': 'annotationchart',
    'AreaChart': 'corechart',
    'Bar': 'bar',
    'BarChart': 'corechart',
    'BubbleChart': 'corechart',
    'Calendar': 'calendar',
    'CandlestickChart': 'corechart',
    'ColumnChart': 'corechart',
    'ComboChart': 'corechart',
    'PieChart': 'corechart',
    'Gantt': 'gantt',
    'Gauge': 'gauge',
    'GeoChart': 'geochart',
    'Histogram': 'corechart',
    'Line': 'line',
    'LineChart': 'corechart',
    'Map': 'map',
    'OrgChart': 'orgChart',
    'Sankey': 'sankey',
    'Scatter': 'scatter',
    'ScatterChart': 'corechart',
    'SteppedAreaChart': 'corechart',
    'Table': 'table',
    'Timeline': 'timeline',
    'TreeMap': 'treemap',
    'WordTree': 'wordtree',
  };

  load(chartType: string) {
    return new Promise((resolve, reject) => {
      google.charts.load('45', {
        'packages': [this.chartPackage[chartType]],
        'callback': resolve
      });
    });
  }
}
