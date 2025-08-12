import { IconProps } from "@/types/iconProps";
import { IoEyeOutline } from "react-icons/io5";

export default function IconEye({size=20, color="#fff"}: IconProps){
    return <IoEyeOutline size={size} color={color} className="svg-darkmode" />;
}