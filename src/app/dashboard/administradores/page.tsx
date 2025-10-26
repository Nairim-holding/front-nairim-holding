import { Suspense } from "react";
import { notFound } from "next/navigation";
import TableInformations from "@/components/Admin/TableInformations";
import SectionTop from "@/components/Admin/TableSectionTop";
import Section from "@/components/Ui/Section";
import { SkeletonTable } from "@/components/Admin/SkeletonTable";
import User from "@/types/user";
import formatDate from "@/utils/formatDate";
import ListActions from "@/components/Admin/ListActions";
import { FieldMeta } from "@/types/fieldMeta";

interface PageProps {
  searchParams: Record<string, string | string[] | undefined>;
}

export default async function Page({ searchParams }: PageProps) {
  const params = await searchParams || {};
  const page = Number(params.page ?? "1");
  const limit = Number(params.limit ?? "30");
  const search = (params.search as string) ?? "";

  const apiBase = process.env.NEXT_PUBLIC_URL_API;
  const url = new URL(`${apiBase}/users`);
  url.searchParams.set("page", String(page));
  url.searchParams.set("limit", String(limit));

  Object.entries(params).forEach(([key, value]) => {
    if (value && !["page", "limit"].includes(key)) {
      url.searchParams.set(key, String(value));
    }
  });

  const [usersRes, filtersRes] = await Promise.all([
    fetch(url.toString(), { cache: "no-store" }),
    fetch(`${apiBase}/users-field`, { cache: "no-store" }),
  ]);

  if (!usersRes.ok) notFound();

  const data = await usersRes.json();
  const filters: FieldMeta[] = filtersRes.ok ? await filtersRes.json() : [];

  console.log(filters)
  return (
    <Section title="Administradores">
      <SectionTop
        search={search}
        count={data.count}
        currentPage={data.currentPage}
        totalPage={data.totalPages}
        limit={limit}
        route="/administradores"
        hrefAdd="/dashboard/administradores/cadastrar"
        routeApi="users"
        delTitle="o administrador"
        data={data}
        fields={filters}
        titlePlural="administradores"
      />

      <Suspense fallback={<SkeletonTable />}>
        <TableInformations
          headers={[
            { label: "ID", field: "id", sortParam: "sort_id" },
            { label: "Nome", field: "name", sortParam: "sort_name" },
            { label: "E-mail", field: "email", sortParam: "sort_email" },
            { label: "Gênero", field: "gender", sortParam: "sort_gender" },
            { label: "Data de Nascimento", field: "birth_date", sortParam: "sort_birth_date" },
            { label: "Ação", field: "actions" },
          ]}
        >
          {data.data.map((user: User) => (
            <tr
              key={user.id}
              className="bg-white hover:bg-gray-50 text-[#111111B2] text-center relative z-[0]"
            >
              <td className="py-1 px-2">
                <div className="flex items-center justify-start gap-2 whitespace-nowrap">
                  <input
                    type="checkbox"
                    className="inp-checkbox-select"
                    value={user.id}
                    id={user.name}
                  />
                  {user.id}
                </div>
              </td>
              <td className="py-1 px-2">{user.name}</td>
              <td className="py-1 px-2">{user.email}</td>
              <td className="py-1 px-2">
                {user.gender === "MALE"
                  ? "Masculino"
                  : user.gender === "FEMALE"
                  ? "Feminino"
                  : "Outro"}
              </td>
              <td className="py-1 px-2">{formatDate(user.birth_date)}</td>
              <td className="py-1 px-2 sticky right-0 bg-white z-10 whitespace-nowrap">
                <ListActions id={user.id} name={user.name} route="administradores" />
              </td>
            </tr>
          ))}
        </TableInformations>
      </Suspense>
    </Section>
  );
}
