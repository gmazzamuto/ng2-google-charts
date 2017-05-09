import { Component } from '@angular/core';
import { ChartReadyEvent } from 'ng2-google-charts';
import { ChartErrorEvent } from 'ng2-google-charts';
import { ChartSelectEvent } from 'ng2-google-charts';
import { DataPointHoveredEvent } from 'ng2-google-charts';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public selectEvent: ChartSelectEvent;

  public columnChartOptions:any =  {
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

  public pieChartOptions:any =  {
    chartType: 'PieChart',
    dataTable: [
      ['Task', 'Hours per Day'],
      ['Work',     11],
      ['Eat',      2],
      ['Commute',  2],
      ['Watch TV', 2],
      ['Sleep',    7]
    ],
    options: {title: 'Tasks'}
  };

  public gaugeChartOptions:any =  {
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

  public scatterChartOptions:any = {
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

 public timelineChartOptions:any =  {
    chartType: 'Timeline',
    dataTable: [
      ['Name', 'From', 'To'],
      [ 'Washington', new Date(1789, 3, 30), new Date(1797, 2, 4) ],
      [ 'Adams',      new Date(1797, 2, 4),  new Date(1801, 2, 4) ],
      [ 'Jefferson',  new Date(1801, 2, 4),  new Date(1809, 2, 4) ]
    ]
 }

 public lineChartOptions:any =  {
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

 public comboChartOptions:any =  {
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

 public myClick():void {
    // forces a reference update (otherwise angular doesn't detect the change)
    this.columnChartOptions = Object.create(this.columnChartOptions);
    for (let i = 1; i < 7; i++) {
      this.columnChartOptions.dataTable[i][1] = Math.round(
        Math.random() * 1000);
      this.columnChartOptions.dataTable[i][2] = Math.round(
        Math.random() * 1000);
    }
  }

 public changeChartType():void {
    // forces a reference update (otherwise angular doesn't detect the change)
    this.columnChartOptions = Object.create(this.columnChartOptions);
    if(this.columnChartOptions.chartType == 'ColumnChart')
      this.columnChartOptions.chartType = 'PieChart';
    else
      this.columnChartOptions.chartType = 'ColumnChart';
  }

  public ready(event: ChartReadyEvent) {
    console.log(event.message);
  }

  public error(event: ChartErrorEvent) {
    console.error(event);
  }

  public select(event: ChartSelectEvent) {
    this.selectEvent = event;
  }

  public mouseOver(event: DataPointHoveredEvent) {
    console.log('bb: ' + JSON.stringify(event.boundingBox));
    console.log('pos: ' + JSON.stringify(event.position));
    console.log('type: ' + JSON.stringify(event.columnType));
    console.log('label: ' + JSON.stringify(event.columnLabel));
    console.log('value: ' + JSON.stringify(event.value));
  }

}
