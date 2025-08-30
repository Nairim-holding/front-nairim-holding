import { IconProps } from "@/types/iconProps";
import { FaFilter } from "react-icons/fa6";

export default function IconFilter({size=20, color="#fff"}: IconProps){
    return <FaFilter size={size} color={color} className="svg-darkmode" />;
}