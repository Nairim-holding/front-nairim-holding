import DashboardLayout from "@/layout/dashboardLayout";
import MetricResponse from "@/types/dashboard";
interface PageProps {
  searchParams: Promise<{
    startDate?: string;
    endDate?: string;
  }>;
}

export const revalidate = 60; 

export default async function Page({ searchParams }: PageProps){
  const params = await searchParams;

  const today = new Date();
  const thirtyDaysAgo = new Date(today);
  thirtyDaysAgo.setDate(today.getDate() - 30);

  const formatDate = (date: Date) => date.toISOString().split("T")[0];

  const startDate = params.startDate ?? formatDate(thirtyDaysAgo);
  const endDate = params.endDate ?? formatDate(today);

  const baseUrl = process.env.NEXT_PUBLIC_URL_API;
  if (!baseUrl) {
    throw new Error("NEXT_PUBLIC_URL_API não está configurada");
  }

  const res = await fetch(
    `${baseUrl}/dashboard?startDate=${encodeURIComponent(startDate)}&endDate=${encodeURIComponent(endDate)}`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    console.error("Erro ao buscar /dashboard:", res.status, text);
    return <div>Erro ao carregar dashboard (ver console).</div>;
  }

  const data: MetricResponse = await res.json();
  const summary = {
    averageRentalTicket: data.averageRentalTicket ?? { result: 0, variation: 0, isPositive: false },
    totalRentalActive: data.totalRentalActive ?? { result: 0, variation: 0, isPositive: false },
    totalPropertyTaxAndCondoFee: data.totalPropertyTaxAndCondoFee ?? { result: 0, variation: 0, isPositive: false },
    totalAcquisitionValue: data.totalAcquisitionValue ?? { result: 0, variation: 0, isPositive: false },
    financialVacancyRate: data.financialVacancyRate ?? { result: 0 },
    vacancyInMonths: data.vacancyInMonths ?? { result: 0, variation: 0, isPositive: false },

    totalPropertys: data.totalPropertys ?? { result: 0, variation: 0, isPositive: false },
    countPropertiesWithLessThan3Docs: data.countPropertiesWithLessThan3Docs ?? { result: 0, variation: 0, isPositive: false },
    totalPropertiesWithSaleValue: data.totalPropertiesWithSaleValue ?? { result: 0, variation: 0, isPositive: false },
    availablePropertiesByType: data.availablePropertiesByType ?? [],
    availablePropertiesByTypeLabels: data.availablePropertiesByTypeLabels ?? [],

    ownersTotal: data.ownersTotal ?? { result: 0, variation: 0, isPositive: false },
    tenantsTotal: data.tenantsTotal ?? { result: 0, variation: 0, isPositive: false },
    propertiesPerOwner: data.propertiesPerOwner ?? { result: 0, variation: 0, isPositive: false },
    agenciesTotal: data.agenciesTotal ?? { result: 0, variation: 0, isPositive: false },
    propertiesByAgency: data.propertiesByAgency ?? [],

    geolocationData: (data.geolocationData ?? []).map((g) => ({
      lat: Number(g.lat ?? 0),
      lng: Number(g.lng ?? 0),
      info: String(g.info ?? ""),
    })),
  };

  return <DashboardLayout metrics={summary} />;
}
