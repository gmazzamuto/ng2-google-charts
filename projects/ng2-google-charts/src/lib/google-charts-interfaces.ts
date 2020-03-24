import { ChartReadyEvent } from './google-chart/chart-ready-event';
import { ChartErrorEvent } from './google-chart/chart-error-event';
import { ChartSelectEvent } from './google-chart/chart-select-event';
import { RegionClickEvent } from './google-chart/geochart-events';
import { ChartMouseOverEvent, ChartMouseOutEvent } from './google-chart/chart-mouse-event';
import { EventEmitter } from '@angular/core';

export interface GoogleChartsSettings {
  /** (v45) An API key that you may use with Geochart and Map Chart */
  mapsApiKey?: string;

  googleChartsVersion?: string;

  /** language code or locale (e.g. 'it', 'en_US') */
  language?: string;

  /**
   * (v47) When set to true, all charts and tooltips that generate HTML from
   * user-supplied data will sanitize it by stripping out unsafe elements and
   * attributes.
   */
  safeMode?: boolean;

  packages?: string[];
}

export interface GoogleChartComponentInterface {
  data: GoogleChartInterface;
  chartReady: EventEmitter<ChartReadyEvent>;
  chartError: EventEmitter<ChartErrorEvent>;
  chartSelect: EventEmitter<ChartSelectEvent>;
  mouseOver: EventEmitter<ChartMouseOverEvent>;
  mouseOut: EventEmitter<ChartMouseOutEvent>;
  regionClick: EventEmitter<RegionClickEvent>;
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
  firstRowIsData?: boolean;
  formatters?: FormatterInterface[];
  view?: string | object | object[];

  component?: GoogleChartComponentInterface;
}

export interface ArrowFormatInterface {
  base: number;
}

export interface BarFormatInterface {
  base?: number;
  colorNegative?: string;
  colorPositive?: string;
  drawZeroLine?: boolean;
  max?: number;
  min?: number;
  showValue?: boolean;
  width?: number;
}

export interface RangeInterface {
  from: number | Date | number[];
  to: number | Date | number[];
  color?: string;
  bgcolor?: string;
  fromBgColor?: string;
  toBgColor?: string;
}

export interface ColorFormatInterface {
  ranges?: RangeInterface[];
}

export interface DateFormat {
  formatType?: string;
  pattern?: string;
  timeZone?: number;
}

export interface NumberFormatInterface {
  decimalSymbol?: string;
  fractionDigits?: number;
  groupingSymbol?: string;
  negativeColor?: string;
  negativeParens?: boolean;
  pattern?: string;
  prefix?: string;
  suffix?: string;
}

export interface PatternFormatInterface {
  pattern: string;
  dstColumnIndex?: number;
}

export interface FormatterInterface {
  type: string;
  options?: (
    ArrowFormatInterface
  | BarFormatInterface
  | ColorFormatInterface
  | DateFormat
  | NumberFormatInterface
  | PatternFormatInterface
  );
  columns: number[];
}
