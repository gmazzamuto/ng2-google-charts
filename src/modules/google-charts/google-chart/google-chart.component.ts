declare var google: any;

import {
  Component,
  ElementRef,
  forwardRef,
  ChangeDetectionStrategy
} from '@angular/core';

import {
  NG_VALUE_ACCESSOR,
  ControlValueAccessor
} from '@angular/forms';

import { GoogleChartsLoaderService } from '../google-charts-loader.service'

export const GOOGLE_CHART_COMPONENT_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => GoogleChartComponent),
    multi: true
};

@Component({
  selector: 'google-chart',
  template: '<div></div>',
  providers: [GOOGLE_CHART_COMPONENT_VALUE_ACCESSOR],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GoogleChartComponent implements ControlValueAccessor {

  dataModel: any;

  onChange = (_: any) => {};
  onTouched = () => {};

  private wrapper: any;

  constructor(private el: ElementRef,
    private loaderService: GoogleChartsLoaderService) {}

  //get accessor
  get value(): any {
    return this.dataModel;
  };

  set value(v: any) {
    if (v !== this.dataModel) {
        this.dataModel = v;
        this.onChange(v);
    }
  }

  //ControlValueAccessor interface
  writeValue(value: any) {
    if(value === null) {
      return;
    }
    if (value !== this.dataModel) {
      this.dataModel = value;
      this.loaderService.load(this.dataModel.chartType).then(() => {
        if(this.wrapper !== undefined) {
          this.wrapper.clear();
        }
        this.wrapper = new google.visualization.ChartWrapper(this.dataModel)
        this.wrapper.draw(this.el.nativeElement.querySelector('div'));
      });
    }
  }

  //ControlValueAccessor interface
  registerOnChange(fn: (_: any) => {}): void { this.onChange = fn; }
  registerOnTouched(fn: () => {}): void { this.onTouched = fn; }
}
