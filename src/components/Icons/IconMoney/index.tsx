import { IconMarginProps } from "@/types/iconProps";
import { MdAttachMoney } from "react-icons/md";

export default function IconMoney({size=20, color="#fff", margin}: IconMarginProps){
    return <MdAttachMoney  size={size} color={color} className={`svg-darkmode ${margin && 'mr-[-15px] ml-[-9px]'}`} />;
}