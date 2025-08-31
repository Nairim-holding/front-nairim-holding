import { Suspense } from "react";
import { notFound } from "next/navigation";
import TableInformations from "@/components/Admin/TableInformations";
import SectionTop from "@/components/Admin/TableSectionTop";
import Section from "@/components/Ui/Section";
import { SkeletonTable } from "@/components/Admin/SkeletonTable";
import ListActions from "@/components/Admin/ListActions";
import Owner from "@/types/owner";
import formatDate from "@/utils/formatDate";

interface PageProps {
  searchParams: Promise<{
    page?: string;
    limit?: string;
    search?: string;
    sort_id?: string;
    sort_name?: string;
    sort_internal_code?: string;
    sort_occupation?: string;
    sort_marital_status?: string;
    sort_cnpj?: string;
    sort_cpf?: string;
    sort_state_registration?: string;
    sort_municipal_registration?: string;
  }>;
}

export default async function Page({ searchParams }: PageProps) {
  const params = await searchParams;

  const page = Number(params.page ?? "1");
  const limit = Number(params.limit ?? "30");
  const search = params.search ?? "";

  const url = new URL(`${process.env.NEXT_PUBLIC_URL_API}/owner`);
  url.searchParams.set("page", page.toString());
  url.searchParams.set("limit", limit.toString());
  url.searchParams.set("search", search);

  const sortParams = [
    "sort_id",
    "sort_name",
    "sort_internal_code",
    "sort_occupation",
    "sort_marital_status",
    "sort_cnpj",
    "sort_cpf",
    "sort_state_registration",
    "sort_municipal_registration",
  ] as const;

  sortParams.forEach((key) => {
    if (params[key]) url.searchParams.set(key, params[key]!);
  });

  const res = await fetch(url.toString(), { cache: "no-store" });
  if (!res.ok) return notFound();

  const data = await res.json();

  return (
    <Section title="Proprietários">
      <SectionTop
        search={search}
        count={data.count}
        currentPage={data.currentPage}
        totalPage={data.totalPages}
        limit={limit}
        route="/proprietarios"
        hrefAdd="/dashboard/proprietarios/cadastrar/dados-proprietario"
        routeApi="owner"
        delTitle="o proprietário"
      />
      <Suspense fallback={<SkeletonTable />}>
        <TableInformations
          headers={[
            { label: "ID", field: "id", sortParam: "sort_id" },
            { label: "Nome", field: "name", sortParam: "sort_name" },
            { label: "Código Interno", field: "internal_code", sortParam: "sort_internal_code" },
            { label: "Profissão", field: "occupation", sortParam: "sort_occupation" },
            { label: "Estado Civil", field: "marital_status", sortParam: "sort_marital_status" },
            { label: "CNPJ", field: "cnpj", sortParam: "sort_cnpj" },
            { label: "CPF", field: "cpf", sortParam: "sort_cpf" },
            { label: "Inscrição Estadual", field: "state_registration", sortParam: "sort_state_registration" },
            { label: "Inscrição Municipal", field: "municipal_registration", sortParam: "sort_municipal_registration" },
            { label: "CEP", field: "zip_code" },
            { label: "UF", field: "state" },
            { label: "Cidade", field: "city" },
            { label: "Bairro", field: "district" },
            { label: "Endereço", field: "address" },
            { label: "Contato", field: "contact" },
            { label: "Fone", field: "telephone" },
            { label: "Celular", field: "phone" },
            { label: "E-mail", field: "email" },
            { label: "Ação", field: "actions" },
          ]}
        >
          {data.data.map((e: Owner) => (
            <tr key={e.id} className="bg-white hover:bg-gray-50 text-[#111111B2] text-center relative z-[0]">
              <td className="py-1 px-2">
                <div className="flex items-center justify-start gap-2 whitespace-nowrap">
                  <input type="checkbox" className="inp-checkbox-select" value={e.id} id={e.name} />
                  {e.id ?? ""}
                </div>
              </td>
              <td className="py-1 px-2"><div className="flex items-center justify-center whitespace-nowrap">{e.name ?? ""}</div></td> 
              <td className="py-1 px-2 truncate"><div className="flex items-center justify-center whitespace-nowrap">{e.internal_code ?? ""}</div></td>
              <td className="py-1 px-2"><div className="flex items-center justify-center whitespace-nowrap">{e.occupation ?? ""}</div></td>
              <td className="py-1 px-2"><div className="flex items-center justify-center whitespace-nowrap">{e.marital_status ?? ""}</div></td>
              <td className="py-1 px-2"><div className="flex items-center justify-center whitespace-nowrap">{e.cnpj ?? ""}</div></td>
              <td className="py-1 px-2"><div className="flex items-center justify-center whitespace-nowrap">{e.cpf ?? ""}</div></td>
              <td className="py-1 px-2"><div className="flex items-center justify-center whitespace-nowrap">{e.state_registration ?? ""}</div></td>
              <td className="py-1 px-2"><div className="flex items-center justify-center whitespace-nowrap">{e.municipal_registration ?? ""}</div></td>
              <td className="py-1 px-2"><div className="flex items-center justify-center whitespace-nowrap">{e.addresses?.[0]?.address.zip_code ?? ""}</div></td>
              <td className="py-1 px-2"><div className="flex items-center justify-center whitespace-nowrap">{e.addresses?.[0]?.address.state ?? ""}</div></td>
              <td className="py-1 px-2"><div className="flex items-center justify-center whitespace-nowrap">{e.addresses?.[0]?.address.city ?? ""}</div></td>
              <td className="py-1 px-2"><div className="flex items-center justify-center whitespace-nowrap">{e.addresses?.[0]?.address.district ?? ""}</div></td>
              <td className="py-1 px-2">
                <div className="flex items-center justify-center whitespace-nowrap">
                {e.addresses?.[0] ? `${e.addresses[0].address.street}, ${e.addresses[0].address.number}` : ""}
                </div>
              </td>
              <td className="py-1 px-2"><div className="flex items-center justify-center whitespace-nowrap">{e.contacts?.[0]?.contact.contact ?? ""}</div></td>
              <td className="py-1 px-2"><div className="flex items-center justify-center whitespace-nowrap">{e.contacts?.[0]?.contact.telephone ?? ""}</div></td>
              <td className="py-1 px-2"><div className="flex items-center justify-center whitespace-nowrap">{e.contacts?.[0]?.contact.phone ?? ""}</div></td>
              <td className="py-1 px-2"><div className="flex items-center justify-center whitespace-nowrap">{e.contacts?.[0]?.contact.email ?? ""}</div></td>
              <td className="py-1 px-2 sticky right-0 bg-white z-10">
                <ListActions id={e.id} name={e.name} route="proprietarios" subRoute="dados-proprietario" />
              </td>
            </tr>
          ))}
        </TableInformations>
      </Suspense>
    </Section>
  );
}
