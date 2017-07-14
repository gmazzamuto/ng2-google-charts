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
import { ChartReadyEvent } from './chart-ready-event';
import { ChartErrorEvent } from './chart-error-event';
import { ChartSelectEvent } from './chart-select-event';
import {
  ChartMouseEvent,
  ChartMouseOverEvent,
  ChartMouseOutEvent,
  BoundingBox,
  DataPointPosition
}  from './chart-mouse-event';
import { ChartHTMLTooltip }  from './chart-html-tooltip';

@Component({
  selector: 'google-chart',
  template: '<div></div>',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GoogleChartComponent implements OnChanges {

  @Input() public data: any;

  @Output() public chartReady: EventEmitter<ChartReadyEvent>;

  @Output() public chartError: EventEmitter<ChartErrorEvent>;

  @Output() public chartSelect: EventEmitter<ChartSelectEvent>;

  @Output() public mouseOver: EventEmitter<ChartMouseOverEvent>;

  @Output() public mouseOut: EventEmitter<ChartMouseOutEvent>;

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
    this.chartReady = new EventEmitter();
    this.chartError = new EventEmitter();
    this.mouseOver = new EventEmitter();
    this.mouseOut = new EventEmitter();
  }

  public ngOnChanges(changes: SimpleChanges):void {
    let key = 'data';
    if (changes[key]) {

      if(!this.data) {
        return;
      }

      this.options = this.data.options;

      this.loaderService.load(this.data.chartType).then(() => {
        if(this.wrapper === undefined || this.wrapper.getChartType() !== this.data.chartType) {
          this.wrapper = new google.visualization.ChartWrapper(this.data);
        } else {
          this.unregisterChartEvents();
          this.wrapper.setDataTable(this.data.dataTable);
          this.wrapper.setOptions(this.options);
        }
        this.registerChartWrapperEvents();
        if(this.data.formatters !== undefined) {
            for(let formatterConfig of this.data.formatters) {
              let formatterConstructor = google.visualization[formatterConfig.type];
              let formatterOptions = formatterConfig.options;
              let formatter = new formatterConstructor(formatterOptions);
              for(let col of formatterConfig.columns) {
                formatter.format(this.wrapper.getDataTable(), col);
              }
          }
        }
        this.redraw();
      });
    }
  }

  public redraw(): void {
    this.wrapper.draw(this.el.nativeElement.querySelector('div'));
  }

  private getSelectorBySeriesType(seriesType: string): string {
    let selectors: any = {
      bars : 'bar#%s#%r',
      haxis : 'hAxis#0#label',
      line: 'point#%s#%r',
      legend : 'legendentry#%s',
      area: 'point#%s#%r'
    };

    let selector: string = selectors[seriesType];

    return selector;
  }

 /**
  * Given a column number, counts how many
  * columns have rol=="data". Those are mapped
  * one-to-one to the series array. When rol is not defined
  * a column of type number means a series column.
  * @param column to inspect
  */
  private getSeriesByColumn(column:number): number  {
    let series: number = 0;
    let dataTable = this.wrapper.getDataTable();
    for(let i=column-1; i>=0; i--) {
      let role = dataTable.getColumnRole(i);
      let type = dataTable.getColumnType(i);
      if(role === 'data' || type === 'number' ) {
        series++;
      }
    }
    return series;
  }

  private getBoundingBoxForItem(item: DataPointPosition): BoundingBox {
    let boundingBox = {top : 0, left:0, width:0, height:0};
    if(this.cli) {
      let column = item.column;
      let series = this.getSeriesByColumn(column);
      let bar = item.row;
      let row = item.row;
      let seriesType = this.options.seriesType;
      if(this.options.series && this.options.series[series] && this.options.series[series].type) {
        seriesType = this.options.series[series].type;
      }
      if(seriesType) {
        let selector = this.getSelectorBySeriesType(seriesType);
        if(selector) {
             selector = selector.replace('%s',series + '').replace('%c',column+'').replace('%r',row+'');
             let box = this.cli.getBoundingBox(selector);
             if(box) {
              boundingBox = box;
             }
        }
      }
    }

    return boundingBox;
  }

  private getValueAtPosition(position: DataPointPosition):any {
    if(position.row === null) {
      return null;
    }
    let dataTable = this.wrapper.getDataTable();
    let value = dataTable.getValue(position.row,position.column);
    return value;
  }

  private getColumnTypeAtPosition(position: DataPointPosition):string {
      let dataTable = this.wrapper.getDataTable();
      let type = dataTable.getColumnType(position.column) || '';
      return type;
  }

  private getColumnLabelAtPosition(position: DataPointPosition):string {
      let dataTable = this.wrapper.getDataTable();
      let type = dataTable.getColumnLabel(position.column) || '';
      return type;
  }

  private getHTMLTooltip(): ChartHTMLTooltip {
    let tooltipER = new ElementRef(this.el.nativeElement.querySelector('.google-visualization-tooltip'));
    return new ChartHTMLTooltip(tooltipER);
  }

  private parseMouseEvent(item: DataPointPosition): ChartMouseEvent {
        let event = {
          position: item,
          boundingBox: this.getBoundingBoxForItem(item),
          value: this.getValueAtPosition(item),
          columnType: this.getColumnTypeAtPosition(item),
          columnLabel: this.getColumnLabelAtPosition(item)
        };
        return event;
  }

  private unregisterChartEvents():void {
    google.visualization.events.removeAllListeners(this.wrapper);
  }

  private registerChartEvents(): void {
    if(this.mouseOver.observers.length > 0 ) {
      let chart = this.wrapper.getChart();
      this.cli = chart.getChartLayoutInterface();
      google.visualization.events.addListener(chart, 'onmouseover', (item: DataPointPosition) => {
        let event: ChartMouseOverEvent = this.parseMouseEvent(item) as ChartMouseOverEvent;
        event.tooltip = this.getHTMLTooltip();
        this.mouseOver.emit(event);
      });
    }

    if (this.mouseOut.observers.length > 0) {
      let chart = this.wrapper.getChart();
      this.cli = chart.getChartLayoutInterface();
      google.visualization.events.addListener(chart, 'onmouseout', (item: DataPointPosition) => {
        let event: ChartMouseOutEvent = this.parseMouseEvent(item) as ChartMouseOutEvent;
        this.mouseOut.emit(event);
      });
    }
  }

  private registerChartWrapperEvents(): void {

    google.visualization.events.addListener(this.wrapper, 'ready', () => {
      this.chartReady.emit({message: 'Chart ready'});
      this.registerChartEvents();
    });

    google.visualization.events.addListener(this.wrapper, 'error', (error: any) => {
      this.chartError.emit(error as ChartErrorEvent);
    });

    google.visualization.events.addListener(this.wrapper, 'select', () => {
      let event: ChartSelectEvent;
      let selection: {row: number; column: number} = this.wrapper.visualization.getSelection()[0];

      if (selection !== undefined) {
        let selectedRowValues = [];

        if (selection.row !== null) {
          let dataTable = this.wrapper.getDataTable();
          let numberOfColumns = dataTable.getNumberOfColumns();
          for (let i = 0; i < numberOfColumns; i++) {
            selectedRowValues.push(dataTable.getValue(selection.row, i));
          }
        }

        event = {
          message: 'select',
          row: selection.row,
          column: selection.column,
          ['selectedRowValues']: selectedRowValues
        };
      } else {
        event = {
          message: 'deselect',
          row: null,
          column: null,
          selectedRowValues: []
        };
      }

      this.chartSelect.emit(event);
    });
  }

}
