import { Component, ViewChild } from '@angular/core';
import { ChartReadyEvent, ChartErrorEvent, ChartSelectEvent,
   ChartMouseOverEvent, ChartMouseOutEvent } from 'ng2-google-charts';
import { GoogleChartInterface } from 'ng2-google-charts/google-charts-interfaces';

declare var $: any;
declare var google: any;
import { shakespeareData } from './shakespeare';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public selectEvent: ChartSelectEvent;
  public imageURI = '';

  public columnChart: GoogleChartInterface = {
    chartType: 'ColumnChart',
    dataTable: [
      ['Country', 'Performance', 'Profits'],
      ['Germany', 700, 1200],
      ['USA', 300, 600],
      ['Brazil', 400, 500],
      ['Canada', 500, 1000],
      ['France', 600, 1100],
      ['RU', 800, 1000]
    ],
    options: {title: 'Countries'}
  };

  public columnChart2: GoogleChartInterface =  {
    chartType: 'ColumnChart',
    dataTable: [
      ['Country', 'Performance', 'Profits'],
      ['Germany', 0, 0],
      ['USA', 0, 0],
      ['Brazil', 0, 0],
      ['Canada', 0, 0],
      ['France', 0, 0],
      ['RU', 0, 0]
    ],
    options: {
      title: 'Countries',
      animation: {
        duration: 1000,
        easing: 'out',
        startup: true
      }
    }
  };

  public columnChartWTooltips: GoogleChartInterface =  {
    chartType: 'ColumnChart',
    dataTable: [
      ['Event', 'Highest Recent Viewership', {
        type: 'string',
        label: 'Tooltip Chart',
        role: 'tooltip',
        p: {html: true}
      }],
      ['NBA Finals', 22.4, ''],
      ['NFL Super Bowl', 111.3, ''],
      ['MLB World Series', 19.2, ''],
      ['UEFA Champions League Final', 1.9, ''],
      ['NHL Stanley Cup Finals', 6.4, ''],
      ['Wimbledon Men\'s Championship', 2.4, '']
    ],
    options: {
      title: 'Highest U.S. Viewership for Most Recent Event (in millions)',
      legend: 'none',
      tooltip: {isHtml: true} // This MUST be set to true for your chart to show.
    }
  };

  public tooltipChart: GoogleChartInterface = {
    chartType: 'LineChart',
    dataTable: [
      ['Year', 'NBA Finals', 'NFL Super Bowl', 'MLB World Series',
      'UEFA Champions League Final', 'NHL Stanley Cup Finals',
      'Wimbledon Men\'s Championship'],
      ['2005', 12.5, 98.7, 25.3, 0.6, 3.3, 2.8],
      ['2006', 13, 90.7, 17.1, 0.8, 2.8, 3.4],
      ['2007', 9.3, 93, 15.8, 0.9, 1.8, 3.8],
      ['2008', 14.9, 97.5, 17.1, 1.3, 4.4, 5.1],
      ['2009', 14.3, 98.7, 13.6, 2.1, 4.9, 5.7],
      ['2010', 18.2, 106.5, 19.4, 2.2, 5.2, 2.3],
      ['2011', 17.4, 111, 14.3, 4.2, 4.6, 2.7],
      ['2012', 16.8, 111.3, 16.6, 2, 2.9, 3.9],
      ['2013', 16.6, 108.7, 12.7, 1.4, 5.8, 2.5],
      ['2014', 15.7, 111.3, 15, 1.9, 4.7, 2.4]
    ],
    options: {
      title: 'U.S. Viewership Over The Last 10 Years (in millions)',
      legend: 'none',
      width: 200
    }
  };

  public barChart = {
    chartType: 'Bar',
    dataTable: [
      ['Year', 'Sales', 'Expenses', 'Profit'],
      ['2014', 1000, 400, 200],
      ['2015', 1170, 460, 250],
      ['2016', 660, 1120, 300],
      ['2017', 1030, 540, 350]
    ],
    options: {
      chart: {
        title: 'Company Performance',
        subtitle: 'Sales, Expenses, and Profit: 2014-2017'
      }
    }
  };

  public stackedColumnChart = {
    chartType: 'ColumnChart',
    dataTable: [
      ['Genre', 'Fantasy & Sci Fi', 'Romance', 'Mystery/Crime', 'General',
       'Western', 'Literature', { role: 'annotation' } ],
      ['2010', 10, 24, 20, 32, 18, 5, ''],
      ['2020', 16, 22, 23, 30, 16, 9, ''],
      ['2030', 28, 19, 29, 30, 12, 13, '']
    ],
    options: {
      width: 600,
      height: 400,
      legend: { position: 'top', maxLines: 3 },
      bar: { groupWidth: '75%' },
      isStacked: true
    }
  };

  public pieChart = {
    chartType: 'PieChart',
    dataTable: [
      ['Task', 'Hours per Day'],
      ['Work',     11],
      ['Eat',      2],
      ['Commute',  2],
      ['Watch TV', 2],
      ['Sleep',    7]
    ],
    options: {
      title: 'Tasks',
      slices: {
        0: {offset: 0.3},
        1: {offset: 0.2}
      }
    }
  };

  public gaugeChart = {
    chartType: 'Gauge',
    dataTable: [
      ['Label', 'Value'],
      ['Value', 1.78]
    ],
    options: {
      animation: {easing: 'out'},
      width: 150, height: 150,
      greenFrom: 1, greenTo: 4,
      minorTicks: 5,
      min: 0, max: 5,
      majorTicks: ['0', '1', '2', '3', '4', '5'],
      greenColor: '#d0e9c6'
    }
  };

  public scatterChart = {
    chartType: 'ScatterChart',
    dataTable: [
      ['Age', 'Weight'],
      [ 8,      12],
      [ 4,      5.5],
      [ 11,     14],
      [ 4,      5],
      [ 3,      3.5],
      [ 6.5,    7]
    ],
    options: {
      title: 'Age vs. Weight comparison',
      hAxis: {title: 'Age', minValue: 0, maxValue: 15},
      vAxis: {title: 'Weight', minValue: 0, maxValue: 15},
      legend: 'none'
    }
  };

 public timelineChart = {
    chartType: 'Timeline',
    dataTable: [
      ['Name', 'From', 'To'],
      [ 'Washington', new Date(1789, 3, 30), new Date(1797, 2, 4) ],
      [ 'Adams',      new Date(1797, 2, 4),  new Date(1801, 2, 4) ],
      [ 'Jefferson',  new Date(1801, 2, 4),  new Date(1809, 2, 4) ]
    ]
 };

 public lineChart = {
    chartType: 'LineChart',
    dataTable: [
      ['Year', 'Sales', 'Expenses'],
      ['2004',  1000,      400],
      ['2005',  1170,      460],
      ['2006',  660,       1120],
      ['2007',  1030,      540]
    ],
    options: {title: 'Company Performance'}
  };

 public comboChart = {
    chartType: 'ComboChart',
    dataTable: [
      ['Month', 'Bolivia', 'Ecuador', 'Madagascar', 'Papua New Guinea', 'Rwanda', 'Average'],
      ['2004/05',  165,      938,         522,             998,           450,      614.6],
      ['2005/06',  135,      1120,        599,             1268,          288,      682],
      ['2006/07',  157,      1167,        587,             807,           397,      623],
      ['2007/08',  139,      1110,        615,             968,           215,      609.4],
      ['2008/09',  136,      691,         629,             1026,          366,      569.6]
    ],
    options: {
      title : 'Monthly Coffee Production by Country',
      vAxis: {title: 'Cups'},
      hAxis: {title: 'Month'},
      seriesType: 'bars',
      series: {5: {type: 'line'}}
    }
  };

  public tableChart = {
    chartType: 'Table',
    dataTable: [
      ['Department', 'Revenues', 'Another column', 'ColorFormat'],
      ['Shoes', 10700, -100, 100],
      ['Sports', -15400, 25, 500],
      ['Toys', 12500, 40, 800],
      ['Electronics', -2100, 889, 1000],
      ['Food', 22600, 78, 1100],
      ['Art', 1100, 42, 400]
    ],
    formatters: [
      {
        columns: [1, 2],
        type: 'NumberFormat',
        options: {
          prefix: '&euro;', negativeColor: 'red', negativeParens: true
        }
      },
      {
        columns: [3],
        type: 'ColorFormat',
        options: {
          ranges: [
            {from: 100, to: 900, fromBgColor: 'green', toBgColor: 'yellow'}
          ]
        }
      }
    ],
    options: {title: 'Countries', allowHtml: true}
  };

 public geoChart = {
    chartType: 'GeoChart',
    dataTable: [
      ['City',   'Population', 'Area'],
      ['Rome',      2761477,    1285.31],
      ['Milan',     1324110,    181.76],
      ['Naples',    959574,     117.27],
      ['Turin',     907563,     130.17],
      ['Palermo',   655875,     158.9],
      ['Genoa',     607906,     243.6],
      ['Bologna',   380181,     140.7],
      ['Florence',  371282,     102.41],
      ['Fiumicino', 67370,      213.44],
      ['Anzio',     52192,      43.43],
      ['Ciampino',  38262,      11]
    ],
    options: {
      region: 'IT',
      displayMode: 'markers',
      colorAxis: {colors: ['green', 'blue']}
    }
  };

  public orgChart: GoogleChartInterface = {
    chartType: 'OrgChart',
    dataTable: [
      ['Name',   'Manager', 'Tooltip'],
      [{v: 'Mike', f: 'Mike<div style="color:red; font-style:italic">President</div>'}, '', 'The President'],
      [{v: 'Jim', f: 'Jim<div style="color:red; font-style:italic">Vice President</div>'}, 'Mike', 'VP'],
      ['Alice', 'Mike', ''],
      ['Bob', 'Jim', 'Bob Sponge'],
      ['Carol', 'Bob', '']
    ],
    options: {
      allowHtml: true,
      allowCollapse: true
    }
  };

  public candlestickChart = {
    chartType: 'CandlestickChart',
    dataTable: [
      ['Mon', 28, 28, 38, 38],
      ['Tue', 38, 38, 55, 55],
      ['Wed', 55, 55, 77, 77],
      ['Thu', 77, 77, 66, 66],
      ['Fri', 66, 66, 22, 22]
    ],
    opt_firstRowIsData: true,
    options: {
      legend: 'none',
      bar: { groupWidth: '100%' }, // Remove space between bars.
      candlestick: {
        fallingColor: { strokeWidth: 0, fill: '#a52714' }, // red
        risingColor: { strokeWidth: 0, fill: '#0f9d58' }   // green
      }
    }
  };

  public treeMap = {
    chartType: 'TreeMap',
    dataTable: [
      ['ID', 'Parent', 'Number of Lines'],
      ['Shakespeare', null, 0],

      ['Comedies', 'Shakespeare', null],
      ['Tragedies', 'Shakespeare', null],
      ['Histories', 'Shakespeare', null]
    ],
    options: {
      highlightOnMouseOver: true,
      maxDepth: 1,
      maxPostDepth: 2,
      minHighlightColor: '#8c6bb1',
      midHighlightColor: '#9ebcda',
      maxHighlightColor: '#edf8fb',
      minColor: '#009688',
      midColor: '#f7f7f7',
      maxColor: '#ee8100',
      headerHeight: 15,
      showScale: true,
      height: 200,
      useWeightedAverageForAggregation: true
    }
  };

  public annotationChart = {
    chartType: 'AnnotationChart',
    dataTable: [
      ['Date', 'Kepler-22b mission', 'Kepler title', 'Kepler text', 'Gliese 163 mission', 'Gliese title',
        'Gliese text'],
      [new Date(2314, 2, 15), 12400, undefined, undefined, 10645, undefined, undefined],
      [new Date(2314, 2, 16), 24045, 'Lalibertines', 'First encounter', 12374, undefined, undefined],
      [new Date(2314, 2, 17), 35022, 'Lalibertines', 'They are very tall', 15766, 'Gallantors', 'First Encounter'],
      [new Date(2314, 2, 18), 12284, 'Lalibertines', 'Attack on our crew!', 34334, 'Gallantors',
        'Statement of shared principles'],
      [new Date(2314, 2, 19), 8476, 'Lalibertines', 'Heavy casualties', 66467, 'Gallantors', 'Mysteries revealed'],
      [new Date(2314, 2, 20), 0, 'Lalibertines', 'All crew lost', 79463, 'Gallantors', 'Omniscience achieved']
    ],
    options: {
      displayAnnotations: true
    }
  };

  private orgChartCollapsed = false;
  private treeMapAppendCount = 0;

 ngOnInit() {
   for (let i = 1; i < 7; i++) {
     this.columnChart2.dataTable[i][1] = Math.round(
       Math.random() * 1000);
     this.columnChart2.dataTable[i][2] = Math.round(
       Math.random() * 1000);
   }

   this.appendDataToTreeMap();
 }

 public changeData(): void {
    const dataTable = this.columnChart.dataTable;
    for (let i = 1; i < 7; i++) {
      dataTable[i][1] = Math.round(Math.random() * 1000);
      dataTable[i][2] = Math.round(Math.random() * 1000);
    }
    this.columnChart.component.draw();
  }

 public changeData2(): void {
    const dataTable = this.columnChart2.dataTable;
    for (let i = 1; i < 7; i++) {
      dataTable[i][1] = Math.round(Math.random() * 1000);
      dataTable[i][2] = Math.round(Math.random() * 1000);
    }
    this.columnChart2.component.draw();
  }

  public setupTooltips() {
    const data = this.tooltipChart.component.wrapper.getDataTable();
    const view = new google.visualization.DataView(data);
    for (let i = 0; i < this.columnChartWTooltips.dataTable.length - 1; i++) {
      // Set the view for each event's data
      view.setColumns([0, i + 1]);

      const tooltipChart = this.tooltipChart.component.wrapper.getChart();

      const el = google.visualization.events.addListener(tooltipChart, 'ready', () => {

        // Get the PNG of the chart and set is as the src of an img tag.
        const tooltipImg = '<img src="' + tooltipChart.getImageURI() + '">';

        // Add the new tooltip image to your data rows.
        this.columnChartWTooltips.dataTable[i + 1][2] = tooltipImg;

        google.visualization.events.removeListener(el);
      });

      tooltipChart.draw(view, {
        title: 'U.S. Viewership Over The Last 10 Years (in millions)',
        legend: 'none'
      });
    }
    this.columnChartWTooltips.component.draw();
  }

  public openAsPNG() {
    this.imageURI = this.columnChart2.component.wrapper.getChart().getImageURI();
    $('#exampleModal').modal();
  }

 public changeChartType(): void {
    // forces a reference update (otherwise angular doesn't detect the change)
    this.columnChart = Object.create(this.columnChart);
    if (this.columnChart.chartType === 'ColumnChart') {
      this.columnChart.chartType = 'PieChart';
    } else {
      this.columnChart.chartType = 'ColumnChart';
    }
  }

  public ready(event: ChartReadyEvent) {
    console.log(event.message);
  }

  public error(event: ChartErrorEvent) {
    console.error("Error: " + event);
  }

  public select(event: ChartSelectEvent) {
    this.selectEvent = event;
  }

  public mouseOver(event: ChartMouseOverEvent) {
    console.log('ChartMouseOverEvent');
    console.log('bb: ' + JSON.stringify(event.boundingBox));
    console.log('pos: ' + JSON.stringify(event.position));
    console.log('type: ' + JSON.stringify(event.columnType));
    console.log('label: ' + JSON.stringify(event.columnLabel));
    console.log('value: ' + JSON.stringify(event.value));
  }

  public mouseOut(event: ChartMouseOutEvent) {
    console.log('ChartMouseOutEvent');
    console.log('bb: ' + JSON.stringify(event.boundingBox));
    console.log('pos: ' + JSON.stringify(event.position));
    console.log('type: ' + JSON.stringify(event.columnType));
    console.log('label: ' + JSON.stringify(event.columnLabel));
    console.log('value: ' + JSON.stringify(event.value));
  }

  public collapseOrgChart() {
    this.orgChartCollapsed = !this.orgChartCollapsed;
    const orgChartWrapper = this.orgChart.component.wrapper;
    orgChartWrapper.getChart().collapse(0, this.orgChartCollapsed);
  }

  public appendDataToTreeMap() {
    if (this.treeMapAppendCount >= shakespeareData.length) {
      return;
    }
    this.treeMap.dataTable = this.treeMap.dataTable.concat(shakespeareData[this.treeMapAppendCount++]);
    // force a reference update (otherwise angular doesn't detect the change)
    this.treeMap = Object.create(this.treeMap);
  }
}
