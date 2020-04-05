# Events
All events described below are also available as one time events:
`chartReadyOneTime` and so on.

### chartReady

The `chartReady` event is fired when a chart is completely loaded.

Bind the `chartReady` event in the `google-chart` component like this:
```html
<google-chart [data]='pieChart' (chartReady)='ready($event)'></google-chart>
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

and then use it like this:
```ts
public ready(event: ChartReadyEvent) {
  // your logic
}
```

### chartError

The `chartError` event is fired if there are some errors with a chart.

Bind the `chartError` event in the `google-chart` component, like this:
```html
<google-chart [data]='pieChart' (chartError)='error($event)'></google-chart>
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

and then use it like this:
```ts
public error(event: ChartErrorEvent) {
  // your logic
}
```

See more details about [returned values for error event][google-charts-error-event].

### chartSelect

The `chartSelect` event is fired when a chart is selected/clicked.

Bind the `chartSelect` event in the `google-chart` component, like this:
```html
<google-chart [data]='pieChart' (chartSelect)='select($event)'></google-chart>
```

Your `select()` function is passed an event whose interface looks like this:
```ts
interface ChartSelectEvent {
  message: string;
  row: number | null;
  column: number | null;
  columnLabel: string;
  selectedRowValues: any[];
  selectedRowFormattedValues: any[];
}
```

You can import the `ChartSelectEvent` interface in your `.ts` file:
```ts
import { ChartSelectEvent } from 'ng2-google-charts';
```

and then use it like this:
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
<google-chart [data]="comboChart" (mouseOver)="mouseOver($event)"></google-chart>
```

Your `mouseOver()` function is passed an event whose class looks like this:
```ts
class ChartMouseOverEvent {
  position: DataPointPosition;
  boundingBox: BoundingBox;
  value: any;
  tooltip: ChartHTMLTooltip | null;
  columnType: string;
  columnLabel: string;
}
```

You can import the `ChartMouseOverEvent` class in your `.ts` file:
```ts
import { ChartMouseOverEvent } from 'ng2-google-charts';
```

and then use it like this:
```ts
public mouseOver(event: ChartMouseOverEvent) {
  // your logic
}
```

### mouseOut

The `mouseOut` event is fired when the user moves the mouse out of some chart
item.

Bind the `MouseOut` event in the `google-chart` component like this:
```html
<google-chart [data]="comboChart" (mouseOut)="mouseOut($event)"></google-chart>
```

Your `mouseOut()` function is passed an event whose class looks like this:
```ts
class ChartMouseOutEvent {
  position: DataPointPosition;
  boundingBox: BoundingBox;
  value: any;
  columnType: string;
  columnLabel: string;
}
```

You can import the `ChartMouseOutEvent` class in your `.ts` file:
```ts
import { ChartMouseOutEvent } from 'ng2-google-charts';
```

and then use it like this:
```ts
public mouseOut(event: ChartMouseOutEvent) {
  // your logic
}
```

[google-charts-error-event]: https://developers.google.com/chart/interactive/docs/events#the-error-event
