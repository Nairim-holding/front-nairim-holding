import { IconProps } from "@/types/iconProps";
import { IoIosMale } from "react-icons/io";

export default function IconSex({ size=20, color="#fff"}: IconProps){
    return <IoIosMale size={size} color={color} className="svg-darkmode" />;
}