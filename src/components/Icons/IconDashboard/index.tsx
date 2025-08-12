import { IconProps } from "@/types/iconProps";
import { RxDashboard } from "react-icons/rx";

export default function IconDashboard({size=20, color="#fff"}: IconProps){
    return <RxDashboard size={size} color={color} className="svg-darkmode" />;
}