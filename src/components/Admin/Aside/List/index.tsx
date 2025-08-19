import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import ButtonToggle from "../ButtonToggle";
import NavItem from "../NavItem";
import { usePathname } from "next/navigation";
import Logout from "../Logout";
import { PropsButtonToggle } from "./type";
import IconDashboard from "@/components/Icons/IconDashboard";
import IconGear from "@/components/Icons/IconGear";
import IconRegister from "@/components/Icons/IconRegister";
import IconAdd from "@/components/Icons/IconAdd";

export default function List({
  darkMode,
  setDarkMode,
  openAside,
  handleMouseLeave
}: PropsButtonToggle) {
  const [showSublist, setShowSublist] = useState(false);
  const [openAsideDelay, setOpenAsideDelay] = useState(openAside);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setOpenAsideDelay(openAside);
    }, 100);

    return () => clearTimeout(timeout);
  }, [openAside]);

  useEffect(() => {
    if (!openAside) setShowSublist(false);
  }, [openAside]);

  const sublistRef = useRef<HTMLAnchorElement>(null);
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        sublistRef.current &&
        !sublistRef.current.contains(event.target as Node)
      ) {
        setShowSublist(false);
      }
    }

    if (showSublist) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [showSublist]);

  function openMenu() {
    setShowSublist((prev) => !prev);
  }

  const pathname = usePathname();

  const submenuPaths = [
    "/dashboard/imoveis",
    "/dashboard/imobiliarias",
    "/dashboard/administradores",
  ];
  const [activeCadastro, setActiveCadastro] = useState(false);
  useEffect(() => {
    const isSubmenuPath = submenuPaths.some((path) =>
      pathname.startsWith(path)
    );
    setActiveCadastro(isSubmenuPath);
  }, [pathname]);

  return (
    <nav className="w-full h-full flex flex-col justify-between">
      <ul className={`flex flex-col gap-3 items-start w-full overflow-hidden`}>
        <NavItem
          href="/dashboard"
          title="Ir para a página inicial da dashboard">
          <div className="w-[25px] flex justify-center">
            <IconDashboard size={25} color="#111111B2"></IconDashboard>
          </div>
          <p
            className={`
                  text-[#666666] normal transition-all duration-200 ease-in-out
                  ${
                    openAside
                      ? "opacity-100 translate-x-0"
                      : "opacity-0 -translate-x-2"
                  }
                  ${openAsideDelay ? "visible" : "invisible"}
                  whitespace-nowrap
                `}>
            Resumo
          </p>
        </NavItem>

        <li
          className={`li-hover rounded-lg w-full bg-gradient-to-r hover:from-[#8B5CF6] hover:to-[#6D28D9] hover:text-[#fff] ${
            showSublist &&
            openAside &&
            "li-active from-[#8B5CF6] to-[#6D28D9] text-[#fff]"
          } ${
            activeCadastro &&
            "li-active from-[#8B5CF6] to-[#6D28D9] text-[#fff]"
          }`}>
          <Link
            href={"#"}
            onClick={() => openMenu()}
            title="Abrir o menu de cadastro"
            className="flex gap-5 justify-start w-full py-3 px-3"
            ref={sublistRef}>
            <div className="w-[25px] flex justify-center">
              <IconRegister size={25} color="#666666"></IconRegister>
            </div>
            <p
              className={`
                text-[#666666] normal transition-all duration-200 ease-in-out
                ${
                  openAside
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 -translate-x-2"
                }
                ${openAsideDelay ? "visible" : "invisible"}
                whitespace-nowrap
              `}>
              Cadastrar
            </p>
          </Link>
        </li>

        {showSublist && openAside && (
          <div className="absolute left-[300px] top-[18%] pl-3">
            <ul className=" bg-white dark:bg-[#12101D] aside-shadow max-w-[300px] min-w-[300px] p-4 rounded-lg gap-2 flex flex-col">
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
            </ul>
          </div>
        )}

        <NavItem
          href="/dashboard/configuracoes"
          title="Ir para a página de configurações">
          <div className="w-[25px] flex justify-center">
            <IconGear size={27} color="#111111B2"></IconGear>
          </div>
          <p
            className={`
                text-[#666666] normal transition-all duration-200 ease-in-out
                ${
                  openAside
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 -translate-x-2"
                }
                ${openAsideDelay ? "visible" : "invisible"}
                whitespace-nowrap
              `}>
            Configurações
          </p>
        </NavItem>

        <Logout openAside={openAside} openAsideDelay={openAsideDelay}></Logout>
      </ul>

      <ButtonToggle
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        openAside={openAside}
        openAsideDelay={openAsideDelay}></ButtonToggle>
    </nav>
  );
}
