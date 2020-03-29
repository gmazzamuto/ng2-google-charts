declare var google: any;

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

export interface GoogleChartsDataTableInterface {
  dataTable?: any;
  firstRowIsData?: boolean;
  query?: string;
  dataSourceUrl?: string;

  /** Refresh interval, in seconds, when using remote data source. */
  refreshInterval?: number;

  /** Timeout in seconds, when using remote data source */
  timeout?: number;

  /** Called after query executed. DataTable is updated automatically.
   * @param queryResponse google.visualization.QueryResponse
   */
  queryCallback?: (queryResponse: any) => any;

  formatters?: FormatterInterface[];
  view?: string | object | object[];
}

import {
  EventEmitter,
  Output,
} from '@angular/core';

export class GoogleChartsDataTable {
  private dataTable: any;
  public query: any;
  public tid: any;

  @Output() dataTableChanged: EventEmitter<any> = new EventEmitter();

  constructor(private opt: GoogleChartsDataTableInterface) {
    if (opt) {
      this._setDataTable(opt.dataTable, opt.firstRowIsData);
    }
  }

  private send() {
    if (this.query === undefined) {
      return;
    }
    this.query.send((queryResponse: any) => {
      this.setDataTable(queryResponse.getDataTable());
      if (this.opt.queryCallback) {
        this.opt.queryCallback(queryResponse);
      }
    });
  }

  public init(opt?: GoogleChartsDataTableInterface) {
    if (opt) {
      this.opt = opt;
    }

    if (this.tid !== undefined) {
      // doesn't work, see https://github.com/google/google-visualization-issues/issues/2381
      // this.query.abort();
      window.clearInterval(this.tid);
      this.tid = undefined;
    }

    if (this.opt.dataSourceUrl) {
      this.query = new google.visualization.Query(this.opt.dataSourceUrl);
      if (this.opt.query) {
        this.query.setQuery(this.opt.query);
      }
      if (this.opt.timeout !== undefined) {
        this.query.setTimeout(this.opt.timeout);
      }
      if (this.opt.refreshInterval) {
        // this.query.setRefreshInterval(this.opt.refreshInterval);
        this.tid = window.setInterval(() => {
          this.send();
        }, this.opt.refreshInterval * 1000);
      }
      this.send();
    } else {
      this.setDataTable(this.opt.dataTable);
    }
  }

  /**
   * @returns Underlying google.visualization.DataTable
   */

  public getDataTable() {
    return this.dataTable;
  }

  public setDataTable(dt: any, firstRowIsData?: boolean) {
    if (firstRowIsData === undefined) {
      firstRowIsData = this.opt.firstRowIsData;
    }
    this._setDataTable(dt, firstRowIsData);
    this.dataTableChanged.emit(this.dataTable);
  }

  private _setDataTable(dt: any, firstRowIsData?: boolean) {
    if (Array.isArray(dt)) {
      dt = google.visualization.arrayToDataTable(dt, firstRowIsData);
    }
    this.dataTable = dt;
    this.reformat();
  }

  /**
   * Applies formatters to data columns, if defined
   */

  public reformat() {
    const dt = this.dataTable;
    if (dt === undefined) {
      return;
    }

    if (this.opt.formatters === undefined) {
      return;
    }

    for (const formatterConfig of this.opt.formatters) {
      let formatter: any;
      if (formatterConfig.type === 'PatternFormat') {
        const fmtOptions = formatterConfig.options as PatternFormatInterface;
        formatter = new google.visualization.PatternFormat(fmtOptions.pattern);
        formatter.format(dt, formatterConfig.columns, fmtOptions.dstColumnIndex);
        continue;
      }

      const formatterConstructor = google.visualization[formatterConfig.type];
      const formatterOptions = formatterConfig.options;
      formatter = new formatterConstructor(formatterOptions);
      if (formatterConfig.type === 'ColorFormat' && formatterOptions) {
        const fmtOptions = formatterOptions as ColorFormatInterface;
        for (const range of fmtOptions.ranges) {
          if (typeof (range.fromBgColor) !== 'undefined'
              && typeof (range.toBgColor) !== 'undefined') {
            formatter.addGradientRange(range.from, range.to,
              range.color, range.fromBgColor, range.toBgColor);
          } else {
            formatter.addRange(range.from, range.to, range.color, range.bgcolor);
          }
        }
      }

      for (const col of formatterConfig.columns) {
        formatter.format(dt, col);
      }
    }
  }
}
