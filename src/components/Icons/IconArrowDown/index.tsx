import { IconProps } from "@/types/iconProps";
import { SlArrowDown } from "react-icons/sl";

export default function IconArrowDown({size=20, color="#fff"}: IconProps){
    return <SlArrowDown size={size} color={color} className="svg-darkmode" />;
}