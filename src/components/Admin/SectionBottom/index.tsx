import Link from "next/link";
import { Dispatch, SetStateAction } from "react";

interface SectionBottomProps {
  count: number;
  limit: number;
  setLimit: Dispatch<SetStateAction<number>>;
}

export default function SectionBottom({ count, limit, setLimit }: SectionBottomProps) {
  return (
    <div className="mt-10 flex justify-between items-center relative flex-wrap">
      <p className="text-[16px] font-normal text-[#111111B2] laptop:relative tablet:text-center tablet:w-full">
        Exibindo 1 a {limit} de {count} registros
      </p>

      <div className="flex items-center gap-2">
        <p className="text-[14px] font-normal text-[#111111B2]">Exibir</p>
        <select
          value={limit}
          onChange={(e) => setLimit(Number(e.target.value))}
          className="border text-[14px] font-normal text-[#111111B2] p-3 rounded-lg border-[#CCCCCC] outline-none"
        >
          {[10, 20, 30, 40, 50].map((option) => (
            <option key={option} value={option} className="border text-[14px] font-normal text-[#111111B2]">
              {option}
            </option>
          ))}
        </select>
        <p className="text-[14px] font-normal text-[#111111B2]">registros</p>
      </div>

      <div className="flex justify-center">
        <div className="flex items-center gap-3">
          <Link
            href="#"
            className="w-[40px] h-[40px] flex items-center justify-center border border-2 border-[#111111B2] rounded-full">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M3.825 9L9.425 14.6L8 16L0 8L8 0L9.425 1.4L3.825 7H16V9H3.825Z"
                fill="#111111"
                fillOpacity="0.7"
              />
            </svg>
          </Link>

          <Link
            href="#"
            className="bg-[#695CFF] text-[18px] font-bold text-[#ffff] w-[45px] h-[45px] flex items-center justify-center rounded-full">
            1
          </Link>
          <Link
            href="#"
            className="bg-[#fff] text-[18px] font-bold text-[#111111B2] w-[45px] h-[45px] flex items-center justify-center border border-2 border-[#111111B2] rounded-full">
            2
          </Link>

          <Link
            href="#"
            className="w-[45px] h-[45px] flex items-center justify-center border border-2 border-[#111111B2] rounded-full">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M12.175 9L6.575 14.6L8 16L16 8L8 0L6.575 1.4L12.175 7H0V9H12.175Z"
                fill="#111111"
                fillOpacity="0.7"
              />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
