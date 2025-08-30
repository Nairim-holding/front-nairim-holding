import Link from "next/link";
import PropsPagination from "./type";

export default function Pagination({ currentPage, totalPage, route, limit=30, search=""}: PropsPagination ){
    const buildUrl = (page: number, newLimit?: number) => {
        const params = new URLSearchParams({
            page: page.toString(),
            limit: (newLimit ?? limit).toString(),
            search,
        });
        return `/dashboard/${route}?${params.toString()}`;
    };

    const pages = Array.from({ length: totalPage }, (_, i) => i + 1);
    if(pages.length <= 1)
      return;
    return(
    <div className={`flex justify-center laptop:mt-0`}>
        <div className="flex items-center gap-3">
          <Link
            href={buildUrl(currentPage - 1)}
            className={`w-[40px] h-[40px] flex items-center justify-center border border-2 rounded-full ${
              currentPage === 1 ? "opacity-30 pointer-events-none" : "border-[#111111B2]"
            } dark:border-[#fff]`}
          >
            <svg width="16" height="16" viewBox="0 0 16 16">
              <path
                d="M3.825 9L9.425 14.6L8 16L0 8L8 0L9.425 1.4L3.825 7H16V9H3.825Z"
                fill="#111111"
                className="dark:fill-[#fff]"
                fillOpacity="0.7"
              />
            </svg>
          </Link>

          {pages.map((page) => (
            <Link
              key={page}
              href={buildUrl(page)}
              className={`dark:bg-[#12101D] dark:border-[#fff] w-[45px] h-[45px] flex items-center justify-center rounded-full border font-bold text-[18px] ${
                page === currentPage
                  ? "!bg-[#695CFF] text-white"
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
            } dark:border-[#fff]`}
          >
            <svg width="16" height="16" viewBox="0 0 16 16">
              <path
                d="M12.175 9L6.575 14.6L8 16L16 8L8 0L6.575 1.4L12.175 7H0V9H12.175Z"
                fill="#111111"
                className="dark:fill-[#fff]"
                fillOpacity="0.7"
              />
            </svg>
          </Link>
        </div>
      </div>
    )
}