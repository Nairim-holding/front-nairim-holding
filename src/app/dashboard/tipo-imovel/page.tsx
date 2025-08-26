import { Suspense } from "react";
import { notFound } from "next/navigation";
import TableInformations from "@/components/Admin/TableInformations";
import SectionTop from "@/components/Admin/TableSectionTop";
import Section from "@/components/Ui/Section";
import SectionBottom from "@/components/Admin/TableSectionBottom";
import { SkeletonTable } from "@/components/Admin/SkeletonTable";
import ListActions from "@/components/Admin/ListActions";
import propertyTypes from "@/types/propertyTypes";

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

  const url = new URL(`${process.env.NEXT_PUBLIC_URL_API}/property-type`);
  url.searchParams.set("page", page.toString());
  url.searchParams.set("limit", limit.toString());
  url.searchParams.set("search", search);

  const res = await fetch(url.toString(), { cache: "no-store" });

  if (!res.ok) return notFound();

  const data = await res.json();
  return (
    <Section title="Tipo do imóvel">
      <SectionTop
        search={search}
        textAdd="Adicionar novo tipo de imóvel"
        hrefAdd="/dashboard/tipo-imovel/cadastrar"
      />
      <Suspense fallback={<SkeletonTable />}>
        <TableInformations
          headers={[
            "ID",
            "Descrição",
            "Ações"
          ]}
        >
          {data.data.map((e: propertyTypes) => (
            <tr
              key={e.id}
              className="bg-white hover:bg-gray-50 text-[#111111B2] text-center relative z-[0]">
              <td className="py-2 px-3">
                <div className="min-h-[50px] flex items-center justify-center">
                  {e.id ?? ""}
                </div>
              </td>
              <td className="py-2 px-3">
                <div className="min-h-[50px] flex items-center justify-center">
                  {e.description ?? ""}
                </div>
              </td>
              <td className="py-2 px-3 sticky right-0 bg-white z-10">
                <div className="min-h-[50px] flex items-center justify-center">
                  <ListActions id={e.id} name={e.description} route={"tipo-imovel"} routeApi="property-type" />
                </div>
              </td>
            </tr>
          ))}
        </TableInformations>
      </Suspense>
      <SectionBottom
        count={data.count}
        currentPage={data.currentPage}
        totalPage={data.totalPages}
        limit={limit}
        search={search}
        route="/tipo-imovel"
      />
    </Section>
  );
}