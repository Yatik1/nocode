export interface PageType {
  id:string, 
  pageNumber:number,
  pageName:string, 
  content: CanvasType[]
}

export interface ElementType {
  id: string;
  type: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  props: Record<string, any>;
  x?: number;
  y?: number;
  childrens?: ElementType[];
}

export interface CanvasType {
  id: string;
  type?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  props: Record<string, any>;
  number?: number;
  childrens: ElementType[];
}