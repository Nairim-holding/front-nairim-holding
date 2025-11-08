import { Suspense } from "react";
import { notFound } from "next/navigation";
import TableInformations from "@/components/Admin/TableInformations";
import SectionTop from "@/components/Admin/TableSectionTop";
import Section from "@/components/Ui/Section";
import { SkeletonTable } from "@/components/Admin/SkeletonTable";
import ListActions from "@/components/Admin/ListActions";
import Agency from "@/types/agency";
import { FieldMeta } from "@/types/fieldMeta";

interface PageProps {
  searchParams: Promise<{
    page?: string;
    limit?: string;
    search?: string;
    sort_id?: string;
    sort_legal_name?: string;
    sort_trade_name?: string;
    sort_cnpj?: string;
    sort_state_registration?: string;
    sort_municipal_registration?: string;
    sort_license_number?: string;
    sort_zip_code?: string;
    sort_state?: string;
    sort_city?: string;
    sort_district?: string;
    sort_street?: string;
    sort_contact?: string;
    sort_telephone?: string;
    sort_phone?: string;
    sort_email?: string;
  }>;
}

const agencyFields: FieldMeta[] = [
  { key: "id", label: "ID", type: "number" },
  { key: "trade_name", label: "Nome Fantasia", type: "text" },
  { key: "legal_name", label: "Razão Social", type: "text" },
  { key: "cnpj", label: "CNPJ", type: "text" },
  { key: "state_registration", label: "Inscrição Estadual", type: "number" },
  { key: "municipal_registration", label: "Inscrição Municipal", type: "number" },
  { key: "license_number", label: "Número de Licença", type: "text" },

  { key: "addresses.zip_code", label: "CEP", type: "text" },
  { key: "addresses.street", label: "Rua", type: "text" },
  { key: "addresses.number", label: "Número", type: "number" },
  { key: "addresses.district", label: "Bairro", type: "text" },
  { key: "addresses.city", label: "Cidade", type: "text" },
  { key: "addresses.state", label: "Estado", type: "text" },
  { key: "addresses.country", label: "País", type: "text" },

  { key: "contacts.contact.contact", label: "Nome do Contato", type: "text" },
  { key: "contacts.contact.telephone", label: "Telefone", type: "text" },
  { key: "contacts.contact.phone", label: "Celular", type: "text" },
  { key: "contacts.contact.email", label: "Email", type: "text" },
  { key: "contacts.contact.whatsapp", label: "WhatsApp", type: "checkbox" },

  { key: "created_at", label: "Criado em", type: "text" },
  { key: "updated_at", label: "Atualizado em", type: "text" },
];

export default async function Page({ searchParams }: PageProps) {
  const params = await searchParams;

  const page = Number(params.page ?? "1");
  const limit = Number(params.limit ?? "30");
  const search = params.search ?? "";

  const url = new URL(`${process.env.NEXT_PUBLIC_URL_API}/agency`);
  url.searchParams.set("page", page.toString());
  url.searchParams.set("limit", limit.toString());
  url.searchParams.set("search", search);

  const sortFields = [
    "sort_id",
    "sort_legal_name",
    "sort_trade_name",
    "sort_cnpj",
    "sort_state_registration",
    "sort_municipal_registration",
    "sort_license_number",
    "sort_zip_code",
    "sort_state",
    "sort_city",
    "sort_district",
    "sort_street",
    "sort_contact",
    "sort_telephone",
    "sort_phone",
    "sort_email",
  ];

  sortFields.forEach((field) => {
    const value = params[field as keyof typeof params];
    if (value) url.searchParams.set(field, value);
  });

  const res = await fetch(url.toString(), { cache: "no-store" });
  if (!res.ok) return notFound();

  const data = await res.json();

  return (
    <Section title="Imobiliárias">
      <SectionTop
        search={search}
        count={data.count}
        currentPage={data.currentPage}
        totalPage={data.totalPages}
        limit={limit}
        route="/imobiliarias"
        hrefAdd="/dashboard/imobiliarias/cadastrar/dados-imobiliaria"
        routeApi="agency"
        delTitle="a imobiliária"
        data={data}
        fields={agencyFields}
        titlePlural="imobiliarias"
      />
      <Suspense fallback={<SkeletonTable />}>
        <TableInformations
          headers={[
            {
              label: "Razão Social",
              field: "legal_name",
              sortParam: "sort_legal_name",
            },
            {
              label: "Nome Fantasia",
              field: "trade_name",
              sortParam: "sort_trade_name",
            },
            { label: "CNPJ", field: "cnpj", sortParam: "sort_cnpj" },
            {
              label: "Inscrição Estadual",
              field: "state_registration",
              sortParam: "sort_state_registration",
            },
            {
              label: "Inscrição Municipal",
              field: "municipal_registration",
              sortParam: "sort_municipal_registration",
            },
            {
              label: "CRECI",
              field: "license_number",
              sortParam: "sort_license_number",
            },
            { label: "CEP", field: "zip_code", sortParam: "sort_zip_code" },
            { label: "UF", field: "state", sortParam: "sort_state" },
            { label: "Cidade", field: "city", sortParam: "sort_city" },
            { label: "Bairro", field: "district", sortParam: "sort_district" },
            { label: "Endereço", field: "street", sortParam: "sort_street" },
            { label: "Contato", field: "contact", sortParam: "sort_contact" },
            { label: "Fone", field: "telephone", sortParam: "sort_telephone" },
            { label: "Celular", field: "phone", sortParam: "sort_phone" },
            { label: "E-mail", field: "email", sortParam: "sort_email" },
            { label: "Ação", field: "actions" },
          ]}>
          {data.data.map((agency: Agency) => (
            <tr
              key={agency.id}
              className="bg-white hover:bg-gray-50 text-[#111111B2] text-center relative z-[0]">
              <td className="py-1 px-2">
                <div className="flex items-start justify-start gap-2 whitespace-nowrap">
                    <input
                      type="checkbox"
                      className="inp-checkbox-select"
                      value={agency.id}
                      id={agency.trade_name}
                    />
                  {agency.legal_name ?? ""}
                </div>
              </td>
              <td className="py-1 px-2">
                <div className="flex items-center justify-center whitespace-nowrap">
                  {agency.trade_name ?? ""}
                </div>
              </td>
              <td className="py-1 px-2">
                <div className="flex items-center justify-center whitespace-nowrap">
                  {agency.cnpj ?? ""}
                </div>
              </td>
              <td className="py-1 px-2">
                <div className="flex items-center justify-center whitespace-nowrap">
                  {agency.state_registration ?? ""}
                </div>
              </td>
              <td className="py-1 px-2">
                <div className="flex items-center justify-center whitespace-nowrap">
                  {agency.municipal_registration ?? ""}
                </div>
              </td>
              <td className="py-1 px-2">
                <div className="flex items-center justify-center whitespace-nowrap">
                  {agency.license_number ?? ""}
                </div>
              </td>
              <td className="py-1 px-2">
                <div className="flex items-center justify-center whitespace-nowrap">
                  {agency.addresses?.[0]?.address.zip_code ?? ""}
                </div>
              </td>
              <td className="py-1 px-2">
                <div className="flex items-center justify-center whitespace-nowrap">
                  {agency.addresses?.[0]?.address.state ?? ""}
                </div>
              </td>
              <td className="py-1 px-2">
                <div className="flex items-center justify-center whitespace-nowrap">
                  {agency.addresses?.[0]?.address.city ?? ""}
                </div>
              </td>
              <td className="py-1 px-2">
                <div className="flex items-center justify-center whitespace-nowrap">
                  {agency.addresses?.[0]?.address.district ?? ""}
                </div>
              </td>
              <td className="py-1 px-2">
                <div className="flex items-center justify-center whitespace-nowrap">
                  {agency.addresses?.[0]
                    ? `${agency.addresses[0].address.street}, ${agency.addresses[0].address.number}`
                    : ""}
                </div>
              </td>
              <td className="py-1 px-2">
                <div className="flex items-center justify-center whitespace-nowrap">
                  {agency.contacts?.[0]?.contact.contact ?? ""}
                </div>
              </td>
              <td className="py-1 px-2">
                <div className="flex items-center justify-center whitespace-nowrap">
                  {agency.contacts?.[0]?.contact.telephone ?? ""}
                </div>
              </td>
              <td className="py-1 px-2">
                <div className="flex items-center justify-center whitespace-nowrap">
                  {agency.contacts?.[0]?.contact.phone ?? ""}
                </div>
              </td>
              <td className="py-1 px-2">
                <div className="flex items-center justify-center whitespace-nowrap">
                  {agency.contacts?.[0]?.contact.email ?? ""}
                </div>
              </td>
              <td className="py-1 px-2 sticky right-0 bg-white z-10">
                <ListActions
                  id={agency.id}
                  name={agency.trade_name}
                  route="imobiliarias"
                  subRoute="dados-imobiliaria"
                />
              </td>
            </tr>
          ))}
        </TableInformations>
      </Suspense>
    </Section>
  );
}
