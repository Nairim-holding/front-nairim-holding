'use client'
import Link from "next/link";
import { IoEyeOutline } from "react-icons/io5";
import { GoPencil } from "react-icons/go";
import { FaRegTrashAlt } from "react-icons/fa";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useUIStore } from '@/stores/uiStore';

export default function ListActions({ id, name, route }: {id: number; name: string; route: string}){
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
          router.refresh();
          setSuccessMessage({
            message: response.data.message ? response.data.message : 'Registro deletado com sucesso',
            visible: true
          });
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
                <IoEyeOutline size={23} color="#111111B2" />
              </Link>
              <Link href={`imoveis/editar/${id}/dados-imovel`}>
                <GoPencil size={20} color="#111111B2" />
              </Link>
              <button onClick={() => setVisible(!visible)}>
                <FaRegTrashAlt size={19} color="#111111B2" />
              </button>
          </div>
        </>
    )
}