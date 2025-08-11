export interface Option {
  value: string;
  label: string;
}

export interface SelectProps {
  options: Option[];
  defaultValue?: string;
  onChange?: (selectedValue: string) => void; 
  id: string;
  label: string;
  required?: boolean;
  svg?: React.ReactNode;
  tabIndex?: number;
  disabled?: boolean;
}