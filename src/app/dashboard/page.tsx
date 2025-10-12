import DonutChart from "@/components/Admin/Charts/DonaltChart";
import GaugeCard from "@/components/Admin/Charts/GaugeChart";
import GeoLocationMapWrapper from "@/components/Admin/Charts/GeoLocationMapWrapper";
import HorizontalBarChart from "@/components/Admin/Charts/HorizontalBarChart";
import NumericCard from "@/components/Admin/Charts/NumericCard";
import IconMoney from "@/components/Icons/IconMoney";
import Agency from "@/types/agency";
import Owner from "@/types/owner";
import Property from "@/types/property";
import Tenant from "@/types/tenant";
import "leaflet/dist/leaflet.css";
import { BiWorld } from "react-icons/bi";
import { FaHouseChimney, FaUser } from "react-icons/fa6";

interface DataResponse {
  data: Property[] & Owner[] & Tenant[] & Agency[],
}

export default async function Page() {
  const urlPropertys = new URL(`${process.env.NEXT_PUBLIC_URL_API}/property`);
  const resPropertys = await fetch(urlPropertys.toString(), { cache: "no-store" });
  const dataPropertys = await resPropertys.json() as DataResponse;

  const urlOwners = new URL(`${process.env.NEXT_PUBLIC_URL_API}/owner`);
  const resOwners = await fetch(urlOwners.toString(), { cache: "no-store" });
  const dataOwners = await resOwners.json() as DataResponse;

  const urlTenants = new URL(`${process.env.NEXT_PUBLIC_URL_API}/tenant`);
  const resTenants = await fetch(urlTenants.toString(), { cache: "no-store" });
  const dataTenants = await resTenants.json() as DataResponse;

  const urlAgency = new URL(`${process.env.NEXT_PUBLIC_URL_API}/agency`);
  const resAgency = await fetch(urlAgency.toString(), { cache: "no-store" });
  const dataAgency = await resAgency.json() as DataResponse;

  const totalPropertys = dataPropertys.data.length;
  const totalOwners = dataOwners.data.length;
  const totalTenants = dataTenants.data.length;
  const totalAgencys = dataAgency.data.length;

  const totalPropertysAvailable = dataPropertys.data.filter(
    (property) => property.values?.some((v) => v.current_status === "AVAILABLE")
  ).length;

  const totalPropertysOccupied = dataPropertys.data.filter(
    (property) => property.values?.some((v) => v.current_status === "OCCUPIED")
  ).length;

  const chartData = [
    { name: "Locado", value: +totalPropertysOccupied },
    { name: "Desocupado", value: +totalPropertysAvailable },
  ];

  const totalPropertysType = dataPropertys.data.map((property) => property.type?.description);
  const chartDataHorizontal = Object.entries(
    totalPropertysType.reduce((acc: Record<string, number>, type) => {
      if (type) {
        acc[type] = (acc[type] || 0) + 1;
      }
      return acc;
    }, {})
  ).map(([name, value]) => ({ name, value }));

  const rateOcuppied = (totalPropertysOccupied / totalPropertys) * 100;
  const allRentalValues = dataPropertys.data.map(property =>
    property.values?.map(v => Number(v.rental_value)) || []
  ).flat();
  const totalRentalValue = allRentalValues.reduce((acc, value) => acc + value, 0);
  const averageRentalValue = totalRentalValue / allRentalValues.length;

  const totalRentalActive = dataPropertys.data
    .map(property =>
      property.values?.reduce(
        (acc, value) => acc + Number(value.rental_value), 
        0
      ) || 0
    )
    .reduce((acc, value) => acc + value, 0);

  const propertyOwnerRatio = totalOwners > 0 
      ? totalPropertys / totalOwners
      : 0;

  const propertiesWithLessThan3Docs = dataPropertys.data.filter((property) => {
    const pdfDocs = property.documents?.filter(
      (doc) => doc.file_type === "application/pdf"
    ) ?? [];

    return pdfDocs.length < 3;
  });

  const countPropertiesWithLessThan3Docs = propertiesWithLessThan3Docs.length;

  const totalPropertyTaxAndCondoFee = dataPropertys.data
    .map((property) =>
      property.values?.reduce((acc, v) => {
        const propertyTax = parseFloat(v.property_tax) || 0;
        const condoFee = parseFloat(v.condo_fee) || 0;
        return acc + propertyTax + condoFee;
      }, 0) ?? 0
    )
    .reduce((acc, value) => acc + value, 0);

    const propertiesWithSaleValue = dataPropertys.data.filter(property =>
      property.values?.some(v => parseFloat(v.sale_value || "0") > 0)
    );

    const totalPropertiesWithSaleValue = propertiesWithSaleValue.length;

    const totalAcquisitionValue = dataPropertys.data
      .map(property =>
        property.values?.reduce((acc, v) => acc + (parseFloat(v.purchase_value || "0")), 0) ?? 0
      )
      .reduce((acc, value) => acc + value, 0);

      const chartDataByAgency = Object.entries(
        dataPropertys.data.reduce((acc: Record<string, number>, property) => {
          const agencyName = property.agency?.legal_name || "Sem Agência";
          acc[agencyName] = (acc[agencyName] || 0) + 1;
          return acc;
        }, {})
      ).map(([name, value]) => ({ name, value }));

    const totalUnoccupiedArea = dataPropertys.data.reduce((acc, property) => {
      const currentStatus = property.values?.[0]?.current_status;
      const area = property.area_total || 0;
      return acc + (currentStatus === "AVAILABLE" ? area : 0);
    }, 0);

    const totalRentableArea = dataPropertys.data.reduce((acc, property) => {
      return acc + (property.area_total || 0);
    }, 0);

    const physicalVacancyRate = totalRentableArea > 0
      ? (totalUnoccupiedArea / totalRentableArea) * 100
      : 0;

    const totalPotentialRentUnoccupied = dataPropertys.data.reduce((acc, property) => {
      const value = parseFloat(property.values?.[0]?.rental_value || "0");
      const currentStatus = property.values?.[0]?.current_status;
      return acc + (currentStatus === "AVAILABLE" ? value : 0);
    }, 0);

    const totalPotentialRentTotal = dataPropertys.data.reduce((acc, property) => {
      const value = parseFloat(property.values?.[0]?.rental_value || "0");
      return acc + value;
    }, 0);

    const financialVacancyRate = totalPotentialRentTotal > 0
      ? (totalPotentialRentUnoccupied / totalPotentialRentTotal) * 100
      : 0;


    const averageRentalValueVacancy = totalPropertys > 0 ? totalRentalValue / totalPropertys : 0;

    const vacancyInMonths = averageRentalValueVacancy > 0 
      ? totalPotentialRentUnoccupied / averageRentalValueVacancy
      : 0;

    const totalRentalOccupied = dataPropertys.data.reduce((acc, property) => {
      const rentalValue = parseFloat(property.values?.[0]?.rental_value || "0");
      const currentStatus = property.values?.[0]?.current_status;
      return acc + (currentStatus === "OCCUPIED" ? rentalValue : 0);
    }, 0);

    const averageRentalTicket = dataTenants.data.length > 0
      ? totalRentalOccupied / dataTenants.data.length
      : 0;
      
  return (
    <main className="p-6 min-h-screen bg-slate-50 dark:bg-slate-900">
      <div className="flex flex-col justify-center pb-10">
        <div className="flex justify-center items-center gap-5">
          <span className="text-4xl font-bold mb-6 text-slate-800 dark:text-slate-100">2025</span>
          <span className="text-2xl font-bold mb-6 text-slate-800 dark:text-slate-100">JAN - DEZ</span>
        </div>
        <div className="flex items-center justify-between px-2">
          <div className="flex items-start justify-start gap-5">
            <span className="text-2xl font-bold mb-6 text-slate-800 dark:text-slate-100">filtros:</span>
            <select className="w-[400px] max-w-[400px] h-[40px] border border-[#666]">
              <option>1</option>
              <option>1</option>
              <option>1</option>
            </select>
          </div>
          <div className="flex gap-3">
            <button className="w-[50px] h-[50px] p-2 flex items-center justify-center border border-[#666]"><IconMoney margin color="#666" size={30} /></button>
            <button className="w-[50px] h-[50px] p-2 flex items-center justify-center border border-[#666]"><FaHouseChimney color="#666" size={27} /></button>
            <button className="w-[50px] h-[50px] p-2 flex items-center justify-center border border-[#666]"><FaUser color="#666" size={25} /></button>
            <button className="w-[50px] h-[50px] p-2 flex items-center justify-center border border-[#666]"><BiWorld color="#666" size={30} /></button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <NumericCard
          value={totalPropertys.toString()}
          label="Total de Imóveis"
        />

        <DonutChart 
          data={chartData} 
          label="Imóveis por Status de Disponibilidade" 
        />

        <HorizontalBarChart
          data={chartDataHorizontal}
          colors={["#6D28D9", "#f59e0b", "#3b82f6", "#ef4444"]}
          label="Status dos Imóveis"
        />

        <GaugeCard
          label="Taxa de Ocupação"
          value={rateOcuppied}
          color="#6D28D9"
        />

        <NumericCard
          value={`R$ ${averageRentalValue.toFixed(2).toString().replace('.', ',')}`}
          label="Média do Valor de Aluguel"
        />

        <NumericCard
          value={`R$ ${totalRentalActive.toFixed(2).toString().replace('.', ',')}`}
          label="Valor Total de Aluguel do Portfólio"
        />

        <NumericCard
          value={`${totalOwners.toString()}`}
          label="Total de Proprietários Ativos"
        />

        <NumericCard
          value={`${totalTenants.toString()}`}
          label="Total de Inquilinos Ativos"
        />

        <NumericCard
          value={`${propertyOwnerRatio.toString() ? propertyOwnerRatio.toString() : 0}`}
          label="Relação Imóveis/Proprietário"
        />

        <NumericCard
          value={`${countPropertiesWithLessThan3Docs.toString()}`}
          label="Imóveis com Documentação Pendente"
        />

        <NumericCard
          value={`R$ ${totalPropertyTaxAndCondoFee.toFixed(2).toString().replace('.', ',')}`}
          label="Total de Impostos e Taxas (Mensal Est.)"
        />

        <NumericCard
          value={`${totalPropertiesWithSaleValue}`}
          label="Imóveis com Valor de Venda Definido"
        />

        <NumericCard
          value={`${totalAgencys}`}
          label="Total de Agências Parcerias Ativas"
        />

        <NumericCard
          value={`R$ ${totalAcquisitionValue.toFixed(2).toString().replace('.', ',')}`}
          label="Valor Total de Aquisição do Portfólio"
        />

        <HorizontalBarChart
          data={chartDataByAgency}
          colors={["#6D28D9", "#f59e0b", "#3b82f6", "#ef4444"]}
          label="Imóveis por Agência"
        />

        <GaugeCard
          label="Índice de Vacância Física"
          value={physicalVacancyRate}
          color="#6D28D9"
        />
      
        <GaugeCard
          label="Índice de Vacância Financeira"
          value={financialVacancyRate}
          color="#6D28D9"
        />

        <NumericCard
          value={`${vacancyInMonths.toFixed(0)} meses`}
          label="Total da Vacância em Meses"
        />

        <NumericCard
          value={`R$ ${averageRentalTicket.toFixed(2).toString().replace('.', ',')}`}
          label="Ticket Médio de Aluguel"
        />

        <GeoLocationMapWrapper properties={dataPropertys.data} />
      </div>
    </main>
  );
}
