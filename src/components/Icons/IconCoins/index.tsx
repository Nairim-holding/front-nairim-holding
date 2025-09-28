import { IconProps } from "@/types/iconProps";
import { FaMoneyCheckDollar } from "react-icons/fa6";

export default function IconCoins({ size=20, color="#fff"}: IconProps){
    return <FaMoneyCheckDollar size={size} color={color} className="svg-darkmode" />;
}