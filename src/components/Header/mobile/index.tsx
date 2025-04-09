'use client'
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { RxHamburgerMenu } from "react-icons/rx";

export default function HeaderMobile(){
    const [menu, setMenu] = useState<boolean>(false);
    return(
        <header className="bg-secondary fixed w-full h-[80px] rounded-2xl shadow-lg z-[10]">
            <div className="flex items-center justify-center h-full gap-10">
                <Link href={'/'}>
                    <Image src={'/logo.svg'} alt="logo da nairil holding" width={91} height={45} className="size-auto"></Image>
                </Link>

                <RxHamburgerMenu onClick={() => setMenu(!menu)} className="cursor-pointer" width={50} height={50} size={25} />
            </div>

            {
            menu &&
            <aside className="absolute bg-secondary w-full max-w-[400px] rounded-2xl h-[calc(100vh-79px)] shadow-lg top-[81px]">
                <nav>
                    <ul className="flex gap-8 items-start flex-col h-screen p-10">
                        <li className="text-[16px] font-normal font-roboto ">
                            <Link href="#">Inicio</Link>
                        </li>
                        <li className="text-[16px] font-normal font-roboto ">
                            <Link href="#">Imóveis</Link>
                        </li>
                        <li className="text-[16px] font-normal font-roboto ">
                            <Link href="#">Sobre</Link>
                        </li>
                        <li className="text-[16px] font-normal font-roboto ">
                            <Link href="#">Contato</Link>
                        </li>
                        <li className="w-full border-t pt-5 border-opacity-20 border-text_black_light">
                            <Link href={"/signup"} className="block w-full bg-blue py-2 h-[35px] rounded-lg text-white flex items-center justify-center font-medium font-roboto border border-blue duration-300 ease hover:text-blue hover:bg-transparent">
                                Login
                            </Link>
                        </li>
                    </ul>
                </nav>
            </aside>
            }

        </header>
    )
}