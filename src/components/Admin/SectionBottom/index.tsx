import { Dispatch, SetStateAction } from "react";

interface SectionBottomProps {
  count: number;
  limit: number;
  setLimit: Dispatch<SetStateAction<number>>;
  setPage: Dispatch<SetStateAction<number>>;
  currentPage: number;
  totalPage: number;
}

export default function SectionBottom({
  count,
  limit,
  setLimit,
  setPage,
  currentPage,
  totalPage,
}: SectionBottomProps) {
  // Exibir registros de X até Y
  const start = (currentPage - 1) * limit + 1;
  const end = Math.min(currentPage * limit, count);

  // Criar uma lista de páginas [1, 2, 3, ..., totalPage]
  const pages = Array.from({ length: totalPage }, (_, i) => i + 1);

  return (
    <div className="mt-10 flex justify-between items-center relative flex-wrap">
      <p className="text-[16px] font-normal text-[#111111B2] laptop:relative tablet:text-center tablet:w-full">
        Exibindo {start} a {end} de {count} registros
      </p>

      {/* Limite por página */}
      <div className="flex items-center gap-2">
        <p className="text-[14px] font-normal text-[#111111B2]">Exibir</p>
        <select
          value={limit}
          onChange={(e) => {
            setLimit(Number(e.target.value));
            setPage(1); // Voltar à página 1 ao mudar o limite
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
          <button
            disabled={currentPage === 1}
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            className={`w-[40px] h-[40px] flex items-center justify-center border border-2 rounded-full ${
              currentPage === 1 ? "opacity-30 cursor-not-allowed" : "border-[#111111B2]"
            }`}
          >
            <svg width="16" height="16" viewBox="0 0 16 16">
              <path
                d="M3.825 9L9.425 14.6L8 16L0 8L8 0L9.425 1.4L3.825 7H16V9H3.825Z"
                fill="#111111"
                fillOpacity="0.7"
              />
            </svg>
          </button>

          {pages.map((page) => (
            <button
              key={page}
              onClick={() => setPage(page)}
              className={`w-[45px] h-[45px] flex items-center justify-center rounded-full border font-bold text-[18px] ${
                page === currentPage
                  ? "bg-[#695CFF] text-white"
                  : "bg-white text-[#111111B2] border-[#111111B2]"
              }`}
            >
              {page}
            </button>
          ))}

          {/* Próxima */}
          <button
            disabled={currentPage === totalPage}
            onClick={() => setPage((prev) => Math.min(prev + 1, totalPage))}
            className={`w-[40px] h-[40px] flex items-center justify-center border border-2 rounded-full ${
              currentPage === totalPage ? "opacity-30 cursor-not-allowed" : "border-[#111111B2]"
            }`}
          >
            <svg width="16" height="16" viewBox="0 0 16 16">
              <path
                d="M12.175 9L6.575 14.6L8 16L16 8L8 0L6.575 1.4L12.175 7H0V9H12.175Z"
                fill="#111111"
                fillOpacity="0.7"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
