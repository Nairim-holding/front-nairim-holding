import { Suspense } from "react";
import { notFound } from "next/navigation";
import TableInformations from "@/components/Admin/TableInformations";
import SectionTop from "@/components/Admin/TableSectionTop";
import Section from "@/components/Ui/Section";
import { SkeletonTable } from "@/components/Admin/SkeletonTable";
import User from "@/types/user";
import formatDate from "@/utils/formatDate";
import ListActions from "@/components/Admin/ListActions";

interface PageProps {
  searchParams: Promise<{
    page?: string;
    limit?: string;
    search?: string;
    sort_id?: string;
    sort_name?: string;
    sort_email?: string;
    sort_gender?: string;
    sort_birth_date?: string;
  }>;
}

export default async function Page({ searchParams }: PageProps) {
  const params = await searchParams;

  const page = Number(params.page ?? "1");
  const limit = Number(params.limit ?? "30");
  const search = params.search ?? "";
  const sort_id = params.sort_id ?? "";
  const sort_name = params.sort_name ?? "";
  const sort_email = params.sort_email ?? "";
  const sort_gender = params.sort_gender ?? "";
  const sort_birth_date = params.sort_birth_date ?? "";
  const url = new URL(`${process.env.NEXT_PUBLIC_URL_API}/users`);
  url.searchParams.set("page", page.toString());
  url.searchParams.set("limit", limit.toString());
  url.searchParams.set("search", search);

  if (sort_id) url.searchParams.set("sort_id", sort_id);
  if (sort_name) url.searchParams.set("sort_name", sort_name);
  if (sort_email) url.searchParams.set("sort_email", sort_email);
  if (sort_gender) url.searchParams.set("sort_gender", sort_gender);
  if (sort_birth_date) url.searchParams.set("sort_birth_date", sort_birth_date);

  const res = await fetch(url.toString(), { cache: "no-store" });

  if (!res.ok) return notFound();

  const data = await res.json();
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
      />
      <Suspense fallback={<SkeletonTable />}>
          <TableInformations
            headers={[
              { label: 'ID', field: 'id', sortParam: 'sort_id' },
              { label: 'Nome', field: 'name', sortParam: 'sort_name' },
              { label: 'Email', field: 'email', sortParam: 'sort_email' },
              { label: 'Sexo', field: 'gender', sortParam: 'sort_gender' },
              { label: 'Data de Aniversário', field: 'birth_date', sortParam: 'sort_birth_date' },
              { label: 'Ação', field: 'actions' }
            ]}
          >
          {
            data.data.map((user: User) => (
              <tr
                key={user.id}
                className="bg-white hover:bg-gray-50 text-[#111111B2] text-center relative z-[0]">
                <td className="py-1 px-2">
                  <div className="flex items-center justify-start gap-2 whitespace-nowrap">
                  <input type="checkbox" className="inp-checkbox-select" value={user.id} id={user.name}></input>
                    {user.id}
                  </div>
                </td>
                <td className="py-1 px-2">
                  <div className="flex items-center justify-center whitespace-nowrap">
                    {user.name}
                  </div>
                </td>
                <td className="py-1 px-2">
                  <div className="flex items-center justify-center whitespace-nowrap">
                    {user.email}
                  </div>
                </td>
                <td className="py-1 px-2">
                  <div className="flex items-center justify-center whitespace-nowrap">
                  {user.gender === 'MALE'
                    ? 'Masculino'
                    : 'Feminino'
                  }
                  </div>
                </td>
                <td className="py-1 px-2">
                  <div className="flex items-center justify-center whitespace-nowrap">
                    {formatDate(user.birth_date)}
                  </div>
                </td>
                <td className="py-1 px-2 sticky right-0 bg-white z-10 whitespace-nowrap">
                  <div className="flex items-center justify-center">
                    <ListActions id={user.id} name={user.name} route={"administradores"}/>
                  </div>
                </td>
              </tr>
            ))
          }
        </TableInformations>
      </Suspense>
    </Section>
  );
}