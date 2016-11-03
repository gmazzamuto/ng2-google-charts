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

Add the following inside the `<head>` element in your `index.html`:
```html
<script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>
```

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
<google-chart [(ngModel)]="pieChartOptions"></google-chart>
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

## License

[MIT](http://vjpr.mit-license.org)

[npm-image]: https://img.shields.io/npm/v/ng2-google-charts.svg
[npm-url]: https://npmjs.org/package/ng2-google-charts
[npm-downloads-image]: http://img.shields.io/npm/dm/ng2-google-charts.svg
[npm-downloads-url]: https://npmjs.org/package/ng2-google-charts
[example-page]: https://gmazzamuto.github.io/ng2-google-charts/example/
