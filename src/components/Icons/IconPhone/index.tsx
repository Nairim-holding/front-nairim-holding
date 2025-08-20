import { IconProps } from "@/types/iconProps";
import { MdSmartphone } from "react-icons/md";

export default function IconPhone({size=20, color="#fff"}: IconProps){
    return <MdSmartphone size={size} color={color} className="svg-darkmode" />;
}