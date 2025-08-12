import { IconProps } from "@/types/iconProps";
import { FaRegTrashAlt } from "react-icons/fa";

export default function IconTrash({size=20, color="#fff"}: IconProps){
    return <FaRegTrashAlt size={size} color={color} className="svg-darkmode" />;
}