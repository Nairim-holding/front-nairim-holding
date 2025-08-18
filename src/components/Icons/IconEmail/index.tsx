import { IconProps } from "@/types/iconProps";
import { MdAlternateEmail } from "react-icons/md";

export default function IconEmail({ size=20, color="#fff"}: IconProps){
    return <MdAlternateEmail size={size} color={color} className="svg-darkmode" />;
}