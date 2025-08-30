import { IconProps } from "@/types/iconProps";
import { FaTrash } from "react-icons/fa6";

export default function IconTrash({size=20, color="#fff"}: IconProps){
    return <FaTrash size={size} color={color} className="svg-darkmode" />;
}