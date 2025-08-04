import { Suspense } from "react";
import { notFound } from "next/navigation";
import TableInformations from "@/components/Admin/TableInformations";
import SectionTop from "@/components/Admin/SectionTop";
import Section from "@/components/Admin/Section";
import SectionBottom from "@/components/Admin/SectionBottom";
import { SkeletonTable } from "@/components/Admin/SkeletonTable";

interface PageProps {
  searchParams: Promise<{
    page?: string;
    limit?: string;
    search?: string;
  }>;
}

export default async function Page({ searchParams }: PageProps) {
  const params = await searchParams;

  const page = Number(params.page ?? "1");
  const limit = Number(params.limit ?? "10");
  const search = params.search ?? "";

  const url = new URL(`${process.env.NEXT_PUBLIC_URL_API}/property`);
  url.searchParams.set("page", page.toString());
  url.searchParams.set("limit", limit.toString());
  url.searchParams.set("search", search);

  const res = await fetch(url.toString(), { cache: "no-store" });

  if (!res.ok) return notFound();

  const data = await res.json();

  return (
    <Section title="Meus Imóveis">
      <SectionTop
        search={search}
        textAdd="Adicionar novo Imóvel"
        hrefAdd="/dashboard/imoveis/cadastrar/dados-imovel"
      />
      <Suspense fallback={<SkeletonTable />}>
        <TableInformations data={data.data} />
      </Suspense>
      <SectionBottom
        count={data.count}
        currentPage={data.currentPage}
        totalPage={data.totalPages}
        limit={limit}
        search={search}
      />
    </Section>
  );
}


