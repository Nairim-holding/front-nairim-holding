import Image from "next/image";
import Link from "next/link";
import { CiSearch } from "react-icons/ci";

export default function HeaderDesktop(){
    return(
        <header className="bg-secondary fixed w-full h-[80px] shadow-lg z-[10]">
            <div className="flex items-center justify-center h-full gap-10">
                <Link href={'/'}>
                    <Image src={'/logo.svg'} alt="logo da nairil holding" width={91} height={45} className="size-auto"></Image>
                </Link>


                <nav>
                    <ul className="flex gap-8 items-center">
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
                        <li>
                            <Link href={"#"}>
                                <CiSearch width={24} height={24} size={24}/>
                            </Link>
                        </li>
                        <li>
                            <Link href={"/signup"} className="block bg-blue py-2 w-[100px] h-[35px] rounded-lg text-white flex items-center justify-center font-medium font-roboto border border-blue duration-300 ease hover:text-blue hover:bg-transparent">
                                Login
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    )
}