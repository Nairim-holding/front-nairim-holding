import { Suspense } from "react";
import { notFound } from "next/navigation";
import TableInformations from "@/components/Admin/TableInformations";
import SectionTop from "@/components/Admin/TableSectionTop";
import Section from "@/components/Ui/Section";
import SectionBottom from "@/components/Admin/TableSectionBottom";
import { SkeletonTable } from "@/components/Admin/SkeletonTable";
import Property from "@/types/property";
import ListActions from "@/components/Admin/ListActions";

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
        <TableInformations
          headers={[
            "ID",
            "Proprietário",
            "Nome",
            "CEP",
            "Endereço",
            "Bairro",
            "Cidade",
            "UF",
            "Tipo do imóvel",
            "Quartos",
            "Banheiros",
            "Lavabos",
            "Vagas na Garagem",
            "Área Total (m²)",
            "Área Privativa (m²)",
            "Fachada",
            "Mobiliado",
            "Número de Andar",
            "Inscrição fiscal",
            "Observações",
            "Ação",
          ]}
        >
          {data.data.map((e: Property) => (
            <tr
              key={e.id}
              className="bg-white hover:bg-gray-50 text-[#111111B2] text-center relative z-[0]">
              <td className="py-2 px-3">
                <div className="min-h-[50px] flex items-center justify-center">
                  {e.id}
                </div>
              </td>
              <td className="py-2 px-3">
                <div className="min-h-[50px] flex items-center justify-center">
                  {e.owner?.name}
                </div>
              </td>
              <td className="py-2 px-3">
                <div className="min-h-[50px] flex items-center justify-center truncate">
                  {e.title}
                </div>
              </td>
              <td className="py-2 px-3">
                <div className="min-h-[50px] flex items-center justify-center">
                  {e.addresses?.[0]?.address.zip_code ?? ""}
                </div>
              </td>
              <td className="py-2 px-3">
                <div className="min-h-[50px] flex items-center justify-center">
                  {e.addresses?.[0]
                    ? `${e.addresses[0].address.street}, ${e.addresses[0].address.number}`
                    : ""}
                </div>
              </td>
              <td className="py-2 px-3">
                <div className="min-h-[50px] flex items-center justify-center">
                  {e.addresses?.[0]?.address.district ?? ""}
                </div>
              </td>
              <td className="py-2 px-3">
                <div className="min-h-[50px] flex items-center justify-center">
                  {e.addresses?.[0]?.address.city ?? ""}
                </div>
              </td>
              <td className="py-2 px-3">
                <div className="min-h-[50px] flex items-center justify-center">
                  {e.addresses?.[0]?.address.state ?? ""}
                </div>
              </td>
              <td className="py-2 px-3">
                <div className="min-h-[50px] flex items-center justify-center">
                  {e.type?.description}
                </div>
              </td>
              <td className="py-2 px-3">
                <div className="min-h-[50px] flex items-center justify-center">
                  {e.bedrooms}
                </div>
              </td>
              <td className="py-2 px-3">
                <div className="min-h-[50px] flex items-center justify-center">
                  {e.bathrooms}
                </div>
              </td>
              <td className="py-2 px-3">
                <div className="min-h-[50px] flex items-center justify-center">
                  {e.half_bathrooms}
                </div>
              </td>
              <td className="py-2 px-3">
                <div className="min-h-[50px] flex items-center justify-center">
                  {e.garage_spaces}
                </div>
              </td>
              <td className="py-2 px-3">
                <div className="min-h-[50px] flex items-center justify-center">
                  {e.area_total}
                </div>
              </td>
              <td className="py-2 px-3">
                <div className="min-h-[50px] flex items-center justify-center">
                  {e.area_built}
                </div>
              </td>
              <td className="py-2 px-3">
                <div className="min-h-[50px] flex items-center justify-center">
                  {e.frontage}
                </div>
              </td>
              <td className="py-2 px-3">
                <div className="min-h-[50px] flex items-center justify-center">
                  {e.furnished ? "Sim" : "Não"}
                </div>
              </td>
              <td className="py-2 px-3">
                <div className="min-h-[50px] flex items-center justify-center">
                  {e.floor_number}
                </div>
              </td>
              <td className="py-2 px-3">
                <div className="min-h-[50px] flex items-center justify-center">
                  {e.tax_registration}
                </div>
              </td>
              <td className="py-2 px-3">
                <div className="min-h-[50px] flex items-center justify-center">
                  {e.notes}
                </div>
              </td>
              <td className="py-2 px-3 sticky right-0 bg-white z-10">
                <div className="min-h-[50px] flex items-center justify-center">
                  <ListActions id={e.id} name={e.title} route={"property"} />
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
         route="/imoveis"
      />
    </Section>
  );
}


