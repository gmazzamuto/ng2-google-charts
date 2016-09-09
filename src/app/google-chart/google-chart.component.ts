declare var google: any;

import { Component, OnInit, ElementRef } from '@angular/core';

import { GoogleChartsLoaderService } from '../google-charts-loader.service'

@Component({
  selector: 'app-google-chart',
  template: '<div></div>',
})
export class GoogleChartComponent implements OnInit {

  private wrapper: any;

  constructor(private el: ElementRef,
    private loaderService: GoogleChartsLoaderService) {}

  ngOnInit() {
    this.loaderService.load().then(() => this.createWrapper());
  }

  private createWrapper() {
    this.wrapper = new google.visualization.ChartWrapper({
      chartType: 'ColumnChart',
      dataTable: [['Germany', 'USA', 'Brazil', 'Canada', 'France', 'RU'],
      [700, 300, 400, 500, 600, 800]],
      options: {'title': 'Countries'}
    });
    this.wrapper.draw(this.el.nativeElement.querySelector('div'));
  }

}
