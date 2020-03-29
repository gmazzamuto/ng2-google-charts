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
