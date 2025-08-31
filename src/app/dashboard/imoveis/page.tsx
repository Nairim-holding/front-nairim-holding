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
    sort_id?: string;
    sort_owner?: string;
    sort_title?: string;
    sort_zip_code?: string;
    sort_street?: string;
    sort_district?: string;
    sort_city?: string;
    sort_state?: string;
    sort_type?: string;
    sort_bedrooms?: string;
    sort_bathrooms?: string;
    sort_half_bathrooms?: string;
    sort_garage_spaces?: string;
    sort_area_total?: string;
    sort_area_built?: string;
    sort_frontage?: string;
    sort_furnished?: string;
    sort_floor_number?: string;
    sort_tax_registration?: string;
    sort_notes?: string;
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

  const sortFields = [
    "sort_id",
    "sort_owner",
    "sort_title",
    "sort_zip_code",
    "sort_street",
    "sort_district",
    "sort_city",
    "sort_state",
    "sort_type",
    "sort_bedrooms",
    "sort_bathrooms",
    "sort_half_bathrooms",
    "sort_garage_spaces",
    "sort_area_total",
    "sort_area_built",
    "sort_frontage",
    "sort_furnished",
    "sort_floor_number",
    "sort_tax_registration",
    "sort_notes",
  ];

  sortFields.forEach((field) => {
    const value = params[field as keyof typeof params];
    if (value) url.searchParams.set(field, value);
  });

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
            { label: "ID", field: "id", sortParam: "sort_id" },
            { label: "Proprietário", field: "owner", sortParam: "sort_owner" },
            { label: "Nome", field: "title", sortParam: "sort_title" },
            { label: "CEP", field: "zip_code", sortParam: "sort_zip_code" },
            { label: "Endereço", field: "street", sortParam: "sort_street" },
            { label: "Bairro", field: "district", sortParam: "sort_district" },
            { label: "Cidade", field: "city", sortParam: "sort_city" },
            { label: "UF", field: "state", sortParam: "sort_state" },
            { label: "Tipo do imóvel", field: "type", sortParam: "sort_type" },
            { label: "Quartos", field: "bedrooms", sortParam: "sort_bedrooms" },
            {
              label: "Banheiros",
              field: "bathrooms",
              sortParam: "sort_bathrooms",
            },
            {
              label: "Lavabos",
              field: "half_bathrooms",
              sortParam: "sort_half_bathrooms",
            },
            {
              label: "Vagas na Garagem",
              field: "garage_spaces",
              sortParam: "sort_garage_spaces",
            },
            {
              label: "Área Total (m²)",
              field: "area_total",
              sortParam: "sort_area_total",
            },
            {
              label: "Área Privativa (m²)",
              field: "area_built",
              sortParam: "sort_area_built",
            },
            { label: "Fachada", field: "frontage", sortParam: "sort_frontage" },
            {
              label: "Mobiliado",
              field: "furnished",
              sortParam: "sort_furnished",
            },
            {
              label: "Número de Andar",
              field: "floor_number",
              sortParam: "sort_floor_number",
            },
            {
              label: "Inscrição fiscal",
              field: "tax_registration",
              sortParam: "sort_tax_registration",
            },
            { label: "Observações", field: "notes", sortParam: "sort_notes" },
            { label: "Ação", field: "actions" },
          ]}>
          {data.data.map((e: Property) => (
            <tr
              key={e.id}
              className="bg-white hover:bg-gray-50 text-[#111111B2] text-center relative z-[0]">
              <td className="py-1 px-2">
                <div className="flex items-center justify-start gap-2 whitespace-nowrap">
                  <input
                    type="checkbox"
                    className="inp-checkbox-select"
                    value={e.id}
                    id={e.title}
                  />
                  {e.id}
                </div>
              </td>
              <td className="py-1 px-2">
                <div className="flex items-center justify-center whitespace-nowrap">
                  {e.owner?.name}
                </div>
              </td>
              <td className="py-1 px-2 truncate">
                <div className="flex items-center justify-center whitespace-nowrap">
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
                <ListActions
                  id={e.id}
                  name={e.title}
                  route="imoveis"
                  subRoute="dados-imovel"
                />
              </td>
            </tr>
          ))}
        </TableInformations>
      </Suspense>
    </Section>
  );
}
