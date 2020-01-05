declare var google: any;

import {
  Component,
  ElementRef,
  ChangeDetectionStrategy,
  OnChanges,
  Input,
  Output,
  SimpleChanges,
  EventEmitter
} from '@angular/core';

import { GoogleChartsLoaderService } from '../google-charts-loader.service';
import { GoogleChartInterface, GoogleChartComponentInterface, ColorFormatInterface } from '../google-charts-interfaces';
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

@Component({
  selector: 'google-chart',
  template: '<div></div>',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GoogleChartComponent implements OnChanges, GoogleChartComponentInterface {

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

  public wrapper: any;
  private cli: any;
  private options: any;

  private el: ElementRef;
  private loaderService: GoogleChartsLoaderService;

  public constructor(el: ElementRef,
                     loaderService: GoogleChartsLoaderService) {
    this.el = el;
    this.loaderService = loaderService;
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
  }

  public ngOnChanges(changes: SimpleChanges): void {
    const key = 'data';
    if(changes[key]) {

      if(!this.data) {
        return;
      }

      this.options = this.data.options;
      if (!this.options) {
        this.options = {};
      }

      this.data.component = this;

      this.loaderService.load().then(() => {
        if(this.wrapper === undefined || this.wrapper.getChartType() !== this.data.chartType) {
          this.convertOptions();
          if(this.data.opt_firstRowIsData && Array.isArray(this.data.dataTable)) {
            this.data.dataTable = google.visualization.arrayToDataTable(this.data.dataTable, true);
          }
          this.wrapper = new google.visualization.ChartWrapper(this.data);
          this.registerChartWrapperEvents();
        } else {
          // this.unregisterEvents();

        }
        this.draw();
      });
    }
  }

  public draw(): void {
    if (this.data.dataTable) {
      this.wrapper.setDataTable(this.data.dataTable);
      this._draw();
    } else if (this.data.dataSourceUrl) {
      const query = new google.visualization.Query(this.data.dataSourceUrl);
      if (this.data.refreshInterval) {
        query.setRefreshInterval(this.data.refreshInterval);
      }
      if (this.data.query) {
        query.setQuery(this.data.query);
      }
      query.send((queryResponse: any) => {
        if(queryResponse.isError()) {
          return;
        }
        const dt = queryResponse.getDataTable();
        this.wrapper.setDataTable(dt);
        this.data.dataTable = dt;
        this._draw();
      });
    }
  }

  private _draw() {
    this.convertOptions();
    this.wrapper.setOptions(this.options);
    this.reformat();
    this.wrapper.draw(this.el.nativeElement.querySelector('div'));
  }

  /**
   * Applies formatters to data columns, if defined
   */
  private reformat() {
    if(!this.data) {
        return;
    }

    if (this.data.formatters !== undefined) {
      for (const formatterConfig of this.data.formatters) {
        const formatterConstructor = google.visualization[formatterConfig.type];
        const formatterOptions = formatterConfig.options;
        const formatter = new formatterConstructor(formatterOptions);
        if(formatterConfig.type === 'ColorFormat' && formatterOptions) {
          const _fmtOptions = formatterOptions as ColorFormatInterface;
          for(const range of _fmtOptions.ranges) {
            if (typeof(range.fromBgColor) !== 'undefined' && typeof(range.toBgColor) !== 'undefined') {
              formatter.addGradientRange(range.from, range.to,
                                         range.color, range.fromBgColor, range.toBgColor);
            } else {
              formatter.addRange(range.from, range.to, range.color, range.bgcolor);
            }
          }
        }
        const dt = this.wrapper.getDataTable();
        for (const col of formatterConfig.columns) {
          formatter.format(dt, col);
        }
      }
    }
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
    for(let i = column - 1; i >= 0; i--) {
      const role = dataTable.getColumnRole(i);
      const type = dataTable.getColumnType(i);
      if(role === 'data' || type === 'number') {
        series++;
      }
    }
    return series;
  }

  private getBoundingBoxForItem(item: DataPointPosition): BoundingBox {
    let boundingBox = {top: 0, left: 0, width: 0, height: 0};
    if(this.cli) {
      const column = item.column;
      const series = this.getSeriesByColumn(column);
      const row = item.row;
      let seriesType = this.options.seriesType;
      if(this.options.series && this.options.series[series] && this.options.series[series].type) {
        seriesType = this.options.series[series].type;
      }
      if(seriesType) {
        let selector = this.getSelectorBySeriesType(seriesType);
        if(selector) {
             selector = selector.replace('%s', series + '').replace('%c', column + '').replace('%r', row + '');
             const box = this.cli.getBoundingBox(selector);
             if(box) {
              boundingBox = box;
             }
        }
      }
    }

    return boundingBox;
  }

  private getValueAtPosition(position: DataPointPosition): any {
    if(position.row == null) {
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
      switch(chartType) {
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

  private unregisterEvents(): void {
    google.visualization.events.removeAllListeners(this.wrapper.getChart());
    google.visualization.events.removeAllListeners(this.wrapper);
  }

  private registerChartEvents(): void {
    const chart = this.wrapper.getChart();
    this.cli = chart.getChartLayoutInterface ? chart.getChartLayoutInterface() : null;
    if(this.mouseOver.observers.length > 0) {
      google.visualization.events.addListener(chart, 'onmouseover', (item: DataPointPosition) => {
        const event: ChartMouseOverEvent = this.parseMouseEvent(item) as ChartMouseOverEvent;
        event.tooltip = this.getHTMLTooltip();
        this.mouseOver.emit(event);
      });
    }
    if(this.mouseOverOneTime.observers.length > 0) {
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

  private mouseOverListener = (item: DataPointPosition) => {
    const event: ChartMouseOverEvent = this.parseMouseEvent(item) as ChartMouseOverEvent;
    event.tooltip = this.getHTMLTooltip();
    return event;
  }

  private mouseOutListener = (item: DataPointPosition) => {
    const event: ChartMouseOutEvent = this.parseMouseEvent(item) as ChartMouseOutEvent;
    return event;
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
    if(!gs) {
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
    if(selection.column != null) {
      event.column = selection.column;
      event.columnLabel = this.getColumnLabelAtPosition(selection);
    }
    if(gs.name) {
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
