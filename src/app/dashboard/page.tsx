import Property from "@/types/property";
import Owner from "@/types/owner";
import Tenant from "@/types/tenant";
import Agency from "@/types/agency";
import DashboardLayout from "@/layout/dashboardLayout";

interface DataResponse<T> {
  data: T[];
}

export default async function Page() {
  const baseUrl = process.env.NEXT_PUBLIC_URL_API;

  async function fetchData<T>(endpoint: string): Promise<DataResponse<T>> {
    const res = await fetch(`${baseUrl}/${endpoint}`, { cache: "no-store" });
    return res.json();
  }

  const [dataPropertys, dataOwners, dataTenants, dataAgency] = await Promise.all([
    fetchData<Property>("property"),
    fetchData<Owner>("owner"),
    fetchData<Tenant>("tenant"),
    fetchData<Agency>("agency"),
  ]);

  return (
    <DashboardLayout
      dataPropertys={dataPropertys.data}
      dataOwners={dataOwners.data}
      dataTenants={dataTenants.data}
      dataAgency={dataAgency.data}
    />
  );
}