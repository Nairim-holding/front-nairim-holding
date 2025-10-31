"use client";

import React, { useMemo, useState, useEffect, Suspense } from "react";
import dynamic from "next/dynamic";
import NumericCard from "@/components/Admin/Charts/NumericCard";
import DashboardFilter from "@/components/Admin/Dashboard/Filter";
import MetricResponse from "@/types/dashboard";

const SkeletonLoader = ({ height = "h-[240px]" }: { height?: string }) => (
  <div
    className={`bg-white rounded-lg p-4 border border-[#DDE1E6] shadow-chart w-full cursor-pointer transition-all duration-300 flex flex-col justify-between animate-pulse ${height}`}
  >
    <div className="flex flex-col gap-3 flex-1">
      <div className="h-5 w-2/5 bg-gray-200 rounded-md"></div>
      <div className="h-4 w-1/3 bg-gray-100 rounded-md"></div>
      <div className="flex-1 bg-gray-100 rounded-md mt-3"></div>
    </div>
  </div>
);

const SkeletonMap = () => (
  <div className="bg-white rounded-lg p-4 border border-[#DDE1E6] shadow-chart w-full h-[500px] animate-pulse flex flex-col justify-center items-center transition-all duration-300">
    <div className="h-full w-full bg-gray-100 rounded-md"></div>
  </div>
);

const DonutChart = dynamic(() => import("@/components/Admin/Charts/DonaltChart"), {
  ssr: false,
  loading: () => <SkeletonLoader height="h-[240px]" />,
});

const GaugeCard = dynamic(() => import("@/components/Admin/Charts/GaugeChart"), {
  ssr: false,
  loading: () => <SkeletonLoader height="h-[240px]" />,
});

const GeoLocationMapWrapper = dynamic(
  () => import("@/components/Admin/Charts/GeoLocationMapWrapper"),
  {
    ssr: false,
    loading: () => <SkeletonMap />,
  }
);

interface SimpleMetric {
  result: number;
  variation?: number;
  isPositive?: boolean;
}

interface DashboardProps {
  metrics: MetricResponse;
}


export default function DashboardLayout({ metrics }: DashboardProps) {
  const [filter, setFilter] = useState<
    "financial" | "portfolio" | "clients" | "map" | "all"
  >("financial");

  const [pendingFilter, setPendingFilter] = useState(filter);
  useEffect(() => {
    const timeout = setTimeout(() => setFilter(pendingFilter), 100);
    return () => clearTimeout(timeout);
  }, [pendingFilter]);


  const formatted = useMemo(() => {
    const fmtCurrency = (v?: number) =>
      typeof v === "number" ? `R$ ${v.toFixed(2).replace(".", ",")}` : "R$ 0,00";

    return {
      avgRental: fmtCurrency(metrics.averageRentalTicket?.result),
      totalRentalActive: fmtCurrency(metrics.totalRentalActive?.result),
      totalTaxFee:
        typeof metrics.totalPropertyTaxAndCondoFee?.result === "number"
          ? `R$ ${Math.round(metrics.totalPropertyTaxAndCondoFee.result)
              .toString()
              .replace(".", ",")}`
          : "R$ 0",
      totalAcquisition: fmtCurrency(metrics.totalAcquisitionValue?.result),
      vacancyMonths: `${Math.round(metrics.vacancyInMonths?.result ?? 0)} meses`,
    };
  }, [metrics]);

  const activeSection = useMemo(() => {
    const get = (k: keyof MetricResponse) =>
      (metrics[k] ?? { result: 0 }) as SimpleMetric;

    if (filter === "financial") {
      return (
        <>
          <NumericCard
            value={formatted.avgRental}
            label="Ticket Médio do aluguel"
            variation={String(get("averageRentalTicket").variation ?? 0)}
            positive={get("averageRentalTicket").isPositive ?? false}
          />
          <NumericCard
            value={formatted.totalRentalActive}
            label="Valor Total de Aluguel do Portfólio"
            variation={String(metrics.totalRentalActive?.variation ?? 0)}
            positive={metrics.totalRentalActive?.isPositive ?? false}
          />
          <NumericCard
            value={formatted.totalTaxFee}
            label="Total de Impostos e Taxas (Mensal Est.)"
            variation={String(metrics.totalPropertyTaxAndCondoFee?.variation ?? 0)}
            positive={metrics.totalPropertyTaxAndCondoFee?.isPositive ?? false}
          />
          <NumericCard
            value={formatted.totalAcquisition}
            label="Valor Total de Aquisição do Portfólio"
            variation={String(metrics.totalAcquisitionValue?.variation ?? 0)}
            positive={metrics.totalAcquisitionValue?.isPositive ?? false}
          />
          <GaugeCard
            label="Índice de Vacância Financeira"
            value={metrics.financialVacancyRate?.result ?? 0}
            color="#8B5CF6"
          />
          <NumericCard
            value={formatted.vacancyMonths}
            label="Total da Vacância em Meses"
            variation={String(metrics.vacancyInMonths?.variation ?? 0)}
            positive={metrics.vacancyInMonths?.isPositive ?? false}
          />
        </>
      );
    }

    if (filter === "portfolio") {
      return (
        <>
          <NumericCard
            value={String(metrics.totalPropertys?.result ?? 0)}
            label="Total de Imóveis"
            variation={String(metrics.totalPropertys?.variation ?? 0)}
            positive={metrics.totalPropertys?.isPositive ?? false}
          />
          <NumericCard
            value={String(metrics.countPropertiesWithLessThan3Docs?.result ?? 0)}
            label="Imóveis com Documentação Pendente"
            variation={String(metrics.countPropertiesWithLessThan3Docs?.variation ?? 0)}
            positive={metrics.countPropertiesWithLessThan3Docs?.isPositive ?? false}
          />
          <NumericCard
            value={String(metrics.totalPropertiesWithSaleValue?.result ?? 0)}
            label="Imóveis com Valor de Venda Definido"
            variation={String(metrics.totalPropertiesWithSaleValue?.variation ?? 0)}
            positive={metrics.totalPropertiesWithSaleValue?.isPositive ?? false}
          />
          <DonutChart
            data={[
              {
                name: "Disponíveis",
                value: metrics.financialVacancyRate?.result ?? 0,
              },
              {
                name: "Ocupados",
                value: 100 - (metrics.financialVacancyRate?.result ?? 0),
              },
            ]}
            label="Imóveis por Status de Disponibilidade"
          />
          <DonutChart
            data={metrics.availablePropertiesByType ?? []}
            label="Imóveis na carteira"
          />
          <GaugeCard
            label="Taxa de Ocupação"
            value={100 - (metrics.financialVacancyRate?.result ?? 0)}
            color="#8B5CF6"
          />
          <GaugeCard
            label="Índice de Vacância Física"
            value={metrics.vacancyInMonths?.result ?? 0}
            color="#8B5CF6"
          />
        </>
      );
    }

    if (filter === "clients") {
      return (
        <>
          <NumericCard
            value={String(metrics.ownersTotal?.result ?? 0)}
            label="Proprietários Total"
            variation={String(metrics.ownersTotal?.variation ?? 0)}
            positive={metrics.ownersTotal?.isPositive ?? false}
          />
          <NumericCard
            value={String(metrics.tenantsTotal?.result ?? 0)}
            label="Inquilinos Total"
            variation={String(metrics.tenantsTotal?.variation ?? 0)}
            positive={metrics.tenantsTotal?.isPositive ?? false}
          />
          <NumericCard
            value={String(
              (metrics.propertiesPerOwner?.result ?? 0).toFixed(2)
            )}
            label="Imóveis por Proprietário"
            variation={String(metrics.propertiesPerOwner?.variation ?? 0)}
            positive={metrics.propertiesPerOwner?.isPositive ?? false}
          />
          <NumericCard
            value={String(metrics.agenciesTotal?.result ?? 0)}
            label="Total de Agência Parceiras"
            variation={String(metrics.agenciesTotal?.variation ?? 0)}
            positive={metrics.agenciesTotal?.isPositive ?? false}
          />
          <DonutChart
            data={metrics.propertiesByAgency ?? []}
            label="Imóveis por Agência"
          />
        </>
      );
    }

    if (filter === "map") {
      return <GeoLocationMapWrapper locations={metrics.geolocationData ?? []} />;
    }

    return (
      <>
        <NumericCard
          value={formatted.avgRental}
          label="Ticket Médio do aluguel"
          variation={String(metrics.averageRentalTicket?.variation ?? 0)}
          positive={metrics.averageRentalTicket?.isPositive ?? false}
        />
        <NumericCard
          value={String(metrics.totalPropertys?.result ?? 0)}
          label="Total de Imóveis"
          variation={String(metrics.totalPropertys?.variation ?? 0)}
          positive={metrics.totalPropertys?.isPositive ?? false}
        />
        <NumericCard
          value={String(metrics.ownersTotal?.result ?? 0)}
          label="Proprietários Total"
          variation={String(metrics.ownersTotal?.variation ?? 0)}
          positive={metrics.ownersTotal?.isPositive ?? false}
        />
        <DonutChart data={metrics.availablePropertiesByType ?? []} label="Imóveis" />
      </>
    );
  }, [filter, formatted, metrics]);


  return (
    <section className="p-3 min-h-screen transition-all duration-300">
      <DashboardFilter filter={pendingFilter} setFilter={setPendingFilter} />
      <div
        className={`
          transition-all duration-300
          ${filter === "financial" ? "grid-finalcial" : ""}
          ${filter === "portfolio" ? "grid-portfolio" : ""}
          ${filter === "clients" ? "grid-client" : ""}
          ${filter === "map" ? "w-full" : ""}
        `}
      >
        {activeSection}
      </div>
    </section>
  );
}