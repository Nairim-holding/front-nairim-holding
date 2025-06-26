'use client';

import PropsDarkMode from "@/types/propsDarkMode";
import Link from "next/link";
import { IoExitOutline } from "react-icons/io5";
import { useEffect, useState } from "react";
import Image from "next/image";

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
  const [showOverlay, setShowOverlay] = useState(false);

  function salamaleco() {
    setShowOverlay(true);
    setTimeout(() => {
      setShowOverlay(false);
    }, 5000); 
  }

  return (
    <>
      <div
        className={`w-full flex items-center justify-center gap-5 ${darkMode ? "bg-[#35314C] text-white" : "bg-[#F1F1F1] text-black"} 
        absolute bottom-0 left-0 py-2 px-5
        ${openAside ? '' : 'bg-transparent !important'}
        `}>
        {openAside && (
          <>
            <figure className="w-[50px] h-[50px] rounded-full overflow-hidden">
              <div className="w-full h-full bg-white"></div>
            </figure>
            <div className="flex flex-col items-start min-w-[100px] overflow-hidden">
              <p className="text-[16px] font-normal">{userName ?? 'Carregando...'}</p>
            </div>
          </>
        )}
        <button className="flex justify-center" onClick={salamaleco}>
          <IoExitOutline size={30} className="rotate-180" color={darkMode ? "#fff" : "#000"} />
        </button>
      </div>

      {showOverlay && (
        <div className="fixed top-0 left-0 w-full h-full z-[9999] flex items-center justify-center bg-black bg-opacity-80 animate-blink">
          <Image
            src="/brainrot/gif1.gif" 
            alt="Overlay"
            className="w-full h-full object-cover"
            width={500}
            height={500}
          />
        </div>
      )}

      <style jsx global>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }

        .animate-blink {
          animation: blink 0.5s steps(1, end) infinite;
        }
      `}</style>
    </>
  );
}
