'use client'
import Section from "@/components/Admin/Section";
import TableInformations from "@/components/Admin/TableInformations";
import SectionTop from "@/components/Admin/SectionTop";
import axios from "axios";
import { use, useEffect, useState } from "react";
import SectionBottom from "@/components/Admin/SectionBottom";

export default function Page(){
    const [limit, setLimit] = useState<number>(10);
    const [response, setResponse] = useState<any>();
    const [search, setSearch] = useState<string>('');
    useEffect(() => {
        async function getProperty(){
            const response = await axios.get(`${process.env.NEXT_PUBLIC_URL_API}/property?limit=${limit}&search=${search}`);
            setResponse(response)
        }

        getProperty();
    }, [limit, search])

    return(
        <Section title="Meus Imóveis">
            <SectionTop search={search} setSearch={setSearch} textAdd="Adicionar novo Imóvel" hrefAdd="/dashboard/imoveis/cadastrar/dados-imovel"></SectionTop>

            <TableInformations data={response?.data?.data ?? []}></TableInformations>

            <SectionBottom limit={limit} setLimit={setLimit} count={response?.data?.count}></SectionBottom>
        </Section>
    )
} 