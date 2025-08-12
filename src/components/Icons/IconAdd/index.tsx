import { IconProps } from "@/types/iconProps";
import { BsFillHouseAddFill } from "react-icons/bs";

export default function IconAdd({size=20, color="#fff"}: IconProps){
    return <BsFillHouseAddFill size={size} color={color} className="svg-darkmode" />;
}