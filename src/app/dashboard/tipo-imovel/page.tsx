import { Suspense } from "react";
import { notFound } from "next/navigation";
import TableInformations from "@/components/Admin/TableInformations";
import SectionTop from "@/components/Admin/TableSectionTop";
import Section from "@/components/Ui/Section";
import { SkeletonTable } from "@/components/Admin/SkeletonTable";
import ListActions from "@/components/Admin/ListActions";
import propertyTypes from "@/types/propertyTypes";
import { FieldMeta } from "@/types/fieldMeta";

interface PageProps {
  searchParams: Promise<{
    page?: string;
    limit?: string;
    search?: string;
    sort_id?: string;
    sort_description?: string;
  }>;
}

const typeFields: FieldMeta[] = [
  { key: "id", label: "ID", type: "number" },
  { key: "description", label: "Descrição", type: "text" },
];

export default async function Page({ searchParams }: PageProps) {
  const params = await searchParams;

  const page = Number(params.page ?? "1");
  const limit = Number(params.limit ?? "30");
  const search = params.search ?? "";
  const sort_id = params.sort_id ?? "";
  const sort_description = params.sort_description ?? "";

  const url = new URL(`${process.env.NEXT_PUBLIC_URL_API}/property-type`);
  url.searchParams.set("page", page.toString());
  url.searchParams.set("limit", limit.toString());
  url.searchParams.set("search", search);

  if (sort_id) url.searchParams.set("sort_id", sort_id);
  if (sort_description) url.searchParams.set("sort_description", sort_description);

  const res = await fetch(url.toString(), { cache: "no-store" });
  if (!res.ok) return notFound();

  const data = await res.json();
  return (
    <Section title="Tipo do imóvel">
      <SectionTop
        search={search}
        count={data.count}
        currentPage={data.currentPage}
        totalPage={data.totalPages}
        limit={limit}
        route="/tipo-imovel"
        hrefAdd="/dashboard/tipo-imovel/cadastrar"
        routeApi="property-type"
        delTitle="o tipo de imóvel"
        data={data}
        fields={typeFields}
        titlePlural="tipo do imóvel"
      />
      <Suspense fallback={<SkeletonTable />}>
        <TableInformations
          headers={[
            { label: "ID", field: "id", sortParam: "sort_id" },
            { label: "Descrição", field: "description", sortParam: "sort_description" },
            { label: "Ação", field: "actions" },
          ]}
        >
          {data.data.map((e: propertyTypes) => (
            <tr
              key={e.id}
              className="bg-white hover:bg-gray-50 text-[#111111B2] text-center relative z-[0]"
            >
              <td className="py-1 px-2 w-[5%] text-center">
                <div className="flex items-center justify-center gap-2 whitespace-nowrap">
                  <input
                    type="checkbox"
                    className="inp-checkbox-select"
                    value={e.id}
                    id={e.description}
                  />
                  {e.id ?? ""}
                </div>
              </td>

              <td className="py-1 px-2 w-[80%] max-w-[60%]">
                <div className="flex items-center justify-center whitespace-nowrap overflow-hidden">
                  {e.description ?? ""}
                </div>
              </td>

              <td className="py-1 px-2 w-[5%] sticky right-0 bg-white z-10">
                <div className="flex items-center justify-center whitespace-nowrap">
                  <ListActions
                    id={e.id}
                    name={e.description}
                    route={"tipo-imovel"}
                  />
                </div>
              </td>
            </tr>
          ))}
        </TableInformations>
      </Suspense>
    </Section>
  );
}
