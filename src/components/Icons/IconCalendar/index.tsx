import { IconProps } from "@/types/iconProps";
import { LuCalendar1 } from "react-icons/lu";

export default function IconCalendar({ size=20, color="#fff"}: IconProps){
    return <LuCalendar1 size={size} color={color} className="svg-darkmode" />;
}