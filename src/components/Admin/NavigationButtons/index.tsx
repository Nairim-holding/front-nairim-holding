'use client'
import Link from "next/link";
import { useRouter } from "next/navigation";

interface NavigationButtonsProps{
    nextUrl: string;
}

export default function NavigationButtons({ nextUrl = '#' }: NavigationButtonsProps){
    const router = useRouter();
    return(
        <div className="flex items-center justify-between gap-5 mt-8 border-t-2 pt-6 border-[#11111180] w-full">
            <button
                onClick={() => router.back()}
                className="flex justify-center items-center max-w-[200px] w-full h-[50px] bg-[#F0F0F0] rounded-lg text-[16px] font-medium text-[#666666] border border-[#E0E0E0] drop-shadow-custom-black"
            >
            Anterior
            </button>

            <Link href={nextUrl} className="flex justify-center items-center max-w-[200px] w-full h-[50px] bg-gradient-to-r from-[#8B5CF6] to-[#6D28D9] rounded-lg text-[16px] font-medium text-[#fff] border border-[#8B5CF6] drop-shadow-purple-soft">Próximo</Link>
        </div>
    )
}