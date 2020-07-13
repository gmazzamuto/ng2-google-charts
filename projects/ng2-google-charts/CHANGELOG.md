<a name="v6.1.0"></a>

# Version 6.1.0
* add `GoogleChartEditor`


<a name="v6.0.1"></a>

# Version 6.0.1
* `GoogleChartInterface`: do not set the `component` property if the passed
  object is non-extensible
* support Angular 8


<a name="v6.0.0"></a>

# Version 6.0.0

This version features some major changes under the hood, however breaking
changes are minimal and updating should be straightforward.

* `GoogleChartInterface` now extends a new interface: `GoogleChartsDataTable`
* Add support for Controls and Dashboards
* Load Google Charts v47 by default


## Breaking changes:
* `GoogleChartInterface` and `GoogleChartsLoaderService` are now exported as
  part of the public API
* Remove unneeded interface: `GoogleChartComponentInterface`
* `GoogleChartComponent` now implements `OnInit` rather than `OnChanges`
* Use `GoogleChartsSettings` to provide settings to the Google Charts library
* Remove deprecated `ChartMouseOverEvent`


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
