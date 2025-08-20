import Section from "@/components/Ui/Section";
import React from "react";

export default function Layout({ children }: { children: React.ReactNode }){
    return(
        <Section title="Cadastrar Imobiliária" href="/dashboard/imobiliarias" hrefText="Voltar para dashboard">
            <div className="mt-3 bg-[#fff] dark:bg-[#12101D] p-5 rounded-xl" style={{ boxShadow: '0px 4px 8px 3px rgba(0, 0, 0, 0.15)' }}>
                {children}
            </div>
        </Section>
    )
}