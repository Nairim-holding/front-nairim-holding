import { CiHeart } from "react-icons/ci";
import { RxDashboard } from "react-icons/rx";
import { LuUserRound } from "react-icons/lu";
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
      <Link
        href="/dashboard/signup"
        className={`${
          openAside ? "w-auto" : "w-full"
        } flex justify-center gap-3`}>
        <LuUserRound size={25} color={`${darkMode ? "#fff" : "#000"}`} />
        {openAside && (
          <p className={`${darkMode ? "text-white" : "text-black"}`}>User</p>
        )}
      </Link>
      <Link
        href="#"
        className={`${
          openAside ? "w-auto" : "w-full"
        } flex justify-center gap-3`}>
        <TbMessage size={25} color={`${darkMode ? "#fff" : "#000"}`} />
        {openAside && (
          <p className={`${darkMode ? "text-white" : "text-black"}`}>Message</p>
        )}
      </Link>
      <Link
        href="#"
        className={`${
          openAside ? "w-auto" : "w-full"
        } flex justify-center gap-3`}>
        <TbDeviceAnalytics size={25} color={`${darkMode ? "#fff" : "#000"}`} />
        {openAside && (
          <p className={`${darkMode ? "text-white" : "text-black"}`}>
            Analytics
          </p>
        )}
      </Link>
      <Link
        href="#"
        className={`${
          openAside ? "w-auto" : "w-full"
        } flex justify-center gap-3`}>
        <IoFileTrayFullOutline
          size={25}
          color={`${darkMode ? "#fff" : "#000"}`}
        />
        {openAside && (
          <p className={`${darkMode ? "text-white" : "text-black"}`}>
            File Manager
          </p>
        )}
      </Link>

      <Link
        href="#"
        className={`${
          openAside ? "w-auto" : "w-full"
        } flex justify-center gap-3`}>
        <AiOutlineShoppingCart
          size={25}
          color={`${darkMode ? "#fff" : "#000"}`}
        />
        {openAside && (
          <p className={`${darkMode ? "text-white" : "text-black"}`}>Order</p>
        )}
      </Link>

      <Link
        href="#"
        className={`${
          openAside ? "w-auto" : "w-full"
        } flex justify-center gap-3`}>
        <CiHeart size={30} color={`${darkMode ? "#fff" : "#000"}`} />
        {openAside && (
          <p className={`${darkMode ? "text-white" : "text-black"}`}>Saved</p>
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
