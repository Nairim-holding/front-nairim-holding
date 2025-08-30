"use client";
import Link from "next/link";
import { ListActionsProps } from "./type";
import IconPencil from "@/components/Icons/IconPencil";

export default function ListActions({ id, name, route, subRoute}: ListActionsProps){
    return(
        <>
          <div className="flex items-center justify-center w-[20px]">
            <Link href={`${route}/editar/${id}${subRoute ? `/${subRoute}` : ''}`} title={`Editar o item ${name}`}>
              <IconPencil size={20} color="#111111B2"></IconPencil>
            </Link>
          </div>
        </>
    )
}