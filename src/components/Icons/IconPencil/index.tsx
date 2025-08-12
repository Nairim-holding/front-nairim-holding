import { IconProps } from "@/types/iconProps";
import { GoPencil } from "react-icons/go";

export default function IconPencil({size=20, color="#fff"}: IconProps){
    return <GoPencil size={size} color={color} className="svg-darkmode" />;
}