interface FieldMeta {
  field?: string;
  key: string;
  label: string;
  type?: "text" | "number" | "checkbox" | "select";
  options?: string[];
}

export interface SectionTopProps {
  hrefAdd: string;
  limit: number;
  currentPage: number;
  totalPage: number;
  search: string;
  route: string;
  count: number;
  routeApi: string;
  delTitle: string;
  data?: any;
  fields?: FieldMeta[];
  titlePlural?: string;
}