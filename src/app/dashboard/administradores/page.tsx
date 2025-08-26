import { Suspense } from "react";
import { notFound } from "next/navigation";
import TableInformations from "@/components/Admin/TableInformations";
import SectionTop from "@/components/Admin/TableSectionTop";
import Section from "@/components/Ui/Section";
import SectionBottom from "@/components/Admin/TableSectionBottom";
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
  const limit = Number(params.limit ?? "10");
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
        textAdd="Adicionar novo Administrador"
        hrefAdd="/dashboard/administradores/cadastrar"
      />
      <Suspense fallback={<SkeletonTable />}>
        <TableInformations headers={['id', 'nome', 'email', 'sexo', 'data de aniversário', 'ação']}>
          {
            data.data.map((user: User) => (
              <tr
                key={user.id}
                className="bg-white hover:bg-gray-50 text-[#111111B2] text-center relative z-[0]">
                <td className="py-2 px-3">
                  {user.id}
                </td>
                <td className="py-2 px-3">
                  {user.name}
                </td>
                <td className="py-2 px-3">
                  {user.email}
                </td>
                <td className="py-2 px-3">
                  {user.gender === 'MALE'
                    ? 'Homem'
                    : user.gender === 'FEMALE'
                    ? 'Mulher'
                    : 'Outro'
                  }
                </td>
                <td className="py-2 px-3">
                  {formatDate(user.birth_date)}
                </td>
                <td className="py-2 px-3 sticky right-0 bg-white z-10">
                  <div className="min-h-[50px] flex items-center justify-center">
                    <ListActions id={user.id} name={user.name} route={"administradores"} routeApi="users" delTitle="o administrador" />
                  </div>
                </td>
              </tr>
            ))
          }
        </TableInformations>
      </Suspense>
      <SectionBottom
        count={data.count}
        currentPage={data.currentPage}
        totalPage={data.totalPages}
        limit={limit}
        search={search}
        route="/administradores"
      />
    </Section>
  );
}