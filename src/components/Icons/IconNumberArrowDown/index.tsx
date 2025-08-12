import { IconProps } from "@/types/iconProps";
import { MdKeyboardArrowDown } from "react-icons/md";

export default function IconNumberArrowDown({size=20, color="#fff"}: IconProps){
    return <MdKeyboardArrowDown size={size} color={color} className="svg-darkmode"></MdKeyboardArrowDown>;
}