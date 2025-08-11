export interface FormProps {
  onSubmit?: () => void;
  children: React.ReactNode;
  className?: string;
  title?: string;
  svg?: React.ReactNode;
}
