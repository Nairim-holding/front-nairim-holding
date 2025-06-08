import Link from "next/link";

export default function Pagination() {
  return (
    <div className="mt-10 flex justify-between items-center relative flex-wrap">
      <p className="text-[16px] font-normal text-[#111111B2] absolute left-0 z-[0] laptop:relative tablet:text-center tablet:w-full">
        Exibindo 1 a 10 de 10 registros
      </p>

      <div className="flex justify-center flex-1">
        <div className="flex items-center gap-3">
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
