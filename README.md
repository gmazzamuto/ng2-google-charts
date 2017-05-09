# ng2-google-charts

> Google Charts module for Angular 2

Please see [this page][example-page] for a live demo.

[![NPM Version][npm-image]][npm-url]
[![Downloads][npm-downloads-image]][npm-downloads-url]

## Install

```bash
npm i --save ng2-google-charts
```

## Usage

Import the `Ng2GoogleChartsModule` in your `app.module.ts`:
```ts
import { Ng2GoogleChartsModule } from 'ng2-google-charts';

@NgModule({
  ...
  imports: [
    ...
    Ng2GoogleChartsModule,
  ],
})
export class AppModule { }
```

In your templates, use the `google-chart` component like this:
```html
<google-chart [data]="pieChartOptions"></google-chart>
```
and in the corresponding `.ts` file:
```ts
pieChartOptions =  {
  chartType: 'PieChart',
  dataTable: [
    ['Task', 'Hours per Day'],
    ['Work',     11],
    ['Eat',      2],
    ['Commute',  2],
    ['Watch TV', 2],
    ['Sleep',    7]
  ],
  options: {'title': 'Tasks'},
};
```

Please see [this page][example-page] for a demo with more examples.

## Events

### Ready

The `ready` event is fired when a chart is completely loaded.

Bind the `chartReady` event in the `google-chart` component like this:
```html
<google-chart [data]='pieChartOptions' (chartReady)='ready($event)'></google-chart>
```

Your `ready()` function is passed an event whose interface looks like this:
```ts
interface ChartReadyEvent {
  message: string;
}
```

You can import the `ChartReadyEvent` interface in your `.ts` file:
```ts
import { ChartReadyEvent } from 'ng2-google-charts';
```

and then use it like:
```ts
public ready(event: ChartReadyEvent) {
  // your logic
}
```

### Error

The `error` event is fired if there are some errors with a chart.

Bind the `chartError` event in the `google-chart` component, like this:
```html
<google-chart [data]='pieChartOptions' (chartError)='error($event)'></google-chart>
```

Your `error()` function is passed an event whose interface looks like this:
```ts
interface ChartErrorEvent {
  id: string;
  message: string;
  detailedMessage: string;
  options: Object;
}
```

You can import the `ChartErrorEvent` interface in your `.ts` file:
```ts
import { ChartErrorEvent } from 'ng2-google-charts';
```

and then use it like:
```ts
public error(event: ChartErrorEvent) {
  // your logic
}
```

See more details about [returned values for error event][google-charts-error-event].

### Select

The `select` event is fired when a chart is selected/clicked.

Bind the `chartSelect` event in the `google-chart` component, like this:
```html
<google-chart [data]='pieChartOptions' (chartSelect)='select($event)'></google-chart>
```

Your `select()` function is passed an event whose interface looks like this:
```ts
interface ChartSelectEvent {
  message: string;
  row: number | null;
  column: number | null;
  selectedRowValues: any[];
}
```

You can import the `ChartSelectEvent` interface in your `.ts` file:
```ts
import { ChartSelectEvent } from 'ng2-google-charts';
```

and then use it like:
```ts
public select(event: ChartSelectEvent) {
  // your logic
}
```

### mouseOver

The `mouseOver` event is fired when the user moves the mouse over some chart
item.

Bind the `MouseOver` event in the `google-chart` component like this:
```html
<google-chart [data]="comboChartOptions" (mouseOver)="mouseOver($event)"></google-chart>
```

Your `mouseOver()` function is passed an event whose interface looks like this:
```ts
interface MouseOverEvent {
  position: DataPointPosition;
  boundingBox: BoundingBox;
  value: any;
  tooltip: ChartHTMLTooltip | null;
  columnType: string;
  columnLabel: string;
}
```

You can import the `MouseOverEvent` interface in your `.ts` file:
```ts
import { MouseOverEvent } from 'ng2-google-charts';
```

and then use it like:
```ts
public mouseOver(event: MouseOverEvent) {
  // your logic
}
```

## License

[MIT](LICENSE.md)

[npm-image]: https://img.shields.io/npm/v/ng2-google-charts.svg
[npm-url]: https://npmjs.org/package/ng2-google-charts
[npm-downloads-image]: http://img.shields.io/npm/dm/ng2-google-charts.svg
[npm-downloads-url]: https://npmjs.org/package/ng2-google-charts
[example-page]: https://gmazzamuto.github.io/ng2-google-charts
[google-charts-error-event]: https://developers.google.com/chart/interactive/docs/events#the-error-event
