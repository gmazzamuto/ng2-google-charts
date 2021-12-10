# Advanced usage
You can access Google Chart's underlying `GoogleChartComponent` and [ChartWrapper](https://developers.google.com/chart/interactive/docs/reference#chartwrapperobject) through the `component` property:
```html
<google-chart [data]="columnChart"></google-chart>
```

This property is available only if the `columnChart` object is extensible
(i.e. `Object.isExtensible(columnChart) == true`).

```ts
export class AppComponent {

  public columnChart: GoogleChartInterface = {  // use :any or :GoogleChartInterface
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

  myfunction() {
    let ccComponent = this.columnChart.component!;
    let ccWrapper = ccComponent.wrapper;

    //force a redraw
    ccComponent.draw();
  }

}
```
