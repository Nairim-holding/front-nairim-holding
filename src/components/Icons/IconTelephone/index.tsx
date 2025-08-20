import { IconProps } from "@/types/iconProps";
import { MdOutlinePhone } from "react-icons/md";

export default function IconTelephone({size=20, color="#fff"}: IconProps){
    return <MdOutlinePhone size={size} color={color} className="svg-darkmode" />;
}