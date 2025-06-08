import NavigationBar from "@/components/Admin/NavigationBar";
import Section from "@/components/Admin/Section";
import Link from "next/link";
import React from "react";

export default function Layout({ children }: { children: React.ReactNode }){
    return(
        <Section title="Cadastrar Imóvel">
            <div className="mt-10 bg-[#fff] p-5 rounded-xl" style={{ boxShadow: '0px 4px 8px 3px rgba(0, 0, 0, 0.15)' }}>
                <NavigationBar></NavigationBar>

                <div>
                    {children}
                </div>

                <div className="flex items-center justify-between gap-5 mt-8 border-t-2 pt-6 border-[#11111180]">
                    <Link href={'#'} className="flex justify-center items-center max-w-[200px] w-full h-[50px] bg-[#F0F0F0] rounded-lg text-[16px] font-medium text-[#666666] border border-[#E0E0E0] drop-shadow-custom-black">Anterior</Link>

                    <Link href={'#'} className="flex justify-center items-center max-w-[200px] w-full h-[50px] bg-gradient-to-r from-[#8B5CF6] to-[#6D28D9] rounded-lg text-[16px] font-medium text-[#fff] border border-[#8B5CF6] drop-shadow-purple-soft">Próximo</Link>
                </div>
            </div>

        </Section>
    )
}