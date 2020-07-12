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

export interface GoogleChartWrapper {
  draw(containerRef?: any): void;
  toJSON(): string;
  clone(): GoogleChartWrapper;
  getDataSourceUrl(): string;
  getDataTable(): any;
  getChartType(): string;
  getChartName(): string;
  getChart(): any;
  getContainerId(): string;
  getQuery(): string;
  getRefreshInterval(): string;
  getOption(key: string, defaultVal?: any): any;
  getOptions(): any;
  getView(): any;
  setDataSourceUrl(url: string): void;
  setDataTable(dt: any): void;
  setChartType(type: string): void;
  setChartName(name: string): void;
  setContainerId(id: string): void;
  setQuery(q: string): void;
  setRefreshInterval(interval: number): void;
  setOption(key: string, value: any): void;
  setOptions(opt: any): void;
  setView(view: any): void;
}
