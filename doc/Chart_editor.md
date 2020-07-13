To use the [ChartEditor][ChartEditor] class, inject `GoogleChartEditor` in your
component then call `openDialog()`:

```ts
  constructor(private chartEditor: GoogleChartEditor) { }

  public editChart() {
    this.chartEditor.openDialog(this.columnChart)
                    .then((wrapper: GoogleChartWrapper) => {
                      console.log('dialog OK');
                      console.log('new chart type: ', wrapper.getChartType());
                    })
                    .catch(() => console.log('dialog cancelled'));
  }
```

You can pass either a `GoogleChartInterface` or a `GoogleChartComponent` to
`openDialog()`. The metod returns a `Promise` for a `ChartWrapper` that can be
used to query the newly set chart properties (see reference
[documentation][ChartWrapper]). The new chart type and options can also be
recovered from the component's `data` property (`GoogleChartInterface`) which
gets updated automatically.

[ChartEditor]: https://developers.google.com/chart/interactive/docs/reference#google_visualization_charteditor
[ChartWrapper]: https://developers.google.com/chart/interactive/docs/reference#chartwrapperobject
