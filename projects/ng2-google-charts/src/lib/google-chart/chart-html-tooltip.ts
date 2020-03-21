
import { ElementRef } from '@angular/core';

export class ChartHTMLTooltip {

  public static readonly PIXELS: string = 'px';

  private tooltipDOMElement: ElementRef;

  public constructor(el: ElementRef) {
    this.tooltipDOMElement = el;
  }

  public setPosition(x: number, y: number): void {
    this.tooltipDOMElement.nativeElement.style.left = x + ChartHTMLTooltip.PIXELS;
    this.tooltipDOMElement.nativeElement.style.top = y + ChartHTMLTooltip.PIXELS;
  }

  public getDOMElement(): ElementRef {
    return this.tooltipDOMElement;
  }

}
