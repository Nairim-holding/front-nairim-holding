export interface MessageProps {
    success?: boolean;
    error?: boolean;
    message: React.ReactNode | string;
    visible: boolean;
    setVisible: (value: boolean) => void;
}