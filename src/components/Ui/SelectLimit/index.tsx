"use client";
import { useRouter } from "next/navigation";
import { SelectLimitProps } from "./type";

export default function SelectLimit({
  limit,
  search = '',
  route
}: SelectLimitProps) {
  const buildUrl = (page: number, newLimit?: number) => {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: (newLimit ?? limit).toString(),
      search,
    });
    return `/dashboard/${route}?${params.toString()}`;
  };
  const router = useRouter();
  return (
    <div className="flex justify-between items-center relative flex-wrap">
      <div className="flex items-center gap-1">
        <p className="text-[14px] font-normal text-[#111111B2]">Exibir</p>
        <select
          value={limit}
          onChange={(e) => {
            router.push(buildUrl(1, Number(e.target.value)));
          }}
          className="border text-[14px] font-normal text-[#111111B2] p-3 border-[#CCCCCC] outline-none"
        >
          {[30, 50, 100, 150].map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <p className="text-[14px] font-normal text-[#111111B2]">registros</p>
      </div>
    </div>
  );
}
