import PropsDarkMode from "@/types/propsDarkMode";
import Link from "next/link";
import { IoExitOutline } from "react-icons/io5";

interface PropsAccountInfo extends PropsDarkMode {
  openAside: boolean;
  userName: string | undefined;
}

export default function AccountInfo({
  darkMode,
  setDarkMode,
  openAside,
  userName
}: PropsAccountInfo) {
  return (
    <div
      className={`w-full flex items-center justify-center gap-5 ${ darkMode ? "bg-[#35314C] text-white" : "bg-[#F1F1F1] text-black"} 
      absolute bottom-0 left-0 py-2 px-5
      ${openAside ? '' : 'bg-transparent !important'}
      `}>
      {openAside && (
        <>
          <figure className="w-[50px] h-[50px] rounded-full overflow-hidden">
            <div className="w-full h-full bg-white"></div>
          </figure>
          <div className="flex flex-col items-start min-w-[100px] overflow-hidden">
            <p className="text-[16px] font-normal">{userName ? userName : 'Carregando...'}</p>
            {/*<p className="text-[16px] font-normal">Web Designer</p> */}
          </div>
        </>
      )}
      <Link href="#" className="flex justify-center">
        <IoExitOutline size={30} className="rotate-180" color={darkMode ? "#fff" : "#000"} />
      </Link>
    </div>
  );
}
