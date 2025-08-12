"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import Logo from "./Logo";
import List from "./List";
import { usePathname } from "next/navigation";
import { AsideProps } from "./type";

export default function Aside({ darkMode, setDarkMode }: AsideProps) {
  const [openAside, setOpenAside] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (!isHovering) {
      setOpenAside(false);
    }
  }, [pathname]);

  const handleMouseEnter = () => {
    setIsHovering(true);
    setOpenAside(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    setOpenAside(false);
  };

  return (
    <aside
      className={`fixed h-full ${
        darkMode ? "bg-[#12101D]" : "bg-[#fff]"
      } left-0 top-0 z-[1000] rounded-r-xl aside-shadow`}
    >
      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={`flex flex-col h-full pt-5 px-5 gap-7 pb-3 items-start ${
          openAside ? "w-[300px]" : "w-[90px]"
        } transition-all ease-linear relative`}
      >
        <Link href="/dashboard">
          <Logo
            darkMode={darkMode}
            openAside={openAside}
          />
        </Link>

        <List
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          openAside={openAside}
          handleMouseLeave={handleMouseLeave}
        />
      </div>
    </aside>
  );
}
