import { useState } from "react";
import { CiHeart } from "react-icons/ci";
import { RxDashboard } from "react-icons/rx";
import { LuUserRound } from "react-icons/lu";
import { MdOutlineHomeWork } from "react-icons/md";
import { TbDeviceAnalytics, TbMessage } from "react-icons/tb";
import { IoFileTrayFullOutline } from "react-icons/io5";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { CiSettings } from "react-icons/ci";
import Link from "next/link";
import PropsDarkMode from "@/types/propsDarkMode";
import ButtonToggle from "../ButtonToggle";

interface PropsButtonToggle extends PropsDarkMode {
  openAside: boolean;
}

export default function List({
  darkMode,
  setDarkMode,
  openAside,
}: PropsButtonToggle) {
  const [showSublist, setShowSublist] = useState(false);
  
  return (
    <ul className="flex flex-col gap-5 items-start justify-start w-full">
      <Link
        href="/dashboard"
        className={`mt-5 ${
          openAside ? "w-auto" : "w-full"
        } flex gap-3 justify-center`}>
        <RxDashboard size={25} color={`${darkMode ? "#fff" : "#000"}`} />
        {openAside && (
          <p className={`${darkMode ? "text-white" : "text-black"}`}>
            Dashboard
          </p>
        )}
      </Link>

      {/* Cadastrar com sublista */}
      <div
        onClick={() => setShowSublist(!showSublist)}
        className={`${openAside ? "w-auto" : "w-full"} cursor-pointer flex flex-col gap-2`}
      >
        <p
        className={`${
          openAside ? "w-auto" : "w-full"
        } flex justify-center gap-3 mr-10`}>
        <MdOutlineHomeWork size={25} color={`${darkMode ? "#fff" : "#000"}`} />
        {openAside && (
          <p className={`${darkMode ? "text-white" : "text-black"}`}>Cadastrar</p>
        )}
      </p>

        {/* Sublista */}
        {openAside && showSublist && (
          <ul className="flex flex-col gap-2">
            <li className="flex gap-5 flex-row ml-5 items-center">
              <MdOutlineHomeWork size={25} color={`${darkMode ? "#fff" : "#000"}`} />
              <Link href="/dashboard/signup/clientes" className="text-sm text-gray-500 hover:text-blue-500">
                <p className={`${darkMode ? "text-white" : "text-black"}`}>Usuario</p>
              </Link>
            </li>
            <li className="flex gap-5 flex-row ml-5 items-center">
              <MdOutlineHomeWork size={25} color={`${darkMode ? "#fff" : "#000"}`} />
              <Link href="/dashboard/signup/produtos" className="text-sm text-gray-500 hover:text-blue-500">
                <p className={`${darkMode ? "text-white" : "text-black"}`}>Imobiliária</p>
              </Link>
            </li>
            <li className="flex gap-5 flex-row ml-5 items-center">
              <MdOutlineHomeWork size={25} color={`${darkMode ? "#fff" : "#000"}`} />
              <Link href="/dashboard/signup/pedidos" className="text-sm text-gray-500 hover:text-blue-500">
                <p className={`${darkMode ? "text-white" : "text-black"}`}>Cadastrar</p>
              </Link>
            </li>
          </ul>
        )}
      </div>
      
      <Link
        href="#"
        className={`${
          openAside ? "w-auto" : "w-full"
        } flex justify-center gap-3`}>
        <RxDashboard size={25} color={`${darkMode ? "#fff" : "#000"}`} />
        {openAside && (
          <p className={`${darkMode ? "text-white" : "text-black"}`}>Resumo</p>
        )}
      </Link>
      <Link
        href="#"
        className={`${
          openAside ? "w-auto" : "w-full"
        } flex justify-center gap-3`}>
        <CiSettings size={30} color={`${darkMode ? "#fff" : "#000"}`} />
        {openAside && (
          <p className={`${darkMode ? "text-white" : "text-black"}`}>Setting</p>
        )}
      </Link>

      <ButtonToggle
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        openAside={openAside}></ButtonToggle>
    </ul>
  );
}
