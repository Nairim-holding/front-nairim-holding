'use client'
import Link from "next/link";
import { IoEyeOutline } from "react-icons/io5";
import { GoPencil } from "react-icons/go";
import { FaRegTrashAlt } from "react-icons/fa";
import { useState } from "react";
import Popup from "../../Popup";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useUIStore } from '@/stores/uiStore';

export default function ListActions({ id, route }: {id: number; route: string}){
    const router = useRouter();
    const [popUpDelete, setPopUpDelete] = useState<boolean>(false);

    const {
      darkMode, setDarkMode,
      successMessage, setSuccessMessage,
      errorMessage, setErrorMessage,
    } = useUIStore();

    async function del() {
      try {
        const response = await axios.delete(`${process.env.NEXT_PUBLIC_URL_API}/${route}/${id}`);
        if (response.status == 200){
          setPopUpDelete(!popUpDelete);
          router.refresh();
          setSuccessMessage({
            message: response.data.message ? response.data.message : 'Registro deletado com sucesso',
            visible: true
          });
        }
      } catch (error) {
        setPopUpDelete(!popUpDelete);
        setErrorMessage({
          message: "Erro ao deletar o imóvel.",
          visible: true
        });
      }
    }

    return(
        <>
          {
            popUpDelete && (
              <Popup
                title="Remover o imóvel “Casa Azul”"
                subtitle={
                  <>
                    Tem certeza que deseja remover o imóvel <strong>“Casa Azul”</strong>?
                  </>
                }
                visible={popUpDelete}
                setVisible={setPopUpDelete}
                onConfirm={del}
              />
            )
          }

          <div className="flex flex-1 justify-center items-center gap-3">
              <Link href={"#"}>
                <IoEyeOutline size={23} color="#111111B2" />
              </Link>
              <Link href={"#"}>
                <GoPencil size={20} color="#111111B2" />
              </Link>
              <button onClick={() => setPopUpDelete(!popUpDelete)}>
                <FaRegTrashAlt size={19} color="#111111B2" />
              </button>
          </div>
        </>
    )
}