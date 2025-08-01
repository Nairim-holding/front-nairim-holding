"use client";
import Section from "@/components/Admin/Section";
import TableInformations from "@/components/Admin/TableInformations";
import SectionTop from "@/components/Admin/SectionTop";
import axios from "axios";
import { use, useEffect, useState } from "react";
import SectionBottom from "@/components/Admin/SectionBottom";
import { SkeletonTable } from "@/components/Admin/SkeletonTable";

export default function Page() {
  const [limit, setLimit] = useState<number>(10);
  const [response, setResponse] = useState<any>();
  const [search, setSearch] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  
  useEffect(() => {
    setPage(1);
  }, [search]);

  useEffect(() => {
    async function getProperty() {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_URL_API}/property?limit=${limit}&search=${search}&page=${page}`
        );
        setResponse(response);
      } catch (error) {
        console.error("Erro ao buscar imóveis", error);
      } finally {
        setIsLoading(false);
      }
    }

    getProperty();
  }, [limit, search, page]);

  return (
    <Section title="Meus Imóveis">
      <SectionTop
        search={search}
        setSearch={setSearch}
        textAdd="Adicionar novo Imóvel"
        hrefAdd="/dashboard/imoveis/cadastrar/dados-imovel"></SectionTop>

      {isLoading ? (
        <SkeletonTable rows={8} columns={10} />
      ) : (
        <TableInformations data={response?.data?.data ?? []} />
      )}

      <SectionBottom
        limit={limit}
        setLimit={setLimit}
        count={response?.data?.count}
        setPage={setPage}
        currentPage={response?.data?.currentPage}
        totalPage={response?.data?.totalPages}
        ></SectionBottom>
    </Section>
  );
}
