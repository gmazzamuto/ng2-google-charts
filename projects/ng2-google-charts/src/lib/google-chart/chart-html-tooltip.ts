
import { ElementRef } from '@angular/core';

export class ChartHTMLTooltip {

  public static readonly PIXELS: string = 'px';

  public constructor(private el: ElementRef) {}

  public setPosition(x: number, y: number): void {
    this.el.nativeElement.style.left = x + ChartHTMLTooltip.PIXELS;
    this.el.nativeElement.style.top = y + ChartHTMLTooltip.PIXELS;
  }

  public getDOMElement(): ElementRef {
    return this.el;
  }

}
