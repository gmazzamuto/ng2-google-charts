export interface ChartSelectEvent {
  message: string;
  row: number | null;
  column: number | null;
  columnLabel: string;
  selectedRowValues: any[];
  selectedRowFormattedValues: any[];
}
