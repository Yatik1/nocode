export interface ElementType {
  id: string;
  type: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  props: Record<string, any>;
  x?: number;
  y?: number;
}

export interface CanvasType {
  id: string;
  type?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  props: Record<string, any>;
  number?: number;
  childrens: ElementType[];
}