"use client"
import Link from "next/link";
import { NavigationButtonsProps } from "./type";

export default function NavigationButtons({ nextUrl, submitButton, textSubmitButton, svg, loading, textLoading }: NavigationButtonsProps){
    return(
        <div className="flex items-center gap-5 mt-8 border-t-2 pt-6 border-[#11111180] w-full justify-end">
            {nextUrl && <Link href={nextUrl} className="flex justify-center items-center max-w-[250px] w-full h-[50px] bg-gradient-to-r from-[#8B5CF6] to-[#6D28D9] rounded-lg text-[16px] font-medium text-[#fff] border border-[#8B5CF6] drop-shadow-purple-soft">Próximo</Link>}
            {submitButton && <button disabled={loading} type="submit" className={`flex justify-center gap-3 items-center max-w-[250px] w-full h-[50px] bg-gradient-to-r from-[#8B5CF6] to-[#6D28D9] rounded-lg text-[16px] font-medium text-[#fff] border border-[#8B5CF6] drop-shadow-purple-soft ${loading && 'cursor-not-allowed'}`}>{svg}<p>{loading ? textLoading : textSubmitButton}</p></button>}
        </div>
    )
}