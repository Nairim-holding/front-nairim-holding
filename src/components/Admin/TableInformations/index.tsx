import { TableInformationsProps } from "./type";

export default function TableInformations({
  headers,
  children,
  emptyMessage = "Não foi encontrado nenhum registro.",
}: TableInformationsProps) {
  const isEmpty = !children || (Array.isArray(children) && children.length === 0);

  return isEmpty ? (
    <div className="flex justify-center items-center my-3">
      <p className="bg-[#D9D9D9] py-2 px-5 rounded-sm dark:bg-[#000]">
        {emptyMessage}
      </p>
    </div>
  ) : (
    <div className="overflow-x-auto rounded-xl border">
      <table className="min-w-full text-sm text-left text-gray-700">
        <thead className="bg-[#ECECEC] uppercase text-[#111111B2]">
          <tr>
            {headers.map((title, idx) => (
              <th
                key={idx}
                className={`py-2 px-5 text-center font-normal text-[14px] ${
                  title === "Ação"
                    ? "sticky right-0 bg-[#ECECEC] z-10 min-w-[50px]"
                    : "min-w-[50px]"
                }`}
              >
                {title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  );
}
