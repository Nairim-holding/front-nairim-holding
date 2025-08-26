export interface InputProps {
  id: string;
  label: string;
  required?: boolean;
  type: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeHolder?: string;
  svg?: React.ReactNode;
  disabled?: boolean;
  tabIndex?: number;
  mask?: string;
  autoFocus?: boolean;
  password?: boolean;
  maxLength?: number;
}
