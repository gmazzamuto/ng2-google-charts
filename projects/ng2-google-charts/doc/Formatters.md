# Formatters

You can specify an array of multiple formatter types and configurations like
this:
```ts
public tableChart: GoogleChartInterface = {
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
  options: {allowHtml: true}
};
```

Please refer to the Google Chart [documentation for formatter types and options](https://developers.google.com/chart/interactive/docs/reference#formatters).

Please see [this page][example-page] for a demo with more examples.

[example-page]: https://www.devrandom.it/software/ng2-google-charts/demo
