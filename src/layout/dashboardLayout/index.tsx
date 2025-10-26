"use client";

import { useEffect, useState } from "react";
import DonutChart from "@/components/Admin/Charts/DonaltChart";
import GaugeCard from "@/components/Admin/Charts/GaugeChart";
import GeoLocationMapWrapper from "@/components/Admin/Charts/GeoLocationMapWrapper";
import HorizontalBarChart from "@/components/Admin/Charts/HorizontalBarChart";
import NumericCard from "@/components/Admin/Charts/NumericCard";

import DashboardFilter from "@/components/Admin/Dashboard/Filter";

interface DashboardProps {
  metrics: any;
}

export default function DashboardLayout({ metrics }: DashboardProps) {
  const [filter, setFilter] = useState<"financial" | "portfolio" | "clients" | "map" | "all">("financial");
  console.log(metrics)
  return (
    <section className="p-3 min-h-screen">

      <DashboardFilter filter={filter} setFilter={setFilter}></DashboardFilter>
      <div className={`
        ${filter === 'financial' ? 'grid-finalcial' : ''}
        ${filter === 'portfolio' ? 'grid-responsive' : ''}
        ${filter === 'clients' ? 'grid-responsive' : ''}
        ${filter === 'map' ? 'w-full' : ''}
      `}>
      {(filter === "financial" || filter === "all") && (
        <>
          <NumericCard
            value={`R$ ${metrics.averageRentalTicket.result.toFixed(2).replace('.', ',')}`}
            label="Ticket Médio do aluguel"
            variation={metrics.averageRentalTicket.variation.toFixed(0)}
            positive={metrics.averageRentalTicket.variation == 0 ? 'equal' : metrics.averageRentalTicket.isPositive}
          />
          <NumericCard
            value={`R$ ${metrics.totalRentalActive?.result.toFixed(2).replace('.', ',')}`}
            label="Valor Total de Aluguel do Portfólio"
            variation={metrics.totalRentalActive.variation.toFixed(0)}
            positive={metrics.totalRentalActive.variation == 0 ? 'equal' : metrics.totalRentalActive.isPositive}
          />
          <NumericCard
            value={`R$ ${metrics.totalPropertyTaxAndCondoFee.result.toFixed(0).replace('.', ',')}`}
            label="Total de Impostos e Taxas (Mensal Est.)"
            variation={metrics.totalPropertyTaxAndCondoFee.variation.toFixed(0)}
            positive={metrics.totalPropertyTaxAndCondoFee.variation == 0 ? 'equal' : metrics.totalPropertyTaxAndCondoFee.isPositive}
          />
          <NumericCard
            value={`R$ ${metrics.totalAcquisitionValue?.result.toFixed(2).replace('.', ',')}`}
            label="Valor Total de Aquisição do Portfólio"
            variation={metrics.totalAcquisitionValue.variation.toFixed(0)}
            positive={metrics.totalAcquisitionValue.variation == 0 ? 'equal' : metrics.totalAcquisitionValue.isPositive}
          />
          <GaugeCard
            label="Índice de Vacância Financeira"
            value={metrics.financialVacancyRate?.result || 0}
            color="#8B5CF6"
          />
          <NumericCard
            value={`${metrics.vacancyInMonths.result.toFixed(0)} meses`}
            label="Total da Vacância em Meses"
            variation={metrics.vacancyInMonths.variation.toFixed(0)}
            positive={metrics.vacancyInMonths.variation == 0 ? 'equal' : metrics.vacancyInMonths.isPositive}
          />
        </>
      )}
    {/*
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
              color="#8B5CF6"
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
              color="#8B5CF6"
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
        )} */}

        {(filter === "map" || filter === "all") && (
          <GeoLocationMapWrapper locations={metrics.geolocationData} />
        )}
      </div>
    </section>
  );
}
