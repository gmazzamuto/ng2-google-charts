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

export interface DataPointHoveredEvent {
  position: DataPointPosition;
  boundingBox: BoundingBox;
  value: any;
  tooltip: ChartHTMLTooltip | null;
  columnType: string;
}
