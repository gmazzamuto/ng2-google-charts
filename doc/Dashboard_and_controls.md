# Dashboard and controls

Please see [this page][example-page] for a live demo of the following example.

See [here][controls-gallery] for options and reference documentation.


```html
<google-charts-dashboard [data]="dashboard"></google-charts-dashboard>

<google-charts-control [data]="slider"></google-charts-control>
<google-chart [data]="dashboardPieChart"></google-chart>
<google-charts-control [data]="categoryPicker"></google-charts-control>
<google-chart [data]="dashboardTable"></google-chart>
```

```ts
  public slider: GoogleChartsControlInterface = {
    controlType: 'NumberRangeFilter',
    options: {
      filterColumnIndex: 2,
      ui: {
        labelStacking: 'vertical',
        label: 'Age Filter:'
      }
    }
  };

  public categoryPicker: GoogleChartsControlInterface = {
    controlType: 'CategoryFilter',
    options: {
      filterColumnIndex: 1,
      ui: {
        labelStacking: 'vertical',
        label: 'Gender Selection:',
        allowTyping: false,
        allowMultiple: false
      }
    }
  };

  public dashboardPieChart: GoogleChartInterface = {
    chartType: 'PieChart',
    options: {
      width: 250,
      height: 250,
      legend: 'none',
      chartArea: {left: 15, top: 15, right: 0, bottom: 0},
      pieSliceText: 'label'
    },
    view: {columns: [0, 3]}
  };

  public dashboardTable: GoogleChartInterface = {
    chartType: 'Table',
    options: {
      alternatingRowStyle: true,
      showRowNumber : true,
      allowHtml: true,
    },
  };

  public dashboard: GoogleChartsDashboardInterface = {
    dataTable: [
      ['Name', 'Gender', 'Age', 'Donuts eaten'],
      ['Michael' , 'Male', 12, 5],
      ['Elisa', 'Female', 20, 7],
      ['Robert', 'Male', 7, 3],
      ['John', 'Male', 54, 2],
      ['Jessica', 'Female', 22, 6],
      ['Aaron', 'Male', 3, 1],
      ['Margareth', 'Female', 42, 8],
      ['Miranda', 'Female', 33, 6]
    ],
    formatters: [
      {
        columns: [3],
        type: 'ArrowFormat',
        options: {
          base: 5,
        },
      },
    ],
    bind: [
      [
        [this.slider, this.categoryPicker],
        [this.dashboardPieChart, this.dashboardTable]
      ]
    ],
  };
```

[example-page]: https://www.devrandom.it/software/ng2-google-charts/demo
[controls-gallery]: https://developers.google.com/chart/interactive/docs/gallery/controls#controls-gallery