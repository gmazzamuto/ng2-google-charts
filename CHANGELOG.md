<a name="v5.0.0"></a>

# Version 5.0.0

* Add interface for remote data source
* Add interfaces for all formatters
* Add `regionClick` event for `GeoChart`
* Add missing properties in `GoogleChartInterface`, implement loading data
  from a remote source

## Breaking changes
* rename interface `FormatterOptionsInterface` -> `ColorFormatInterface`
* in `GoogleChartInterface`, rename `opt_firstRowIsData` -> `firstRowIsData`


<a name="v4.0.0"></a>

# Version 4.0.0

* make underlying `GoogleChartComponent` easily accessible
* add interfaces
* add `columnLabel` to `ChartSelectEvent`
* demo: add several more examples
* add one-time listeners
* fix events and listeners
* load Google Charts v46 by default
* `GoogleChartsLoaderService`: inject `googleChartsVersion` and `mapsApiKey`

 ## Breaking changes
 * rename method in GoogleChartComponent: redraw() -> draw()