import { IconProps } from "@/types/iconProps";
import { RxExit } from "react-icons/rx";

export default function IconExit({size=20, color="#fff"}: IconProps){
    return <RxExit size={size} color={color} className="rotate-[180deg] svg-darkmode" />;
}