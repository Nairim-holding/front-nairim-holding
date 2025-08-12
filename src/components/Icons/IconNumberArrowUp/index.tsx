import { IconProps } from "@/types/iconProps";
import { MdKeyboardArrowUp } from "react-icons/md";

export default function IconNumberArrowUp({size=20, color="#fff"}: IconProps){
    return <MdKeyboardArrowUp size={size} color={color} className="svg-darkmode" />;
}