// components/Admin/Dashboard/DashboardLayout.tsx

"use client";

import React, { useMemo, useState, useEffect } from "react";
import dynamic from "next/dynamic";
import NumericCard from "@/components/Admin/Charts/NumericCard";
import DashboardFilter from "@/components/Admin/Dashboard/Filter";
import {MetricResponse} from "@/types/dashboard";

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
    <div className="h-8 w-1/3 bg-gray-200 rounded-md mb-4"></div>
    <div className="h-full w-full bg-gray-100 rounded-md"></div>
  </div>
);

const DonutChart = dynamic(() => import("@/components/Admin/Charts/DonutChart"), {
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
  data?: any[];
}

interface MapProps {
  zoom?: number;
  center?: { lat: number; lng: number };
  style?: React.CSSProperties;
}

interface DashboardProps {
  metrics: MetricResponse;
  mapProps?: MapProps;
  geoLoading?: boolean;
}

export default function DashboardLayout({ metrics, mapProps, geoLoading = false }: DashboardProps) {
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
            label="Ticket Médio do Aluguel"
            variation={String(get("averageRentalTicket").variation ?? 0)}
            positive={get("averageRentalTicket").isPositive ?? false}
            detailData={get("averageRentalTicket").data}
            detailColumns={["id", "title", "rentalValue", "type"]}
          />
          <NumericCard
            value={formatted.totalRentalActive}
            label="Valor Total de Aluguel do Portfólio"
            variation={String(get("totalRentalActive").variation ?? 0)}
            positive={get("totalRentalActive").isPositive ?? false}
            detailData={get("totalRentalActive").data}
            detailColumns={["id", "title", "rentalValue", "status", "type", "agency"]}
          />
          <NumericCard
            value={formatted.totalTaxFee}
            label="Total de Impostos e Taxas (Mensal Est.)"
            variation={String(get("totalPropertyTaxAndCondoFee").variation ?? 0)}
            positive={get("totalPropertyTaxAndCondoFee").isPositive ?? false}
            detailData={get("totalPropertyTaxAndCondoFee").data}
            detailColumns={["id", "title", "propertyTax", "condoFee", "totalTaxAndCondo", "type"]}
          />
          <NumericCard
            value={formatted.totalAcquisition}
            label="Valor Total de Aquisição do Portfólio"
            variation={String(get("totalAcquisitionValue").variation ?? 0)}
            positive={get("totalAcquisitionValue").isPositive ?? false}
            detailData={get("totalAcquisitionValue").data}
            detailColumns={["id", "title", "purchaseValue", "type", "currentStatus"]}
          />
          <GaugeCard
            label="Índice de Vacância Financeira"
            value={get("financialVacancyRate").result ?? 0}
            color="#8B5CF6"
            detailData={get("financialVacancyRate").data}
            detailColumns={["id", "title", "rentalValue", "type", "areaTotal"]}
          />
          <NumericCard
            value={formatted.vacancyMonths}
            label="Total da Vacância em Meses"
            variation={String(get("vacancyInMonths").variation ?? 0)}
            positive={get("vacancyInMonths").isPositive ?? false}
            detailData={get("vacancyInMonths").data}
            detailColumns={["id", "title", "rentalValue", "type", "areaTotal"]}
          />
        </>
      );
    }

    if (filter === "portfolio") {
      return (
        <>
          <NumericCard
            value={String(get("totalPropertys").result ?? 0)}
            label="Total de Imóveis"
            variation={String(get("totalPropertys").variation ?? 0)}
            positive={get("totalPropertys").isPositive ?? false}
            detailData={get("totalPropertys").data}
            detailColumns={["id", "title", "type", "status", "rentalValue", "saleValue", "documentCount"]}
          />
          <NumericCard
            value={String(get("countPropertiesWithLessThan3Docs").result ?? 0)}
            label="Imóveis com Documentação Pendente"
            variation={String(get("countPropertiesWithLessThan3Docs").variation ?? 0)}
            positive={get("countPropertiesWithLessThan3Docs").isPositive ?? false}
            detailData={get("countPropertiesWithLessThan3Docs").data}
            detailColumns={["id", "title", "documentCount", "type"]}
          />
          <NumericCard
            value={String(get("totalPropertiesWithSaleValue").result ?? 0)}
            label="Imóveis com Valor de Venda Definido"
            variation={String(get("totalPropertiesWithSaleValue").variation ?? 0)}
            positive={get("totalPropertiesWithSaleValue").isPositive ?? false}
            detailData={get("totalPropertiesWithSaleValue").data}
            detailColumns={["id", "title", "saleValue", "type", "rentalValue"]}
          />
          <DonutChart
            data={[
              {
                name: "Disponíveis",
                value: metrics.financialVacancyRate?.result ?? 0,
                data: get("financialVacancyRate").data
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
            label="Imóveis na Carteira"
            colors={['#FF7777', '#77FF7B', '#F9FF53', '#77A2FF', '#E477FF']}
          />
          <GaugeCard
            label="Taxa de Ocupação"
            value={100 - (metrics.financialVacancyRate?.result ?? 0)}
            color="#8B5CF6"
            detailData={get("totalRentalActive").data}
            detailColumns={["id", "title", "rentalValue", "status", "type"]}
          />
          <GaugeCard
            label="Índice de Vacância Física"
            value={metrics.vacancyInMonths?.result ?? 0}
            max={12}
            color="#8B5CF6"
            detailData={get("vacancyInMonths").data}
            detailColumns={["id", "title", "rentalValue", "type", "areaTotal"]}
          />
        </>
      );
    }

    if (filter === "clients") {
      return (
        <>
          <NumericCard
            value={String(get("ownersTotal").result ?? 0)}
            label="Proprietários Totais"
            variation={String(get("ownersTotal").variation ?? 0)}
            positive={get("ownersTotal").isPositive ?? false}
            detailData={get("ownersTotal").data}
            detailColumns={["id", "name", "email", "createdAt"]}
          />
          <NumericCard
            value={String(get("tenantsTotal").result ?? 0)}
            label="Inquilinos Totais"
            variation={String(get("tenantsTotal").variation ?? 0)}
            positive={get("tenantsTotal").isPositive ?? false}
            detailData={get("tenantsTotal").data}
            detailColumns={["id", "name", "email", "createdAt"]}
          />
          <NumericCard
            value={String(
              (get("propertiesPerOwner").result ?? 0).toFixed(2)
            )}
            label="Imóveis por Proprietário"
            variation={String(get("propertiesPerOwner").variation ?? 0)}
            positive={get("propertiesPerOwner").isPositive ?? false}
            detailData={get("propertiesPerOwner").data}
            detailColumns={["id", "name", "email", "propertiesCount"]}
          />
          <NumericCard
            value={String(get("agenciesTotal").result ?? 0)}
            label="Total de Agências Parceiras"
            variation={String(get("agenciesTotal").variation ?? 0)}
            positive={get("agenciesTotal").isPositive ?? false}
            detailData={get("agenciesTotal").data}
            detailColumns={["id", "legalName", "tradeName", "email", "createdAt"]}
          />
          <DonutChart
            data={metrics.propertiesByAgency ?? []}
            label="Imóveis por Agência"
            colors={['#FF7777', '#77FF7B', '#77A2FF', '#F9FF53', '#E477FF']}
          />
        </>
      );
    }

    if (filter === "map") {
      if (geoLoading) return <SkeletonMap />;
      return <GeoLocationMapWrapper locations={metrics.geolocationData ?? []} {...mapProps} />;
    }

    return (
      <>
        <NumericCard
          value={formatted.avgRental}
          label="Ticket Médio do Aluguel"
          variation={String(metrics.averageRentalTicket?.variation ?? 0)}
          positive={metrics.averageRentalTicket?.isPositive ?? false}
          detailData={get("averageRentalTicket").data}
          detailColumns={["id", "title", "rentalValue", "type"]}
        />
        <NumericCard
          value={String(metrics.totalPropertys?.result ?? 0)}
          label="Total de Imóveis"
          variation={String(metrics.totalPropertys?.variation ?? 0)}
          positive={metrics.totalPropertys?.isPositive ?? false}
          detailData={get("totalPropertys").data}
          detailColumns={["id", "title", "type", "status", "rentalValue", "saleValue", "documentCount"]}
        />
        <NumericCard
          value={String(metrics.ownersTotal?.result ?? 0)}
          label="Proprietários Totais"
          variation={String(metrics.ownersTotal?.variation ?? 0)}
          positive={metrics.ownersTotal?.isPositive ?? false}
          detailData={get("ownersTotal").data}
          detailColumns={["id", "name", "email", "createdAt"]}
        />
        <DonutChart
          data={metrics.availablePropertiesByType ?? []}
          label="Imóveis"
        />
        <GaugeCard
          label="Taxa de Ocupação Geral"
          value={100 - (metrics.financialVacancyRate?.result ?? 0)}
          color="#10B981"
          detailData={get("totalRentalActive").data}
          detailColumns={["id", "title", "rentalValue", "status", "type"]}
        />
      </>
    );
  }, [filter, formatted, metrics, mapProps, geoLoading]);

  return (
    <section className="p-3 min-h-screen transition-all duration-300">
      <DashboardFilter filter={pendingFilter} setFilter={setPendingFilter} />
      <div
        className={`
          grid gap-4 transition-all duration-300
          ${filter === "financial" ? "grid-finalcial" : ""}
          ${filter === "portfolio" ? "grid-portfolio" : ""}
          ${filter === "clients" ? "grid-client" : ""}
          ${filter === "map" ? "w-full" : ""}
          ${filter === "all" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : ""}
        `}
      >
        {activeSection}
      </div>
    </section>
  );
}