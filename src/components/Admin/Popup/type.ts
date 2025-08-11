import { ReactNode } from "react";

export interface PopupProps{
    title: string;
    subtitle: string | ReactNode;
    visible: boolean;
    setVisible: React.Dispatch<React.SetStateAction<boolean>>;
    onConfirm: () => Promise<any>;
}