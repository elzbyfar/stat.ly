import { Chart } from 'chart.js/auto';

export type StateMarker = {
  id: string;
  state: string;
  start: number;
  end: number;
  duration: number;
};

export type BoxAnnotationProps = {
  backgroundColor: string;
  xMax: number;
  xMin: number;
  content: string;
  duration: number;
  display: boolean;
};

export type LineAnnotationProps = {
  borderColor: string;
  dashed?: boolean;
  content: string;
  value: number;
  unit: string;
  display: boolean;
};

export type AnnotationEntry = {
  type: string;
  backgroundColor?: string;
  borderWidth: number;
  display: boolean;
  xMax?: number;
  xMin?: number;
  borderColor?: string;
  borderDash?: [number, number];
  label: {
    display: boolean;
    enabled: boolean;
    color: string;
    content: (() => void) | number | string;
    backgroundColor?: string;
    zIndex?: number;
    font: { size: number; weight: string | number };
    position?: { x: string; y: string } | string;
    rotation?: number;
    padding?: { top: number; bottom: number };
  };
  enter?: (element: Chart, event: any) => boolean;
  leave?: (element: Chart, event: any) => boolean;
  scaleID?: string;
  value?: () => void | number;
};

export type DatasetProps = {
  label: string;
  mainField: string;
  readings: { ts: number; [key: string]: number }[];
};

export type Annotation = {
  [key: string]: AnnotationEntry;
};

export type ScalesProps = {
  unit: string;
  min?: number;
  max?: number;
};

export type ZoomProps = {
  zoomRange: [number, number];
  setZoomRange: (range: [number, number]) => void;
  readings: { ts: number; [key: string]: number }[];
};

export type PowerCategory = {
  title: string;
  description: string;
  items: string[];
  keyMetrics: string[];
  [key: string]: string | string[];
};

export type CheckboxData = {
  value: string;
  disabled: boolean;
};

export type CheckboxTreeProps = {
  label: string;
  annotationKey: string;
  nested?: boolean;
  onCheck: () => void;
  checked: boolean;
  nestedHeight: string;
  children: any[];
};

export type CheckboxBranchProps = {
  nested?: boolean;
  nestHeight?: string;
  label: string;
  annotationKey: string;
  onCheck: (key: string) => void;
  checked: boolean | 'indeterminate';
};

export type CheckboxDropdownProps = {
  label: string;
  toggled: boolean;
  onToggle: (prev: boolean) => void;
  checkboxes: any[];
};

export type TriggerProps = {
  toggled: boolean;
  onToggle: (prev: boolean) => void;
  label: string;
  disabled?: boolean;
}

export type Reading = { ts: number; [key: string]: number };

export type Checked = boolean | 'indeterminate'