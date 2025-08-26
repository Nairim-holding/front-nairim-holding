import { Suspense } from "react";
import { notFound } from "next/navigation";
import TableInformations from "@/components/Admin/TableInformations";
import SectionTop from "@/components/Admin/TableSectionTop";
import Section from "@/components/Ui/Section";
import SectionBottom from "@/components/Admin/TableSectionBottom";
import { SkeletonTable } from "@/components/Admin/SkeletonTable";
import ListActions from "@/components/Admin/ListActions";
import Agency from "@/types/agency";

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

  const url = new URL(`${process.env.NEXT_PUBLIC_URL_API}/agency`);
  url.searchParams.set("page", page.toString());
  url.searchParams.set("limit", limit.toString());
  url.searchParams.set("search", search);

  const res = await fetch(url.toString(), { cache: "no-store" });

  if (!res.ok) return notFound();

  const data = await res.json();

  return (
    <Section title="Imobiliárias">
      <SectionTop
        search={search}
        textAdd="Adicionar nova imobiliária"
        hrefAdd="/dashboard/imobiliarias/cadastrar/dados-imobiliaria"
      />
      <Suspense fallback={<SkeletonTable />}>
        <TableInformations
          headers={[
            "ID",
            "Razão Social",
            "Nome Fantasia",
            "CNPJ",
            "Inscrição Estadual",
            "Inscrição Municipal",
            "CRECI",
            "CEP",
            "UF",
            "Cidade",
            "Bairro",
            "Endereço",
            "Contato",
            "Fone",
            "Celular",
            "E-mail",
            "Ação",
          ]}
        >
          {data.data.map((e: Agency) => (
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
                  {e.trade_name ?? ""}
                </div>
              </td>
              <td className="py-2 px-3">
                <div className="min-h-[50px] flex items-center justify-center truncate">
                  {e.legal_name ?? ""}
                </div>
              </td>
              <td className="py-2 px-3">
                <div className="min-h-[50px] flex items-center justify-center">
                  {e.cnpj ?? ""}
                </div>
              </td>
              <td className="py-2 px-3">
                <div className="min-h-[50px] flex items-center justify-center">
                  {e.state_registration ?? ""}
                </div>
              </td>
              <td className="py-2 px-3">
                <div className="min-h-[50px] flex items-center justify-center">
                  {e.municipal_registration ?? ""}
                </div>
              </td>
              <td className="py-2 px-3">
                <div className="min-h-[50px] flex items-center justify-center">
                  {e.license_number ?? ""}
                </div>
              </td>
              <td className="py-2 px-3">
                <div className="min-h-[50px] flex items-center justify-center">
                  {e.addresses?.[0]?.address.zip_code ?? ""}
                </div>
              </td>
              <td className="py-2 px-3">
                <div className="min-h-[50px] flex items-center justify-center">
                  {e.addresses?.[0]?.address.state ?? ""}
                </div>
              </td>
              <td className="py-2 px-3">
                <div className="min-h-[50px] flex items-center justify-center">
                  {e.addresses?.[0]?.address.city ?? ""}
                </div>
              </td>
              <td className="py-2 px-3">
                <div className="min-h-[50px] flex items-center justify-center">
                  {e.addresses?.[0]?.address.district ?? ""}
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
                  {e.contacts?.[0]?.contact.contact ?? ""}
                </div>
              </td>
              <td className="py-2 px-3">
                <div className="min-h-[50px] flex items-center justify-center">
                  {e.contacts?.[0]?.contact.telephone ?? ""}
                </div>
              </td>
              <td className="py-2 px-3">
                <div className="min-h-[50px] flex items-center justify-center">
                  {e.contacts?.[0]?.contact.phone ?? ""}
                </div>
              </td>
              <td className="py-2 px-3">
                <div className="min-h-[50px] flex items-center justify-center">
                  {e.contacts?.[0]?.contact.email ?? ""}
                </div>
              </td>
              <td className="py-2 px-3 sticky right-0 bg-white z-10">
                <div className="min-h-[50px] flex items-center justify-center">
                  <ListActions id={e.id} name={e.trade_name} route="imobiliarias" subRoute="dados-imobiliaria" routeApi="agency" delTitle="a imobiliária" />
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
        route="/imobiliarias"
      />
    </Section>
  );
}


