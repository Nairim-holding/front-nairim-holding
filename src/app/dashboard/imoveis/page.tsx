import { Suspense } from "react";
import { notFound } from "next/navigation";
import TableInformations from "@/components/Admin/TableInformations";
import SectionTop from "@/components/Admin/TableSectionTop";
import Section from "@/components/Ui/Section";
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
  const limit = Number(params.limit ?? "30");
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
        hrefAdd="/dashboard/imoveis/cadastrar/dados-imovel"
        currentPage={data.currentPage}
        totalPage={data.totalPages}
        limit={limit}
        route="/imoveis"
        count={data.count}
        routeApi="property"
        delTitle="o imóvel"
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
              <td className="py-1 px-2">
                <div className="flex items-center justify-start gap-2 whitespace-nowrap">
                  <input type="checkbox" className="inp-checkbox-select" value={e.id} id={e.title}></input>
                  {e.id}
                </div>
              </td>
              <td className="py-1 px-2">
                <div className="flex items-center justify-center whitespace-nowrap">
                  {e.owner?.name}
                </div>
              </td>
              <td className="py-1 px-2">
                <div className="flex items-center justify-center truncate whitespace-nowrap">
                  {e.title}
                </div>
              </td>
              <td className="py-1 px-2">
                <div className="flex items-center justify-center whitespace-nowrap">
                  {e.addresses?.[0]?.address.zip_code ?? ""}
                </div>
              </td>
              <td className="py-1 px-2">
                <div className="flex items-center justify-center whitespace-nowrap">
                  {e.addresses?.[0]
                    ? `${e.addresses[0].address.street}, ${e.addresses[0].address.number}`
                    : ""}
                </div>
              </td>
              <td className="py-1 px-2">
                <div className="flex items-center justify-center whitespace-nowrap">
                  {e.addresses?.[0]?.address.district ?? ""}
                </div>
              </td>
              <td className="py-1 px-2">
                <div className="flex items-center justify-center whitespace-nowrap">
                  {e.addresses?.[0]?.address.city ?? ""}
                </div>
              </td>
              <td className="py-1 px-2">
                <div className="flex items-center justify-center whitespace-nowrap">
                  {e.addresses?.[0]?.address.state ?? ""}
                </div>
              </td>
              <td className="py-1 px-2">
                <div className="flex items-center justify-center whitespace-nowrap">
                  {e.type?.description}
                </div>
              </td>
              <td className="py-1 px-2">
                <div className="flex items-center justify-center whitespace-nowrap">
                  {e.bedrooms}
                </div>
              </td>
              <td className="py-1 px-2">
                <div className="flex items-center justify-center whitespace-nowrap">
                  {e.bathrooms}
                </div>
              </td>
              <td className="py-1 px-2">
                <div className="flex items-center justify-center whitespace-nowrap">
                  {e.half_bathrooms}
                </div>
              </td>
              <td className="py-1 px-2">
                <div className="flex items-center justify-center whitespace-nowrap">
                  {e.garage_spaces}
                </div>
              </td>
              <td className="py-1 px-2">
                <div className="flex items-center justify-center whitespace-nowrap">
                  {e.area_total}
                </div>
              </td>
              <td className="py-1 px-2">
                <div className="flex items-center justify-center whitespace-nowrap">
                  {e.area_built}
                </div>
              </td>
              <td className="py-1 px-2">
                <div className="flex items-center justify-center whitespace-nowrap">
                  {e.frontage}
                </div>
              </td>
              <td className="py-1 px-2">
                <div className="flex items-center justify-center whitespace-nowrap">
                  {e.furnished ? "Sim" : "Não"}
                </div>
              </td>
              <td className="py-1 px-2">
                <div className="flex items-center justify-center whitespace-nowrap">
                  {e.floor_number}
                </div>
              </td>
              <td className="py-1 px-2">
                <div className="flex items-center justify-center whitespace-nowrap">
                  {e.tax_registration}
                </div>
              </td>
              <td className="py-1 px-2">
                <div className="flex items-center justify-center whitespace-nowrap">
                  {e.notes}
                </div>
              </td>
              <td className="py-1 px-2 sticky right-0 bg-white z-10">
                <div className="flex items-center justify-center">
                  <ListActions id={e.id} name={e.title} route="imoveis" subRoute="dados-imovel" />
                </div>
              </td>
            </tr>
          ))}
        </TableInformations>
      </Suspense>
    </Section>
  );
}


