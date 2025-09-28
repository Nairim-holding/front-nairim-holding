import { Suspense } from "react";
import { notFound } from "next/navigation";
import TableInformations from "@/components/Admin/TableInformations";
import SectionTop from "@/components/Admin/TableSectionTop";
import Section from "@/components/Ui/Section";
import { SkeletonTable } from "@/components/Admin/SkeletonTable";
import ListActions from "@/components/Admin/ListActions";
import { Lease } from "@/types/lease";
import formatDate from "@/utils/formatDate";

interface PageProps {
  searchParams: Promise<{
    page?: string;
    limit?: string;
    search?: string;
    sort_id?: string;
    sort_property?: string;
    sort_type?: string;
    sort_owner?: string;
    sort_tenant?: string;
    sort_start_date?: string;
    sort_end_date?: string;
    sort_status?: string;
    sort_rent_amount?: string;
    sort_condominium_fee?: string;
    sort_iptu?: string;
    sort_extra_fees?: string;
    sort_commission_percent?: string;
    sort_commission_value?: string;
    sort_due_rent?: string;
    sort_due_iptu?: string;
    sort_due_condominium?: string;
  }>;
}

export default async function Page({ searchParams }: PageProps) {
  const params = await searchParams;

  const page = Number(params.page ?? "1");
  const limit = Number(params.limit ?? "30");
  const search = params.search ?? "";

  const sortParams: Record<string, string> = {
    sort_id: params.sort_id ?? "",
    sort_property: params.sort_property ?? "",
    sort_type: params.sort_type ?? "",
    sort_owner: params.sort_owner ?? "",
    sort_tenant: params.sort_tenant ?? "",
    sort_start_date: params.sort_start_date ?? "",
    sort_end_date: params.sort_end_date ?? "",
    sort_status: params.sort_status ?? "",
    sort_rent_amount: params.sort_rent_amount ?? "",
    sort_condominium_fee: params.sort_condominium_fee ?? "",
    sort_iptu: params.sort_iptu ?? "",
    sort_extra_fees: params.sort_extra_fees ?? "",
    sort_commission_percent: params.sort_commission_percent ?? "",
    sort_commission_value: params.sort_commission_value ?? "",
    sort_due_rent: params.sort_due_rent ?? "",
    sort_due_iptu: params.sort_due_iptu ?? "",
    sort_due_condominium: params.sort_due_condominium ?? "",
  };

  const url = new URL(`${process.env.NEXT_PUBLIC_URL_API}/leases`);
  url.searchParams.set("page", page.toString());
  url.searchParams.set("limit", limit.toString());
  url.searchParams.set("search", search);

  Object.entries(sortParams).forEach(([key, value]) => {
    if (value) url.searchParams.set(key, value);
  });

  const res = await fetch(url.toString(), { cache: "no-store" });

  if (!res.ok) return notFound();

  const data = await res.json();

  return (
    <Section title="Locações">
      <SectionTop
        search={search}
        count={data.count}
        currentPage={data.currentPage}
        totalPage={data.totalPages}
        limit={limit}
        route="/locacoes"
        hrefAdd="/dashboard/locacoes/cadastrar"
        routeApi="lease"
        delTitle="a locação"
      />
      <Suspense fallback={<SkeletonTable />}>
        <TableInformations
          headers={[
            { label: "ID", field: "id", sortParam: "sort_id" },
            {
              label: "ID Imóvel",
              field: "property_id",
              sortParam: "sort_property",
            },
            { label: "Tipo Imóvel", field: "type", sortParam: "sort_type" },
            { label: "Situação", field: "status", sortParam: "sort_status" },
            { label: "Proprietário", field: "owner", sortParam: "sort_owner" },
            { label: "Inquilino", field: "tenant", sortParam: "sort_tenant" },
            {
              label: "Data Início",
              field: "start_date",
              sortParam: "sort_start_date",
            },
            {
              label: "Data Final",
              field: "end_date",
              sortParam: "sort_end_date",
            },
            {
              label: "Valor Aluguel",
              field: "rent_amount",
              sortParam: "sort_rent_amount",
            },
            {
              label: "Condomínio",
              field: "condo_fee",
              sortParam: "sort_condominium_fee",
            },
            { label: "IPTU", field: "property_tax", sortParam: "sort_iptu" },
            {
              label: "Taxas Extras",
              field: "extra_charges",
              sortParam: "sort_extra_fees",
            },
            {
              label: "Comissão (%)",
              field: "agency_commission",
              sortParam: "sort_commission_percent",
            },
            {
              label: "Valor Comissão",
              field: "commission_amount",
              sortParam: "sort_commission_value",
            },
            {
              label: "Vencimento Aluguel",
              field: "rent_due_date",
              sortParam: "sort_due_rent",
            },
            {
              label: "Vencimento IPTU",
              field: "tax_due_date",
              sortParam: "sort_due_iptu",
            },
            {
              label: "Vencimento Condomínio",
              field: "condo_due_date",
              sortParam: "sort_due_condominium",
            },
            { label: "Ação", field: "actions" },
          ]}
        >
          {data.data.map((e: Lease) => (
            <tr
              key={e.id}
              className="bg-white hover:bg-gray-50 text-[#111111B2] text-center relative z-[0]"
            >
              <td className="py-1 px-2">
                <div className="flex items-center justify-start gap-2 whitespace-nowrap">
                  <input
                    type="checkbox"
                    className="inp-checkbox-select"
                    value={e.id}
                    id={e.id.toString()}
                  />
                  {e.id ?? ""}
                </div></td>
              <td className="py-1 px-2">{e.property?.id}</td>
              <td className="py-1 px-2">{e.property?.type?.description}</td>
              <td className="py-1 px-2">
                {e.status === "EXPIRED"
                  ? "CONTRATO VENCIDO"
                  : e.status === "EXPIRING"
                  ? "CONTRATO VENCENDO"
                  : e.status === "UP_TO_DATE"
                  ? "CONTRATO EM DIA"
                  : e.status}
              </td>
              <td className="py-1 px-2">{e.property?.owner?.name}</td>
              <td className="py-1 px-2">{e.tenant?.name}</td>
              <td className="py-1 px-2">{formatDate(e.start_date)}</td>
              <td className="py-1 px-2">{formatDate(e.end_date)}</td>
              <td className="py-1 px-2">{e.rent_amount}</td>
              <td className="py-1 px-2">{e.condo_fee}</td>
              <td className="py-1 px-2">{e.property_tax}</td>
              <td className="py-1 px-2">{e.extra_charges}</td>
              <td className="py-1 px-2">{e.agency_commission}%</td>
              <td className="py-1 px-2">{e.commission_amount}</td>
              <td className="py-1 px-2">{formatDate(e.rent_due_date)}</td>
              <td className="py-1 px-2">{formatDate(e.tax_due_date)}</td>
              <td className="py-1 px-2">{formatDate(e.condo_due_date)}</td>
              <td className="py-1 px-2 sticky right-0 bg-white z-10">
                <ListActions
                  id={e.id}
                  name={`Locação ${e.id}`}
                  route="locacoes"
                  subRoute=""
                />
              </td>
            </tr>
          ))}
        </TableInformations>
      </Suspense>
    </Section>
  );
}
