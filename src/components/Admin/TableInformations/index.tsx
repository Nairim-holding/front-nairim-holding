"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { TableInformationsProps } from "./type";
import IconArrowDownUp from "@/components/Icons/IconArrowDownUp";

type Order = "asc" | "desc";

export default function TableInformations({
  headers,
  children,
  emptyMessage = "Não foi encontrado nenhum registro.",
}: TableInformationsProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Estado local para refletir o sort ativo
  const [localSort, setLocalSort] = useState<Record<string, Order | undefined>>({});

  // Sincroniza estado local com os parâmetros da URL
  useEffect(() => {
    const sync: Record<string, Order | undefined> = {};
    headers.forEach((h: any) => {
      if (h?.sortParam) {
        const q = searchParams.get(h.sortParam) as Order | null;
        sync[h.sortParam] = q ?? undefined;
      }
    });
    setLocalSort(sync);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  // Selecionar / desmarcar todos os checkboxes
  function handleSelectAll(event: React.ChangeEvent<HTMLInputElement>) {
    const checked = event.target.checked;
    const checkboxes = document.querySelectorAll<HTMLInputElement>(
      'input[type="checkbox"].inp-checkbox-select'
    );
    checkboxes.forEach((checkbox) => {
      checkbox.checked = checked;
    });
  }

  // Atualiza ordenação — garante que apenas um sortParam fica ativo
  function handleSort(sortParam: string) {
    const currentOrder =
      (localSort[sortParam] ??
        (searchParams.get(sortParam) as Order | null)) || null;

    // Alterna ordem
    let nextOrder: Order = "desc";
    if (currentOrder === "desc") nextOrder = "asc";
    else if (currentOrder === "asc") nextOrder = "desc";

    setLocalSort({ [sortParam]: nextOrder }); // <-- reseta todos os outros

    // Monta nova URL
    const newParams = new URLSearchParams(searchParams.toString());

    // Remove todos os filtros antigos antes de aplicar o novo
    headers.forEach((h: any) => {
      if (h.sortParam) {
        newParams.delete(h.sortParam);
      }
    });

    // Define somente o novo filtro ativo
    newParams.set(sortParam, nextOrder);

    router.push(`?${newParams.toString()}`);
  }

  const isEmpty = !children || (Array.isArray(children) && children.length === 0);

  return isEmpty ? (
    <div className="flex justify-center items-center my-3">
      <p className="bg-[#D9D9D9] py-2 px-5 rounded-sm">
        {emptyMessage}
      </p>
    </div>
  ) : (
    <div className="overflow-x-auto rounded-md border">
      <table className="min-w-full text-sm text-left text-gray-700 lines-bg">
        <thead className="bg-[#ABABAB] uppercase text-[#111111B2] font-semibold">
          <tr>
            {headers.map((header: any, idx: number) => {
              const isSortable = header?.sortParam && header.field !== "actions";
              const displayOrder: Order | undefined =
                header?.sortParam
                  ? localSort[header.sortParam] ??
                    (searchParams.get(header.sortParam) as Order | null) ??
                    undefined
                  : undefined;

              return (
                <th
                  key={idx}
                  className={`py-1 px-1 text-center font-normal text-[14px] whitespace-nowrap
                    ${
                      header.label === "Ação"
                        ? "sticky right-0 bg-[#ABABAB] w-[20px]"
                        : "min-w-[50px] cursor-pointer select-none"
                    }
                  `}
                  onClick={
                    isSortable ? () => handleSort(header.sortParam) : undefined
                  }
                >
                  <div className="flex items-center justify-center gap-1 capitalize">
                    {header.label === "ID" && (
                      <input
                        type="checkbox"
                        className="inp-checkbox-select ml-[4px] mr-[4px]"
                        onChange={handleSelectAll}
                        onClick={(e) => e.stopPropagation()}
                      />
                    )}
                    {header.label}
                    {isSortable && (
                      <span
                        className={`transition-transform duration-200 will-change-transform
                          ${displayOrder === "desc" ? "rotate-180" : "rotate-0"}
                        `}
                      >
                        <IconArrowDownUp size={15} color="#111111B2" />
                      </span>
                    )}
                  </div>
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  );
}
