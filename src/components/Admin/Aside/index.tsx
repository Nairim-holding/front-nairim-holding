import Link from "next/link";
import { useState } from "react";
import PropsDarkMode from "@/types/propsDarkMode";
import Logo from "./Logo";
import AccountInfo from "./AccountInfo";
import List from "./List";

export default interface Aside extends PropsDarkMode {
    userName: string | undefined;
}


export default function Aside({ darkMode, setDarkMode, userName } : Aside ){
    const [openAside, setOpenAside] = useState<boolean>(false);
    return(
        <aside className={`fixed h-full ${darkMode ? 'bg-[#12101D]' : 'bg-[#fff]'} left-0 top-0`} >
            <div onMouseEnter={(e) => setOpenAside(true)} onMouseLeave={(e) => setOpenAside(false)} className={`flex flex-col h-full pt-5 px-5 gap-7 pb-3 items-start  ${openAside ? 'w-[300px]' : 'w-[90px]'} transition-all ease-linear relative`}>
                <Link href="#">
                    <Logo darkMode={darkMode} setDarkMode={setDarkMode} openAside={openAside} ></Logo>
                </Link>
                
                <List darkMode={darkMode} setDarkMode={setDarkMode} openAside={openAside}></List>

 
                <AccountInfo darkMode={darkMode} setDarkMode={setDarkMode} openAside={openAside} userName={userName}></AccountInfo>
            </div>
        </aside>
    )
}