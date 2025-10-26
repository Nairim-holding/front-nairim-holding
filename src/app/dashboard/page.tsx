import DashboardLayout from "@/layout/dashboardLayout";
import Agency from "@/types/agency";
import Owner from "@/types/owner";
import Property from "@/types/property";
import Tenant from "@/types/tenant";

interface MetricResponse {
  averageRentalTicket: { result: number; variation: number };
  totalPropertyTaxAndCondoFee: { result: number; variation: number };
  vacancyInMonths: { result: number; variation: number };
  totalPropertys: { result: number; variation: number };
  countPropertiesWithLessThan3Docs: { result: number; variation: number };
  totalPropertiesWithSaleValue: { result: number; variation: number };
  ownersTotal: { result: number; variation: number };
  tenantsTotal: { result: number; variation: number };
  propertiesPerOwner: { result: number; variation: number };
  agenciesTotal: { result: number; variation: number };
  properties: Property[];
  owners: Owner[];
  tenants: Tenant[];
  agencies: Agency[];
  geolocationData: {
    lat: number;
    lng: number;
    info: string;
  }[];
}

interface PageProps {
  searchParams: Promise<{
    startDate?: string;
    endDate?: string;
  }>;
}

export default async function Page({ searchParams }: PageProps){
  const params = await searchParams;

  const today = new Date();
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(today.getDate() - 30);

  const formatDate = (date: Date) => date.toISOString().split('T')[0];

  const startDate = params.startDate ?? formatDate(thirtyDaysAgo);
  const endDate = params.endDate ?? formatDate(today);

  const baseUrl = process.env.NEXT_PUBLIC_URL_API;
  const res = await fetch(
    `${baseUrl}/dashboard?startDate=${startDate}&endDate=${endDate}`, 
    { cache: "no-store" }
  );
  const data: MetricResponse = await res.json();

  return <DashboardLayout metrics={data} />;
}
