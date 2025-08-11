export interface TextAreaProps{
    id: string;
    label: string;
    required?: boolean;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    placeHolder: string;
    svg?: React.ReactNode;
    tabIndex?: number;
    disabled?: boolean;
}