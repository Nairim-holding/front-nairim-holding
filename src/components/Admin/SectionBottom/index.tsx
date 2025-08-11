"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SectionBottomProps } from "./type";

export default function SectionBottom({
  count,
  limit,
  currentPage,
  totalPage,
  search = '',
}: SectionBottomProps) {
  const start = (currentPage - 1) * limit + 1;
  const end = Math.min(currentPage * limit, count);

  const buildUrl = (page: number, newLimit?: number) => {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: (newLimit ?? limit).toString(),
      search,
    });
    return `/dashboard/imoveis?${params.toString()}`;
  };

  const pages = Array.from({ length: totalPage }, (_, i) => i + 1);
  const router = useRouter();

  return (
    <div className="mt-10 flex justify-between items-center relative flex-wrap">
      <p className="text-[16px] font-normal text-[#111111B2] laptop:relative tablet:text-center tablet:w-full">
        Exibindo {start} a {end} de {count} registros
      </p>

      <div className="flex items-center gap-2">
        <p className="text-[14px] font-normal text-[#111111B2]">Exibir</p>
        <select
          value={limit}
          onChange={(e) => {
            router.push(buildUrl(1, Number(e.target.value)));
          }}
          className="border text-[14px] font-normal text-[#111111B2] p-3 rounded-lg border-[#CCCCCC] outline-none"
        >
          {[10, 20, 30, 40, 50].map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <p className="text-[14px] font-normal text-[#111111B2]">registros</p>
      </div>

      <div className="flex justify-center mt-4 laptop:mt-0">
        <div className="flex items-center gap-3">
          <Link
            href={buildUrl(currentPage - 1)}
            className={`w-[40px] h-[40px] flex items-center justify-center border border-2 rounded-full ${
              currentPage === 1 ? "opacity-30 pointer-events-none" : "border-[#111111B2]"
            }`}
          >
            <svg width="16" height="16" viewBox="0 0 16 16">
              <path
                d="M3.825 9L9.425 14.6L8 16L0 8L8 0L9.425 1.4L3.825 7H16V9H3.825Z"
                fill="#111111"
                fillOpacity="0.7"
              />
            </svg>
          </Link>

          {pages.map((page) => (
            <Link
              key={page}
              href={buildUrl(page)}
              className={`w-[45px] h-[45px] flex items-center justify-center rounded-full border font-bold text-[18px] ${
                page === currentPage
                  ? "bg-[#695CFF] text-white"
                  : "bg-white text-[#111111B2] border-[#111111B2]"
              }`}
            >
              {page}
            </Link>
          ))}

          <Link
            href={buildUrl(currentPage + 1)}
            className={`w-[40px] h-[40px] flex items-center justify-center border border-2 rounded-full ${
              currentPage === totalPage ? "opacity-30 pointer-events-none" : "border-[#111111B2]"
            }`}
          >
            <svg width="16" height="16" viewBox="0 0 16 16">
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
