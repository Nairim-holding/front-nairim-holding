"use client";
import axios from "axios";
import Link from "next/link";
import Cookies from "js-cookie";
import { useUIStore } from "@/stores/uiStore";
import { useRouter } from "next/navigation";
import { LogoutProps } from "./type";
import IconExit from "@/components/Icons/IconExit";

export default function Logout({
  openAside,
  openAsideDelay,
}: LogoutProps) {
    const {
        successMessage, setSuccessMessage,
        errorMessage, setErrorMessage,
    } = useUIStore();
    const router = useRouter();

  async function logout() {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_URL_API}/authenticate/logout`
      );

      if (response.status == 200) {
        setSuccessMessage({
            visible: true,
            message: response.data.message ? response.data.message : 'Logout feito com sucesso!'
        });
        setTimeout(() => {
          Cookies.remove("authToken");
        setSuccessMessage({
            visible: false,
            message: ''
        });
          router.push('/');
        }, 1000);
      }
    } catch(error) {
        console.error(`Ocorreu um erro ao realizar o logout: ${error}`)
        setErrorMessage({
            visible: true,
            message: 'Ocorreu um erro ao fazer o logout, tente novamente mais tarde!'
        })
    }
  }

  return (
    <li
      onClick={() => logout()}
      className={`li-hover rounded-lg w-full hover:bg-gradient-to-r hover:from-[#8B5CF6] hover:to-[#6D28D9] hover:text-[#fff]`}>
      <Link
        href={"#"}
        title="Sair da sessão atual"
        className="flex gap-5 justify-start w-full py-3 px-3">
        <div className="w-[25px] flex justify-center">
          <IconExit color="#666" size={25}></IconExit>
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
          Sair
        </p>
      </Link>
    </li>
  );
}
