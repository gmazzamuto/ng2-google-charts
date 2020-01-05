import { ChartReadyEvent } from './google-chart/chart-ready-event';
import { ChartErrorEvent } from './google-chart/chart-error-event';
import { ChartSelectEvent } from './google-chart/chart-select-event';
import { ChartMouseOverEvent, ChartMouseOutEvent } from './google-chart/chart-mouse-event';
import { EventEmitter } from '@angular/core';

export interface GoogleChartComponentInterface {
  data: GoogleChartInterface;
  chartReady: EventEmitter<ChartReadyEvent>;
  chartError: EventEmitter<ChartErrorEvent>;
  chartSelect: EventEmitter<ChartSelectEvent>;
  mouseOver: EventEmitter<ChartMouseOverEvent>;
  mouseOut: EventEmitter<ChartMouseOutEvent>;
  wrapper: any;

  draw(): void;
}

export interface GoogleChartInterface {
  chartType: string;
  options?: object;
  dataTable?: any;
  dataSourceUrl?: string;
  query?: string;
  refreshInterval?: number;
  opt_firstRowIsData?: boolean;
  formatters?: FormatterInterface[];
  component?: GoogleChartComponentInterface;
}

export interface RangeInterface {
  from: Number | Date | number[];
  to: Number | Date | number[];
  color: string;
  bgcolor?: string;
  fromBgColor?: string;
  toBgColor?: string;
}

export interface FormatterOptionsInterface {
  ranges?: RangeInterface[];
}

export interface FormatterInterface {
  type: string;
  options?: FormatterOptionsInterface;
  columns: number[];
}
