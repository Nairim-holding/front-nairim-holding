import { IconProps } from "@/types/iconProps";
import { PiGear } from "react-icons/pi";

export default function IconGear({size=20, color="#fff"}: IconProps){
    return <PiGear size={size} color={color} className="svg-darkmode" />;
}