import { IconProps } from "@/types/iconProps";
import { IoMdSearch } from "react-icons/io";

export default function IconSearch({size=20, color="#fff"}: IconProps){
    return <IoMdSearch size={size} color={color} className="svg-darkmode" />;
}