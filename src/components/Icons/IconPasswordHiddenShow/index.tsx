import { IconPropsPasswordHiddenShow } from "@/types/iconProps";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";

export default function IconPasswordHiddenShow({ size=20, color="#fff", hidden=true }: IconPropsPasswordHiddenShow){
    if (hidden)
        return <IoEyeOutline size={size} color={color} className="svg-darkmode" />;

    return <IoEyeOffOutline size={size} color={color} className="svg-darkmode" />;
}