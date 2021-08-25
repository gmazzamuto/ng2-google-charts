# ng2-google-charts

> Angular Google Charts module

[![NPM Version][npm-image]][npm-url]
[![Downloads][npm-downloads-image]][npm-downloads-url]


## Versions
* Version 6 is built with Angular 9, should work with Angular versions from 8 to
  13.
* Version 7 is built with Angular 12 in Ivy partial compilation mode, works with
  Angular versions from 12 to 13.

## Features
* All chart types
* Dashboard and controls
* Chart Editor
* Formatters
* Events

## Sponsoring

*If you are using this package commercially or if you find it useful, please
consider [sponsoring][donate-url] this project.*

## Install

```bash
npm i --save ng2-google-charts
```

## Quick start
Import the module in your `app.module.ts`:
```ts
import { Ng2GoogleChartsModule } from 'ng2-google-charts';

@NgModule({
  ...
  imports: [
    ...
    Ng2GoogleChartsModule,
  ],
  providers: [
})
export class AppModule { }
```

In your templates, use the `google-chart` component like this:
```html
<google-chart [data]="pieChart"></google-chart>
```
and in the corresponding `.ts` file:
```ts
import { GoogleChartInterface, GoogleChartType } from 'ng2-google-charts';

public pieChart: GoogleChartInterface = {
  chartType: GoogleChartType.PieChart,
  dataTable: [
    ['Task', 'Hours per Day'],
    ['Work',     11],
    ['Eat',      2],
    ['Commute',  2],
    ['Watch TV', 2],
    ['Sleep',    7]
  ],
  //firstRowIsData: true,
  options: {'title': 'Tasks'},
};
```

## Usage & Demo
Check out the [reference documentation][reference] and the [live demo][example-page].

## License

[MIT](LICENSE.md)

[npm-image]: https://img.shields.io/npm/v/ng2-google-charts.svg
[npm-url]: https://npmjs.org/package/ng2-google-charts
[npm-downloads-image]: https://img.shields.io/npm/dm/ng2-google-charts.svg
[npm-downloads-url]: https://npmjs.org/package/ng2-google-charts
[reference]: https://www.devrandom.it/software/ng2-google-charts/additional-documentation/usage.html
[example-page]: https://www.devrandom.it/software/ng2-google-charts/demo
[donate-url]: https://github.com/gmazzamuto/ng2-google-charts?sponsor=1
