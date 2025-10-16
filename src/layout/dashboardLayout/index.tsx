"use client";

import { useState } from "react";
import DonutChart from "@/components/Admin/Charts/DonaltChart";
import GaugeCard from "@/components/Admin/Charts/GaugeChart";
import GeoLocationMapWrapper from "@/components/Admin/Charts/GeoLocationMapWrapper";
import HorizontalBarChart from "@/components/Admin/Charts/HorizontalBarChart";
import NumericCard from "@/components/Admin/Charts/NumericCard";
import IconMoney from "@/components/Icons/IconMoney";
import { BiWorld } from "react-icons/bi";
import { FaHouseChimney, FaUser } from "react-icons/fa6";

import Property from "@/types/property";
import Owner from "@/types/owner";
import Tenant from "@/types/tenant";
import Agency from "@/types/agency";

interface DashboardProps {
  dataPropertys: Property[];
  dataOwners: Owner[];
  dataTenants: Tenant[];
  dataAgency: Agency[];
}

export default function DashboardLayout({ dataPropertys, dataOwners, dataTenants, dataAgency }: DashboardProps) {
  const [filter, setFilter] = useState<"financial" | "portfolio" | "clients" | "map" | "all">("financial");

  const totalPropertys = dataPropertys.length;
  const totalOwners = dataOwners.length;
  const totalTenants = dataTenants.length;
  const totalAgencys = dataAgency.length;

  const totalPropertysAvailable = dataPropertys.filter(
    (property) => property.values?.some((v) => v.current_status === "AVAILABLE")
  ).length;

  const totalPropertysOccupied = dataPropertys.filter(
    (property) => property.values?.some((v) => v.current_status === "OCCUPIED")
  ).length;

  const chartData = [
    { name: "Locado", value: totalPropertysOccupied },
    { name: "Desocupado", value: totalPropertysAvailable },
  ];

  const totalPropertysType = dataPropertys.map((property) => property.type?.description);
  const chartDataHorizontal = Object.entries(
    totalPropertysType.reduce((acc: Record<string, number>, type) => {
      if (type) {
        acc[type] = (acc[type] || 0) + 1;
      }
      return acc;
    }, {})
  ).map(([name, value]) => ({ name, value }));

  const rateOcuppied = (totalPropertysOccupied / totalPropertys) * 100;

  const allRentalValues = dataPropertys.flatMap(property =>
    property.values?.map(v => Number(v.rental_value)) || []
  );
  const totalRentalValue = allRentalValues.reduce((acc, value) => acc + value, 0);
  const averageRentalValue = totalRentalValue / allRentalValues.length;

  const totalRentalActive = dataPropertys
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

  const propertiesWithLessThan3Docs = dataPropertys.filter((property) => {
    const pdfDocs = property.documents?.filter(
      (doc) => doc.file_type === "application/pdf"
    ) ?? [];

    return pdfDocs.length < 3;
  });

  const countPropertiesWithLessThan3Docs = propertiesWithLessThan3Docs.length;

  const totalPropertyTaxAndCondoFee = dataPropertys
    .map((property) =>
      property.values?.reduce((acc, v) => {
        const propertyTax = parseFloat(v.property_tax) || 0;
        const condoFee = parseFloat(v.condo_fee) || 0;
        return acc + propertyTax + condoFee;
      }, 0) ?? 0
    )
    .reduce((acc, value) => acc + value, 0);

  const propertiesWithSaleValue = dataPropertys.filter(property =>
    property.values?.some(v => parseFloat(v.sale_value || "0") > 0)
  );

  const totalPropertiesWithSaleValue = propertiesWithSaleValue.length;

  const totalAcquisitionValue = dataPropertys
    .map(property =>
      property.values?.reduce((acc, v) => acc + (parseFloat(v.purchase_value || "0")), 0) ?? 0
    )
    .reduce((acc, value) => acc + value, 0);

  const chartDataByAgency = Object.entries(
    dataPropertys.reduce((acc: Record<string, number>, property) => {
      const agencyName = property.agency?.legal_name || "Sem Agência";
      acc[agencyName] = (acc[agencyName] || 0) + 1;
      return acc;
    }, {})
  ).map(([name, value]) => ({ name, value }));

  const totalUnoccupiedArea = dataPropertys.reduce((acc, property) => {
    const currentStatus = property.values?.[0]?.current_status;
    const area = property.area_total || 0;
    return acc + (currentStatus === "AVAILABLE" ? area : 0);
  }, 0);

  const totalRentableArea = dataPropertys.reduce((acc, property) => {
    return acc + (property.area_total || 0);
  }, 0);

  const physicalVacancyRate = totalRentableArea > 0
    ? (totalUnoccupiedArea / totalRentableArea) * 100
    : 0;

  const totalPotentialRentUnoccupied = dataPropertys.reduce((acc, property) => {
    const value = parseFloat(property.values?.[0]?.rental_value || "0");
    const currentStatus = property.values?.[0]?.current_status;
    return acc + (currentStatus === "AVAILABLE" ? value : 0);
  }, 0);

  const totalPotentialRentTotal = dataPropertys.reduce((acc, property) => {
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

  const totalRentalOccupied = dataPropertys.reduce((acc, property) => {
    const rentalValue = parseFloat(property.values?.[0]?.rental_value || "0");
    const currentStatus = property.values?.[0]?.current_status;
    return acc + (currentStatus === "OCCUPIED" ? rentalValue : 0);
  }, 0);

  const averageRentalTicket = dataTenants.length > 0
    ? totalRentalOccupied / dataTenants.length
    : 0;

  return (
    <section className="p-3 min-h-screen bg-slate-50 dark:bg-slate-900">
      <div className="flex flex-col justify-center mb-2">
        <div className="flex justify-center items-center gap-5 mb-3">
          <span className="text-4xl font-bold text-slate-800 dark:text-slate-100">2025</span>
          <span className="text-2xl font-bold text-slate-800 dark:text-slate-100">JAN - DEZ</span>
        </div>
        <div className="flex items-center justify-between px-2">
          <div className="flex items-center justify-start gap-5">
            <span className="text-2xl font-bold text-slate-800 dark:text-slate-100">filtros:</span>
            <select className="w-[400px] max-w-[400px] h-[40px] border border-[#666]">
              <option>1</option>
              <option>1</option>
              <option>1</option>
            </select>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setFilter("financial")}
              className={`w-[50px] h-[50px] flex items-center justify-center border ${filter === "financial" ? "border-button" : "border-[#666]"}`}
              aria-label="Filtrar Financeiro"
              title="Financeiro"
            >
              <IconMoney margin color={filter === "financial" ? "#8B5CF6" : "#666"} size={30} />
            </button>

            <button
              onClick={() => setFilter("portfolio")}
              className={`w-[50px] h-[50px] flex items-center justify-center border ${filter === "portfolio" ? "border-button" : "border-[#666]"}`}
              aria-label="Filtrar Portfólio"
              title="Portfólio"
            >
              <FaHouseChimney color={filter === "portfolio" ? "#8B5CF6" : "#666"} size={27} />
            </button>

            <button
              onClick={() => setFilter("clients")}
              className={`w-[50px] h-[50px] flex items-center justify-center border ${filter === "clients" ? "border-button" : "border-[#666]"}`}
              aria-label="Filtrar Clientes"
              title="Clientes"
            >
              <FaUser color={filter === "clients" ? "#8B5CF6" : "#666"} size={25} />
            </button>

            <button
              onClick={() => setFilter("map")}
              className={`w-[50px] h-[50px] flex items-center justify-center border ${filter === "map" ? "border-button" : "border-[#666]"}`}
              aria-label="Filtrar Mapa"
              title="Mapa"
            >
              <BiWorld color={filter === "map" ? "#8B5CF6" : "#666"} size={30} />
            </button>
          </div>
        </div>
      </div>

      <div className={`${filter !== 'map' ? 'grid-responsive' : 'w-full'}`}>
        {(filter === "financial" || filter === "all") && (
          <>
            <NumericCard
              value={`R$ ${averageRentalValue.toFixed(2).replace('.', ',')}`}
              label="Média do Valor de Aluguel"
            />
            <NumericCard
              value={`R$ ${totalRentalActive.toFixed(2).replace('.', ',')}`}
              label="Valor Total de Aluguel do Portfólio"
            />
            <NumericCard
              value={`R$ ${totalPropertyTaxAndCondoFee.toFixed(2).replace('.', ',')}`}
              label="Total de Impostos e Taxas (Mensal Est.)"
            />
            <NumericCard
              value={`R$ ${totalAcquisitionValue.toFixed(2).replace('.', ',')}`}
              label="Valor Total de Aquisição do Portfólio"
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
              value={`R$ ${averageRentalTicket.toFixed(2).replace('.', ',')}`}
              label="Ticket Médio de Aluguel"
            />
          </>
        )}

        {(filter === "portfolio" || filter === "all") && (
          <>
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
              value={countPropertiesWithLessThan3Docs.toString()}
              label="Imóveis com Documentação Pendente"
            />
            <NumericCard
              value={totalPropertiesWithSaleValue.toString()}
              label="Imóveis com Valor de Venda Definido"
            />
            <GaugeCard
              label="Índice de Vacância Física"
              value={physicalVacancyRate}
              color="#6D28D9"
            />
          </>
        )}

        {(filter === "clients" || filter === "all") && (
          <>
            <NumericCard
              value={totalOwners.toString()}
              label="Total de Proprietários Ativos"
            />
            <NumericCard
              value={totalTenants.toString()}
              label="Total de Inquilinos Ativos"
            />
            <NumericCard
              value={propertyOwnerRatio.toFixed(2)}
              label="Relação Imóveis/Proprietário"
            />
            <HorizontalBarChart
              data={chartDataByAgency}
              colors={["#6D28D9", "#f59e0b", "#3b82f6", "#ef4444"]}
              label="Imóveis por Agência"
            />
          </>
        )}

        {(filter === "map" || filter === "all") && (
          <GeoLocationMapWrapper properties={dataPropertys} />
        )}
      </div>
    </section>
  );
}
