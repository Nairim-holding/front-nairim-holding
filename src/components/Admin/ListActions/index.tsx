"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useUIStore } from '@/stores/uiStore';
import { ListActionsProps } from "./type";
import IconEye from "@/components/Icons/IconEye";
import IconPencil from "@/components/Icons/IconPencil";
import IconTrash from "@/components/Icons/IconTrash";

export default function ListActions({ id, name, route, subRoute, routeApi }: ListActionsProps){
    const router = useRouter();
    const [visible, setVisible] = useState<boolean>(false);
    const {
      successMessage, setSuccessMessage,
      errorMessage, setErrorMessage,
      popUpDelete, setPopUpDelete
    } = useUIStore();


    async function del() {
      try {
        const response = await axios.delete(`${process.env.NEXT_PUBLIC_URL_API}/${routeApi}/${id}`);
        if (response.status == 200){
          setVisible(!visible); 
          setSuccessMessage({
            message: response.data.message ? response.data.message : `Registro "${name}" deletado com sucesso`,
            visible: true
          });
          router.refresh();
        }
      } catch (error) {
        setVisible(!visible);
        setErrorMessage({
          message: `Erro ao deletar ${name}.`,
          visible: true
        });
      }
    }

    useEffect(() => {
      setPopUpDelete({
        visible: visible,
        onConfirm: async() => del(),
        title: `Remover o imóvel “${name}”`,
        subtitle: <>Tem certeza que deseja remover o imóvel <strong>“{name}”</strong>?</>,
        setVisible: setVisible
      })
    }, [visible])
    return(
        <>
          <div className="flex flex-1 justify-center items-center gap-3">
              <Link href={`${route}/visualizar/${id}${subRoute ? `/${subRoute}` : ''}`}>
                <IconEye size={23} color="#111111B2"></IconEye>
              </Link>
              <Link href={`${route}/editar/${id}${subRoute ? `/${subRoute}` : ''}`}>
                <IconPencil size={20} color="#111111B2"></IconPencil>
              </Link>
              <button onClick={() => setVisible(!visible)}>
                <IconTrash size={20} color="#111111B2"></IconTrash>
              </button>
          </div>
        </>
    )
}