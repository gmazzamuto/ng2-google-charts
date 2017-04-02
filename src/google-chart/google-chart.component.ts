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

  private wrapper: any;

  private el: ElementRef;
  private loaderService: GoogleChartsLoaderService;
  private eventsLoaded: boolean;

  public constructor(el: ElementRef,
                     loaderService: GoogleChartsLoaderService) {
    this.el = el;
    this.loaderService = loaderService;
    this.chartSelect = new EventEmitter();
    this.chartReady = new EventEmitter();
    this.chartError = new EventEmitter();
    this.eventsLoaded = false;
  }

  public ngOnChanges(changes: SimpleChanges):void {
    let key = 'data';
    if (changes[key]) {
      if(!this.data) {
        return;
      }

      this.loaderService.load(this.data.chartType).then(() => {
        if(this.wrapper === undefined) {
          this.wrapper = new google.visualization.ChartWrapper(this.data);
        } else {
          this.wrapper.setDataTable(this.data.dataTable);
          this.wrapper.setOptions(this.data.options);
        }
        if ( ! this.eventsLoaded) {
          this.eventsLoaded = true;
          this.registerChartEvents();
        }
        this.wrapper.draw(this.el.nativeElement.querySelector('div'));
      });
    }
  }

  private registerChartEvents(): void {
    google.visualization.events.addListener(this.wrapper, 'ready', () => {
      this.chartReady.emit({message: 'Chart ready'});
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
