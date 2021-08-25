declare var google: any;

import {
  Component,
  ElementRef,
  OnInit,
  Input,
  Output,
  EventEmitter
} from '@angular/core';

import { GoogleChartsLoaderService } from '../google-charts-loader.service';
import { GoogleChartsDataTable, GoogleChartsDataTableInterface } from '../google-charts-datatable';
import { ChartReadyEvent } from './chart-ready-event';
import { ChartErrorEvent } from './chart-error-event';
import { ChartSelectEvent } from './chart-select-event';
import {
  ChartMouseEvent,
  ChartMouseOverEvent,
  ChartMouseOutEvent,
  BoundingBox,
  DataPointPosition
} from './chart-mouse-event';
import { ChartHTMLTooltip } from './chart-html-tooltip';
import { RegionClickEvent } from './geochart-events';

export interface GoogleChartInterface extends GoogleChartsDataTableInterface {
  chartType: string | GoogleChartType;
  options?: any;

  component?: GoogleChartComponent;
}

export enum GoogleChartType {
  AnnotationChart = 'AnnotationChart',
  AreaChart = 'AreaChart',
  BarChart = 'BarChart',
  BubbleChart = 'BubbleChart',
  Calendar = 'Calendar',
  CandlestickChart = 'CandlestickChart',
  ColumnChart = 'ColumnChart',
  ComboChart = 'ComboChart',
  Gantt = 'Gantt',
  Gauge = 'Gauge',
  GeoChart = 'GeoChart',
  Histogram = 'Histogram',
  LineChart = 'LineChart',
  Map = 'Map',
  OrgChart = 'OrgChart',
  PieChart = 'PieChart',
  Sankey = 'Sankey',
  ScatterChart = 'ScatterChart',
  SteppedAreaChart = 'SteppedAreaChart',
  Table = 'Table',
  Timeline = 'Timeline',
  TreeMap = 'TreeMap',
  WordTree = 'WordTree'
}

@Component({
  selector: 'google-chart',
  template: '<div></div>',
})
export class GoogleChartComponent implements OnInit {

  @Input() public data: GoogleChartInterface;

  @Output() public chartReady: EventEmitter<ChartReadyEvent>;
  @Output() public chartReadyOneTime: EventEmitter<ChartReadyEvent>;

  @Output() public chartError: EventEmitter<ChartErrorEvent>;
  @Output() public chartErrorOneTime: EventEmitter<ChartErrorEvent>;

  @Output() public chartSelect: EventEmitter<ChartSelectEvent>;
  @Output() public chartSelectOneTime: EventEmitter<ChartSelectEvent>;

  @Output() public mouseOver: EventEmitter<ChartMouseOverEvent>;
  @Output() public mouseOverOneTime: EventEmitter<ChartMouseOverEvent>;

  @Output() public mouseOut: EventEmitter<ChartMouseOutEvent>;
  @Output() public mouseOutOneTime: EventEmitter<ChartMouseOutEvent>;

  @Output() public regionClick: EventEmitter<RegionClickEvent>;
  @Output() public regionClickOneTime: EventEmitter<RegionClickEvent>;

  public wrapper: any;
  private cli: any;
  private options: any;

  private HTMLel: HTMLElement;
  private dataTable: GoogleChartsDataTable;

  public constructor(private el: ElementRef,
                     private loaderService: GoogleChartsLoaderService) {
    this.chartSelect = new EventEmitter();
    this.chartSelectOneTime = new EventEmitter();
    this.chartReady = new EventEmitter();
    this.chartReadyOneTime = new EventEmitter();
    this.chartError = new EventEmitter();
    this.chartErrorOneTime = new EventEmitter();
    this.mouseOver = new EventEmitter();
    this.mouseOverOneTime = new EventEmitter();
    this.mouseOut = new EventEmitter();
    this.mouseOutOneTime = new EventEmitter();
    this.regionClick = new EventEmitter();
    this.regionClickOneTime = new EventEmitter();
  }

  public ngOnInit(): void {
    this.HTMLel = this.el.nativeElement.querySelector('div');
    if (Object.isExtensible(this.data)) {
      this.data.component = this;
    }
    this.options = this.data.options;

    this.init().then(() => {
      this.draw();
    });
  }

  public async init() {
    await this.loaderService.load();
    this.recreateWrapper();
  }

  private recreateWrapper() {
    if (this.wrapper === undefined || this.wrapper.getChartType() !== this.data.chartType) {
      this.dataTable = new GoogleChartsDataTable(this.data);
      this.dataTable.dataTableChanged.subscribe((dt: any) => {
        this._draw();
      });

      // see dataTable in https://developers.google.com/chart/interactive/docs/reference#google.visualization.drawchart
      let temp: GoogleChartInterface = this.data;
      if (this.data.firstRowIsData) {
        temp = Object.assign(temp, this.data);
        temp.dataTable = this.dataTable.getDataTable();
      }
      this.wrapper = new google.visualization.ChartWrapper(temp);
      this.registerChartWrapperEvents();

      /* Calling draw even without data is the only way to pass the HTMl element
         when using the chart in a dashboard. Don't do this in all other cases:
         it breaks formatters with remote data source, hence the conditional. */
      if (temp.dataTable === undefined && temp.dataSourceUrl === undefined) {
        try {
          this.wrapper.draw(this.HTMLel);
        } catch (err) {}
      }
    }
  }

  private async _draw() {
    const dt = this.dataTable.getDataTable();
    if (dt === undefined) {
      return;
    }
    this.convertOptions();
    this.recreateWrapper();
    this.wrapper.setOptions(this.options);
    this.wrapper.setDataTable(dt);
    this.wrapper.draw(this.HTMLel);
  }

  public getDataTable(): GoogleChartsDataTable {
    return this.dataTable;
  }

  public draw(value?: GoogleChartInterface) {
    if (value === undefined) {
      value = this.data;
    }
    this.options = value.options;
    this.dataTable.init(value);
  }

  private getSelectorBySeriesType(seriesType: string): string {
    const selectors: any = {
      bars : 'bar#%s#%r',
      haxis : 'hAxis#0#label',
      line: 'point#%s#%r',
      legend : 'legendentry#%s',
      area: 'point#%s#%r'
    };

    const selector: string = selectors[seriesType];

    return selector;
  }

 /**
  * Given a column number, counts how many
  * columns have rol=="data". Those are mapped
  * one-to-one to the series array. When rol is not defined
  * a column of type number means a series column.
  * @param column to inspect
  */
  private getSeriesByColumn(column: number): number  {
    let series = 0;
    const dataTable = this.wrapper.getDataTable();
    for (let i = column - 1; i >= 0; i--) {
      const role = dataTable.getColumnRole(i);
      const type = dataTable.getColumnType(i);
      if (role === 'data' || type === 'number') {
        series++;
      }
    }
    return series;
  }

  private getBoundingBoxForItem(item: DataPointPosition): BoundingBox {
    let boundingBox = {top: 0, left: 0, width: 0, height: 0};
    if (this.cli) {
      const column = item.column;
      const series = this.getSeriesByColumn(column);
      const row = item.row;
      let seriesType = this.options.seriesType;
      if (this.options.series && this.options.series[series] && this.options.series[series].type) {
        seriesType = this.options.series[series].type;
      }
      if (seriesType) {
        let selector = this.getSelectorBySeriesType(seriesType);
        if (selector) {
             selector = selector.replace('%s', series + '').replace('%c', column + '').replace('%r', row + '');
             const box = this.cli.getBoundingBox(selector);
             if (box) {
              boundingBox = box;
             }
        }
      }
    }

    return boundingBox;
  }

  private getValueAtPosition(position: DataPointPosition): any {
    if (position.row == null) {
      return null;
    }
    const dataTable = this.wrapper.getDataTable();
    const value = dataTable.getValue(position.row, position.column);
    return value;
  }

  private getColumnTypeAtPosition(position: DataPointPosition): string {
      const dataTable = this.wrapper.getDataTable();
      const type = dataTable.getColumnType(position.column) || '';
      return type;
  }

  private getColumnLabelAtPosition(position: DataPointPosition): string {
      const dataTable = this.wrapper.getDataTable();
      const type = dataTable.getColumnLabel(position.column) || '';
      return type;
  }

  private getHTMLTooltip(): ChartHTMLTooltip {
    const tooltipER = new ElementRef(this.el.nativeElement.querySelector('.google-visualization-tooltip'));
    return new ChartHTMLTooltip(tooltipER);
  }

  private parseMouseEvent(item: DataPointPosition): ChartMouseEvent {
    const chartType = this.wrapper.getChartType();
    let eventColumn = item.column;
    if (eventColumn == null) {
      switch (chartType) {
        case 'Timeline':
          eventColumn = this.wrapper.getDataTable().getNumberOfColumns() === 3 ? 0 : 1;
          break;
        default:
          eventColumn = 0;
      }
    }
    const eventRow = item.row;
    const myItem = {
      row: eventRow,
      column: eventColumn
    };
    const event = {
      position: item,
      boundingBox: this.getBoundingBoxForItem(myItem),
      value: this.getValueAtPosition(myItem),
      columnType: this.getColumnTypeAtPosition(myItem),
      columnLabel: this.getColumnLabelAtPosition(myItem)
    };
    return event;
  }

  private registerChartEvents(): void {
    const chart = this.wrapper.getChart();
    this.cli = chart.getChartLayoutInterface ? chart.getChartLayoutInterface() : null;
    if (this.mouseOver.observers.length > 0) {
      google.visualization.events.addListener(chart, 'onmouseover', (item: DataPointPosition) => {
        const event: ChartMouseOverEvent = this.parseMouseEvent(item) as ChartMouseOverEvent;
        event.tooltip = this.getHTMLTooltip();
        this.mouseOver.emit(event);
      });
    }
    if (this.mouseOverOneTime.observers.length > 0) {
      google.visualization.events.addOneTimeListener(chart, 'onmouseover', (item: DataPointPosition) => {
        const event: ChartMouseOverEvent = this.parseMouseEvent(item) as ChartMouseOverEvent;
        event.tooltip = this.getHTMLTooltip();
        this.mouseOverOneTime.emit(event);
      });
    }

    if (this.mouseOut.observers.length > 0) {
      google.visualization.events.addListener(chart, 'onmouseout', (item: DataPointPosition) => {
        const event: ChartMouseOutEvent = this.parseMouseEvent(item) as ChartMouseOutEvent;
        this.mouseOut.emit(event);
      });
    }

    if (this.mouseOutOneTime.observers.length > 0) {
      google.visualization.events.addOneTimeListener(chart, 'onmouseout', (item: DataPointPosition) => {
        const event: ChartMouseOutEvent = this.parseMouseEvent(item) as ChartMouseOutEvent;
        this.mouseOutOneTime.emit(event);
      });
    }

    if (this.data.chartType === 'GeoChart') {
      if (this.regionClick.observers.length > 0) {
        google.visualization.events.addListener(chart, 'regionClick', (item: RegionClickEvent) => {
          this.regionClick.emit(item);
        });
      }
      if (this.regionClickOneTime.observers.length > 0) {
        google.visualization.events.addOneTimeListener(chart, 'regionClick', (item: RegionClickEvent) => {
          this.regionClick.emit(item);
        });
      }
    }
  }

  private registerChartWrapperEvents(): void {
    google.visualization.events.addListener(this.wrapper, 'ready', () => {
      this.chartReady.emit({message: 'Chart ready'});
    });

    google.visualization.events.addOneTimeListener(this.wrapper, 'ready', () => {
      this.chartReadyOneTime.emit({message: 'Chart ready (one time)'});
      this.registerChartEvents();
    });

    google.visualization.events.addListener(this.wrapper, 'error', (error: any) => {
      this.chartError.emit(error as ChartErrorEvent);
    });

    google.visualization.events.addOneTimeListener(this.wrapper, 'error', (error: any) => {
      this.chartErrorOneTime.emit(error as ChartErrorEvent);
    });

    this.addListener(this.wrapper, 'select', this.selectListener, this.chartSelect);
    this.addOneTimeListener(this.wrapper, 'select', this.selectListener, this.chartSelectOneTime);
  }

  private addListener(source: any, eventType: string, listenerFn: any, evEmitter: EventEmitter<any>) {
    google.visualization.events.addListener(source, eventType, () => {
      evEmitter.emit(listenerFn());
    });
  }

  private addOneTimeListener(source: any, eventType: string, listenerFn: any, evEmitter: EventEmitter<any>) {
    google.visualization.events.addOneTimeListener(source, eventType, () => {
      evEmitter.emit(listenerFn());
    });
  }

  private selectListener = () => {
    const event: ChartSelectEvent = {
      message: 'select',
      row: null,
      column: null,
      selectedRowValues: [],
      selectedRowFormattedValues: [],
      columnLabel: ''
    };
    const s = this.wrapper.visualization.getSelection();
    const gs = s[s.length - 1];
    if (!gs) {
      event.message = 'deselect';
      return event;
    }
    const selection: DataPointPosition = gs;
    if (gs.row != null) {
      event.row = selection.row;

      const selectedRowValues = [];
      const selectedRowFormattedValues = [];
      const dataTable = this.wrapper.getDataTable();
      const numberOfColumns = dataTable.getNumberOfColumns();
      for (let i = 0; i < numberOfColumns; i++) {
        selectedRowValues.push(dataTable.getValue(selection.row, i));
        selectedRowFormattedValues.push(dataTable.getFormattedValue(selection.row, i));
      }
      event.selectedRowValues = selectedRowValues;
      event.selectedRowFormattedValues = selectedRowFormattedValues;
    }
    if (selection.column != null) {
      event.column = selection.column;
      event.columnLabel = this.getColumnLabelAtPosition(selection);
    }
    if (gs.name) {
      event.columnLabel = gs.name;
    }

    return event;
  }

  private convertOptions() {
    try {
      this.options = google.charts[this.data.chartType].convertOptions(this.options);
    } catch (error) {
      return;
    }
  }
}
