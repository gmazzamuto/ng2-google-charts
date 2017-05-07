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
  hoveredItemPosition: DataPointPosition;
  hoveredItemBoundingBox: BoundingBox;
  hoveredItemValue: any;
  tooltip: ChartHTMLTooltip | null;
  hoveredItemType: string;
}
