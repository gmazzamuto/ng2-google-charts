import { Component } from '@angular/core';

import {
  GoogleChartInterface,
  GoogleChartsControlInterface,
  GoogleChartsDashboardInterface,
} from 'ng2-google-charts';

@Component({
  selector: 'app-dashboard-gallery',
  templateUrl: './dashboard-gallery.component.html',
})
export class DashboardGalleryComponent {

  /** CategoryFilter */

  public categoryFilter: GoogleChartsControlInterface = {
    controlType: 'CategoryFilter',
    options: {
      filterColumnIndex: 0,
      ui: {
        allowTyping: false,
        allowMultiple: true,
        selectedValuesLayout: 'belowStacked'
      }
    },
    state: {selectedValues: ['CPU', 'Memory']}
  };

  public gaugeChart: GoogleChartInterface = {
    chartType: 'Gauge',
    options: {
      width: 400,
      height: 180
    }
  };

  public categoryFilterDashboard: GoogleChartsDashboardInterface = {
    dataTable: [
      ['Metric', 'Value'],
      ['CPU' , 12],
      ['Memory', 20],
      ['Disk', 7],
      ['Network', 54]
    ],
    bind: [
      [this.categoryFilter, this.gaugeChart],
    ]
  };


  /** DateRangeFilter */

  // Define a DateRangeFilter slider control for the 'Year' column.
  public slider: GoogleChartsControlInterface = {
    controlType: 'DateRangeFilter',
    options: {
      filterColumnLabel: 'Date',
      ui: { format: { pattern: 'yyyy' } }
    }
  };

  public tableChart: GoogleChartInterface = {
    chartType: 'Table',
    options: {
      width: '100%',
      height: '100%',
      chartArea: {top: 0, right: 0, bottom: 0}
    }
  };

  public dateRangeFilterDashboard: GoogleChartsDashboardInterface = {
    dataTable: [
      ['Extrasolar planet', 'Comment', 'Date'],
      [
        'Gamma Cephei Ab',
        'Deduced from radial velocity variations of the star Gamma Cephei',
        new Date(1988, 6, 13)
      ],
      ['HD 114762 b', 'At least 11 times the mass of Jupiter', new Date(1989, 4, 4)],
      ['PSR B1257+12', 'First confirmed discovery of an extrasolar planet', new Date(1992, 0, 22)],
      ['51 Pegasi b', 'Hot Jupiter with a 4.2 day orbit', new Date(1995, 9, 6)],
      ['47 Ursae Majoris b', 'First long-period planet discovered', new Date(1996, 0, 17)],
      ['Upsilon Andromedae', 'First multiple planetary system around a main sequence star', new Date(1996, 7, 12)],
      ['Gliese 876 b', 'First planet found orbiting a red dwarf', new Date(1998, 5, 23)],
      ['HD 209458 b', 'First exoplanet seen transiting its parent star', new Date(1999, 10, 5)],
      ['Iota Draconis b', 'Provided evidence that planets can exist around giant stars', new Date(2002, 0, 8)],
      ['PSR B1620-26 b', '12.7 billion year old planet orbiting a binary star system', new Date(2003, 6, 10)],
      ['2M1207 b', 'First planet found orbiting a brown dwarf', new Date(2004, 6, 22)],
      ['Mu Arae c', 'Hot Neptune', new Date(2004, 7, 25)],
      ['TrES-1 and HD 209458 b', 'First detection of light from exoplanets', new Date(2005, 2, 22)],
      ['OGLE-2005-BLG-390Lb', 'Detected used gravitational microlensing', new Date(2006, 1, 25)],
      ['Gliese 581 c', 'Inhospitable due to runaway greenhouse effect', new Date(2007, 3, 4)],
      ['Fomalhaut b', 'First exoplanet directly imaged by optical telescope', new Date(2008, 10, 13)],
      ['GJ 1214 b', 'Might be 75% water and 25% rock', new Date(2009, 11, 16)],
      ['HD 10180', 'Seven planets orbiting a sun-like star', new Date(2010, 7, 24)],
      ['55 Cancri e', 'Orbital period of just 0.73 days', new Date(2011, 3, 27)],
      ['Alpha Centauri Bb', 'Earth-mass planet in the star system closest to ours', new Date(2012, 9, 16)],
      ['PH2 b', 'Potentially habitable Jupiter-sized planet', new Date(2013, 0, 13)],
      ['Kepler-69c', 'First potentially habitable Earth-sized planet orbiting a sun-sized star', new Date(2013, 3, 18)]
    ],
    bind: [
      [this.slider, this.tableChart],
    ]
  };

  constructor() { }

}
