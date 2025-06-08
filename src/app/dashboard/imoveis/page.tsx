import Property from "@/types/property";

import Section from "@/components/Admin/Section";
import Pagination from "@/components/Admin/Pagination";
import TableInformations from "@/components/Admin/TableInformations";
import SectionTop from "@/components/Admin/SectionTop";

export default async function Page(){
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/property`);
    const data = await response.json() as Property[];

    return(
        <Section title="Meus Imóveis">
            <SectionTop textAdd="Adicionar novo Imóvel" hrefAdd="/dashboard/imoveis/cadastrar"></SectionTop>

            <TableInformations data={data}></TableInformations>

            <Pagination></Pagination>
        </Section>
    )
} 