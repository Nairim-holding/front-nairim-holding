export interface FieldMeta {
  key: string;
  label: string;
  type?: "text" | "number" | "checkbox" | "select";
  options?: any[];
  field?: string;
}