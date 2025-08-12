"use client";
import Link from "next/link";
import { IoEyeOutline } from "react-icons/io5";
import { GoPencil } from "react-icons/go";
import { FaRegTrashAlt } from "react-icons/fa";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useUIStore } from '@/stores/uiStore';
import { ListActionsProps } from "./type";
import IconEye from "@/components/Icons/IconEye";
import IconPencil from "@/components/Icons/IconPencil";
import IconTrash from "@/components/Icons/IconTrash";

export default function ListActions({ id, name, route }: ListActionsProps){
    const router = useRouter();
    const [visible, setVisible] = useState<boolean>(false);
    const {
      successMessage, setSuccessMessage,
      errorMessage, setErrorMessage,
      popUpDelete, setPopUpDelete
    } = useUIStore();


    async function del() {
      try {
        const response = await axios.delete(`${process.env.NEXT_PUBLIC_URL_API}/${route}/${id}`);
        if (response.status == 200){
          setVisible(!visible); 
          setSuccessMessage({
            message: response.data.message ? response.data.message : 'Registro deletado com sucesso',
            visible: true
          });
          router.refresh();
        }
      } catch (error) {
        setVisible(!visible);
        setErrorMessage({
          message: "Erro ao deletar o imóvel.",
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
              <Link href={`imoveis/visualizar/${id}/dados-imovel`}>
                <IconEye size={23} color="#111111B2"></IconEye>
              </Link>
              <Link href={`imoveis/editar/${id}/dados-imovel`}>
                <IconPencil size={20} color="#111111B2"></IconPencil>
              </Link>
              <button onClick={() => setVisible(!visible)}>
                <IconTrash size={20} color="#111111B2"></IconTrash>
              </button>
          </div>
        </>
    )
}