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

export interface ChartMouseEvent {
  position: DataPointPosition;
  boundingBox: BoundingBox;
  value: any;
  columnType: string;
  columnLabel: string;
}

export interface ChartMouseOverEvent extends ChartMouseEvent {
  tooltip: ChartHTMLTooltip | null;
}

export interface ChartMouseOutEvent extends ChartMouseEvent {}
