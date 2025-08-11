export interface InputFileProps {
  label: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value?: FileList | File[] | null;
  accept?: string;
  id: string;
  required?: boolean;
  svg?: React.ReactNode;
  textButton?: string;
  disabled?: boolean;
}

export interface FilePreview {
  type: 'image' | 'pdf';
  name: string;
  url: string;
}