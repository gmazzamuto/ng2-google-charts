# Usage

Import the `Ng2GoogleChartsModule` in your `app.module.ts`:
```ts
import { Ng2GoogleChartsModule, GoogleChartsSettings } from 'ng2-google-charts';

// const MyGoogleChartsSettings: GoogleChartsSettings = {
//   mapsApiKey: 'YOUR_API_KEY',
//   googleChartsVersion: '46',
//   language: 'it',
// };

@NgModule({
  ...
  imports: [
    ...
    Ng2GoogleChartsModule,
  ],
  providers: [
    // {
    //   provide: 'googleChartsSettings',
    //   useValue: MyGoogleChartsSettings,
    // },
  ],
})
export class AppModule { }
```

In your templates, use the `google-chart` component like this:
```html
<google-chart [data]="pieChart"></google-chart>
```
and in the corresponding `.ts` file:
```ts
import { GoogleChartInterface } from 'ng2-google-charts';

public pieChart: GoogleChartInterface = {
  chartType: 'PieChart',
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
The value in `dataTable` will be passed to the `setDataTable()` method of
`ChartWrapper` ([documentation][ChartWrapperMethods]).
If `firstRowIsData` is true, `dataTable` will be first passed to
`arrayToDataTable(dataTable, true)` ([documentation][arrayToDataTable]).

[ChartWrapperMethods]: https://developers.google.com/chart/interactive/docs/reference#methods_4
[arrayToDataTable]: https://developers.google.com/chart/interactive/docs/reference#google.visualization.arraytodatatable
