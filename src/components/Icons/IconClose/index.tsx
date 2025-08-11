import { IconProps } from "@/types/iconProps";
import { IoMdClose } from "react-icons/io";

export default function IconClose({ size=20, color="#fff"}: IconProps){
    return <IoMdClose size={size} color={color} />
}