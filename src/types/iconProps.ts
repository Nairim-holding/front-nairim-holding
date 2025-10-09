export interface IconProps{
    size: number;
    color: string;
}

export interface IconMarginProps extends IconProps{
    margin: boolean;
}

export interface IconPropsPasswordHiddenShow extends IconProps{
    hidden: boolean;
}