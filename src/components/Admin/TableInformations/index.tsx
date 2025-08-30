'use client'
import { TableInformationsProps } from "./type";
import IconArrowDownUp from "@/components/Icons/IconArrowDownUp";

export default function TableInformations({
  headers,
  children,
  emptyMessage = "Não foi encontrado nenhum registro.",
}: TableInformationsProps) {
  function handleSelectAll(event: React.ChangeEvent<HTMLInputElement>){
    const checked = event.target.checked;

    const checkboxes = document.querySelectorAll<HTMLInputElement>(
      'input[type="checkbox"]'
    );

    checkboxes.forEach((checkbox) => {
      checkbox.checked = checked;
    });
  };

  const isEmpty = !children || (Array.isArray(children) && children.length === 0);
  return isEmpty ? (
    <div className="flex justify-center items-center my-3">
      <p className="bg-[#D9D9D9] py-2 px-5 rounded-sm dark:bg-[#000]">
        {emptyMessage}
      </p>
    </div>
  ) : (
    <div className="overflow-x-auto rounded-md border">
      <table className="min-w-full text-sm text-left text-gray-700 lines-bg">
        <thead className="bg-[#ABABAB] uppercase text-[#111111B2] font-semibold">
          <tr>
            {headers.map((title, idx) => (
              <th
                key={idx}
                className={`py-1 px-1 text-center font-normal text-[14px] whitespace-nowrap 
                  ${
                    title === "Ação"
                      ? "sticky right-0 bg-[#ABABAB] w-[20px]"
                      : "min-w-[50px]"
                  }
                `}
              >
                <div className={`flex items-center justify-center gap-1 capitalize`}>
                {title === "ID" && <input type="checkbox" className={`inp-checkbox-select ml-[4px] mr-[4px]`} onChange={handleSelectAll}></input>}
                {title}
                {title !== "Ação" && <IconArrowDownUp size={15} color="#111111B2"></IconArrowDownUp>}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  );
}
