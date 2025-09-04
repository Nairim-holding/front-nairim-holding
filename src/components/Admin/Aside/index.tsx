"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import Logo from "./Logo";
import List from "./List";
import { usePathname } from "next/navigation";
import { AsideProps } from "./type";
import ButtonToggle from "./ButtonToggle";
import { RxHamburgerMenu } from "react-icons/rx";
import NavItem from "./NavItem";
import IconAdd from "@/components/Icons/IconAdd";

export default function Aside({ darkMode, setDarkMode }: AsideProps) {
  const [showSublist, setShowSublist] = useState(false);
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

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
      if (typeof window !== 'undefined') {
          setIsMobile(window.innerWidth <= 650);
          const handleResize = () => setIsMobile(window?.innerWidth <= 650);
          window.addEventListener('resize', handleResize);
          return () => window.removeEventListener('resize', handleResize);
      }
  }, []);

  useEffect(() => {
  if (isMobile) {
    setShowSublist(false);
  }
}, [pathname, isMobile]);
  return (
    isMobile ?
    <aside
      className={`fixed ${
        darkMode ? "bg-[#12101D]" : "bg-[#fff]"
      } left-0 top-[85%] h-[80px] z-[1000] aside-shadow w-full`}
    >
      <div
        className={`flex flex-row h-full pt-5 px-5 gap-7 pb-3 items-center justify-center w-full transition-all ease-linear relative`}>
          {showSublist &&  (
            <div className="absolute left-[-12px] top-[-366px] pl-3">
              <ul className=" bg-white dark:bg-[#12101D] aside-shadow max-w-[300px] min-w-[300px] p-4 rounded-lg gap-2 flex flex-col">
                <NavItem
                  href="/dashboard/administradores"
                  title="Ir para a página de administradores"
                  handleMouseLeave={handleMouseLeave}>
                  <div className="w-[25px] flex justify-center">
                    <IconAdd size={25} color="#666666"></IconAdd>
                  </div>
                  <p
                    className={`
                      text-[#666666] normal transition-all duration-200 ease-in-out
                      whitespace-nowrap
                    `}>
                    Administrador
                  </p>
                </NavItem>
              
                <NavItem
                  href="/dashboard/imoveis"
                  handleMouseLeave={handleMouseLeave}
                  title="Ir para a página de imoveis">
                  <div className="w-[25px] flex justify-center">
                    <IconAdd size={25} color="#666666"></IconAdd>
                  </div>
                  <p
                    className={`
                      text-[#666666] normal transition-all duration-200 ease-in-out
                      whitespace-nowrap
                    `}>
                    Imóvel
                  </p>
                </NavItem>

                <NavItem
                  href="/dashboard/imobiliarias"
                  title="Ir para a página de imobiliarias"
                  handleMouseLeave={handleMouseLeave}>
                  <div className="w-[25px] flex justify-center">
                    <IconAdd size={25} color="#666666"></IconAdd>
                  </div>
                  <p
                    className={`
                      text-[#666666] normal transition-all duration-200 ease-in-out
                      whitespace-nowrap
                    `}>
                    Imobiliária
                  </p>
                </NavItem>


                <NavItem
                  href="/dashboard/inquilinos"
                  title="Ir para a página de inquilinos"
                  handleMouseLeave={handleMouseLeave}>
                  <div className="w-[25px] flex justify-center">
                    <IconAdd size={25} color="#666666"></IconAdd>
                  </div>
                  <p
                    className={`
                      text-[#666666] normal transition-all duration-200 ease-in-out
                      whitespace-nowrap
                    `}>
                    Inquilinos
                  </p>
                </NavItem>

                <NavItem
                  href="/dashboard/proprietarios"
                  title="Ir para a página de proprietários"
                  handleMouseLeave={handleMouseLeave}>
                  <div className="w-[25px] flex justify-center">
                    <IconAdd size={25} color="#666666"></IconAdd>
                  </div>
                  <p
                    className={`
                      text-[#666666] normal transition-all duration-200 ease-in-out
                      whitespace-nowrap
                    `}>
                    Proprietários
                  </p>
                </NavItem>

                <NavItem
                  href="/dashboard/tipo-imovel"
                  title="Ir para a página tipos de imóveis"
                  handleMouseLeave={handleMouseLeave}>
                  <div className="w-[25px] flex justify-center">
                    <IconAdd size={25} color="#666666"></IconAdd>
                  </div>
                  <p
                    className={`
                      text-[#666666] normal transition-all duration-200 ease-in-out
                      whitespace-nowrap
                    `}>
                    Tipo Imóvel
                  </p>
                </NavItem>
              </ul>
            </div>
          )}          
          <RxHamburgerMenu size={30} className="svg-darkmode" onClick={() => setShowSublist(!showSublist)} />
          <Link href="/dashboard">
            <Logo
              darkMode={darkMode}
              openAside={openAside}
            />
          </Link>
          <ButtonToggle
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          ></ButtonToggle>
      </div>
    </aside>
    :
    <aside
      className={`fixed h-full ${
        darkMode ? "bg-[#12101D]" : "bg-[#fff]"
      } left-0 top-0 z-[1000] aside-shadow`}
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
