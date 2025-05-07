import Link from "next/link";
import { CiHeart, CiSearch } from "react-icons/ci";
import { RxDashboard } from "react-icons/rx";
import { LuUserRound } from "react-icons/lu";
import { TbDeviceAnalytics, TbMessage } from "react-icons/tb";
import { IoExitOutline, IoFileTrayFullOutline, IoSunnyOutline } from "react-icons/io5";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { CiSettings } from "react-icons/ci";
import Image from "next/image";

export default function Aside(){
    return(
        <aside className="fixed left-0 w-xm h-full bg-[#12101D]">
            <div className="flex flex-col h-full px-5 justify-center items-center gap-7 pb-3">
                <Link href="#">
                    <Image src="/logo-navbar.svg" alt="logo Nairim Holding" width={50} height={50}></Image>
                </Link>

                <Link href="#" className="mt-5">
                   <RxDashboard size={25} color="#FFF"/>
                </Link>
                <Link href="#">
                  <LuUserRound size={25} color="#FFF"/>
                </Link>
                <Link href="#"> 
                    <TbMessage size={25} color="#FFF"/>
                </Link>
                <Link href="#">
                    <TbDeviceAnalytics size={25} color="#FFF"/>
                </Link>
                <Link href="#">
                    <IoFileTrayFullOutline size={25} color="#FFF"/>
                </Link>

                <Link href="#">
                    <AiOutlineShoppingCart  size={25} color="#FFF"/>
                </Link>

                <Link href="#">
                    <CiHeart size={30} color="#FFF"/>
                </Link>

                <Link href="#"  >
                    <CiSettings size={30} color="#FFF"/>
                </Link>

                <Link href="#" className="mt-10">
                        <div className="bg-[#37373B] rounded-full w-[40px] h-full p-1">
                            <div className="bg-[#fff] w-[19px] h-[19px] rounded-full flex justify-center items-center">
                                <IoSunnyOutline color="#000" />
                            </div>
                        </div>
                    </Link>

                <Link href="#">
                    <IoExitOutline size={30} className="rotate-180" color="#FFF"/>
                </Link>

                

            </div>
        </aside>
    )
}