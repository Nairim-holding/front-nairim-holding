"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import Logo from "./Logo";
import List from "./List";
import { AsideProps } from "./type";
import { RxHamburgerMenu, RxCross2 } from "react-icons/rx";
import { usePathname } from "next/navigation";

export default function Aside({ darkMode, setDarkMode }: AsideProps) {
  const [openAside, setOpenAside] = useState(false);
  const pathname = usePathname();

  // Fecha o aside sempre que trocar de página
  useEffect(() => {
    setOpenAside(false);
  }, [pathname]);

  return (
    <>
      {/* Botão Hamburguer / X */}
      <button
        className={`fixed top-[8px] z-[1100] bg-white p-2 rounded-md shadow-md transition-all duration-300
          ${openAside ? "left-[14.25rem] opacity-100" : "left-[10px] opacity-70 hover:opacity-100"}
        `}
        onClick={() => setOpenAside(!openAside)}
      >
        {openAside ? (
          <RxCross2 size={25} className="svg-darkmode" />
        ) : (
          <RxHamburgerMenu size={25} className="svg-darkmode" />
        )}
      </button>

      {/* Overlay */}
      <div
        onClick={() => setOpenAside(false)}
        className={`fixed inset-0 bg-black/50 z-[999] transition-opacity duration-300 ${
          openAside ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      />

      {/* Aside */}
      <aside
        className={`fixed top-0 left-0 h-full w-[300px] z-[1000] aside-shadow
        ${darkMode ? "bg-[#12101D]" : "bg-[#fff]"}
        transform transition-transform duration-300 ease-in-out
        ${openAside ? "translate-x-0" : "-translate-x-full"}
      `}
      >
        <div className="flex flex-col h-full pt-5 px-5 gap-7 pb-3 items-start">
          <Link href="/dashboard">
            <Logo darkMode={darkMode} openAside={openAside} />
          </Link>

          <List
            darkMode={darkMode}
            setDarkMode={setDarkMode}
            openAside={openAside}
            handleMouseLeave={() => setOpenAside(false)}
          />
        </div>
      </aside>
    </>
  );
}
