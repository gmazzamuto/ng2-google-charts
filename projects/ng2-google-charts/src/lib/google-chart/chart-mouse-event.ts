import { ChartHTMLTooltip } from './chart-html-tooltip';

export interface DataPointPosition {
  row: number;
  column: number;
}

export interface BoundingBox {
  top: number;
  left: number;
  width: number;
  height: number;
}

export class ChartMouseEvent {
  public position: DataPointPosition;
  public boundingBox: BoundingBox;
  public value: any;
  public columnType: string;
  public columnLabel: string;
}

export class ChartMouseOverEvent extends ChartMouseEvent {
  public tooltip: ChartHTMLTooltip | null;
}

export class ChartMouseOutEvent extends ChartMouseEvent {}
