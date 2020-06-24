declare var google: any;

export interface GoogleChartsControlInterface {
  controlType: string;
  options?: object;
  state?: object;
  component?: GoogleChartsControlComponent;
}

import {
  Component, OnInit, Input,
  ElementRef
} from '@angular/core';

import { GoogleChartsLoaderService } from '../google-charts-loader.service';

interface InternalGoogleChartsControlOptions extends GoogleChartsControlInterface {
  containerId: string;
}
@Component({
  selector: 'google-charts-control',
  template: '<div></div>',
})
export class GoogleChartsControlComponent implements OnInit {

  @Input() public data: GoogleChartsControlInterface;

  public wrapper: any;

  public constructor(private el: ElementRef,
                     private loaderService: GoogleChartsLoaderService) {
    this.el = el;
    this.loaderService = loaderService;
  }

  ngOnInit() {
    this.data.component = this;
  }

  public async ensureInit() {
    if (this.wrapper) {
      return;
    }
    await this.loaderService.load({packages: ['controls'] });
    let opt: InternalGoogleChartsControlOptions;
    opt = Object.create(this.data);
    opt.containerId = this.el.nativeElement.querySelector('div');
    this.wrapper = new google.visualization.ControlWrapper(opt);
  }
}
