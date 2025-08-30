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
  }>;
}

export default async function Page({ searchParams }: PageProps) {
  const params = await searchParams;

  const page = Number(params.page ?? "1");
  const limit = Number(params.limit ?? "30");
  const search = params.search ?? "";

  const url = new URL(`${process.env.NEXT_PUBLIC_URL_API}/users`);
  url.searchParams.set("page", page.toString());
  url.searchParams.set("limit", limit.toString());
  url.searchParams.set("search", search);

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
        <TableInformations headers={['ID', 'nome', 'email', 'sexo', 'data de aniversário', 'ação']}>
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
                    ? 'Homem'
                    : user.gender === 'FEMALE'
                    ? 'Mulher'
                    : 'Outro'
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