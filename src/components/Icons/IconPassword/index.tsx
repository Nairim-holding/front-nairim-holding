import { IconProps } from "@/types/iconProps";
import { LuLockKeyhole } from "react-icons/lu";

export default function IconPassword({ size=20, color="#fff"}: IconProps){
    return <LuLockKeyhole size={size} color={color} className="svg-darkmode" />;
}