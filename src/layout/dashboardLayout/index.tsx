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
  return (
    <section className="p-3 min-h-screen">

      <DashboardFilter filter={filter} setFilter={setFilter}></DashboardFilter>
      <div className={`
        ${filter === 'financial' ? 'grid-finalcial' : ''}
        ${filter === 'portfolio' ? 'grid-portfolio' : ''}
        ${filter === 'clients' ? 'grid-client' : ''}
        ${filter === 'map' ? 'w-full' : ''}
      `}>
      {(filter === "financial" || filter === "all") && (
        <>
          <NumericCard
            value={`R$ ${metrics.averageRentalTicket.result.toFixed(2).replace('.', ',')}`}
            label="Ticket Médio do aluguel"
            variation={metrics.averageRentalTicket.variation.toFixed(2)}
            positive={metrics.averageRentalTicket.variation == 0 ? 'equal' : metrics.averageRentalTicket.isPositive}
          />
          <NumericCard
            value={`R$ ${metrics.totalRentalActive?.result.toFixed(2).replace('.', ',')}`}
            label="Valor Total de Aluguel do Portfólio"
            variation={metrics.totalRentalActive.variation.toFixed(2)}
            positive={metrics.totalRentalActive.variation == 0 ? 'equal' : metrics.totalRentalActive.isPositive}
          />
          <NumericCard
            value={`R$ ${metrics.totalPropertyTaxAndCondoFee.result.toFixed(0).replace('.', ',')}`}
            label="Total de Impostos e Taxas (Mensal Est.)"
            variation={metrics.totalPropertyTaxAndCondoFee.variation.toFixed(2)}
            positive={metrics.totalPropertyTaxAndCondoFee.variation == 0 ? 'equal' : metrics.totalPropertyTaxAndCondoFee.isPositive}
          />
          <NumericCard
            value={`R$ ${metrics.totalAcquisitionValue?.result.toFixed(2).replace('.', ',')}`}
            label="Valor Total de Aquisição do Portfólio"
            variation={metrics.totalAcquisitionValue.variation.toFixed(2)}
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
            variation={metrics.vacancyInMonths.variation.toFixed(2)}
            positive={metrics.vacancyInMonths.variation == 0 ? 'equal' : metrics.vacancyInMonths.isPositive}
          />
        </>
      )}

      {(filter === "portfolio" || filter === "all") && (
          <>
            <NumericCard
              value={metrics.totalPropertys.result.toString()}
              label="Total de Imóveis"
              variation={metrics.totalPropertys.variation.toFixed(0)}
              positive={
                metrics.totalPropertys.variation === 0
                  ? "equal"
                  : metrics.totalPropertys.isPositive
              }
            />

            <NumericCard
              value={metrics.countPropertiesWithLessThan3Docs.result.toString()}
              label="Imóveis com Documentação Pendente"
              variation={metrics.countPropertiesWithLessThan3Docs.variation.toFixed(
                0
              )}
              positive={
                metrics.countPropertiesWithLessThan3Docs.variation === 0
                  ? "equal"
                  : metrics.countPropertiesWithLessThan3Docs.isPositive
              }
            />

            <NumericCard
              value={metrics.totalPropertiesWithSaleValue.result.toString()}
              label="Imóveis com Valor de Venda Definido"
              variation={metrics.totalPropertiesWithSaleValue.variation.toFixed(
                0
              )}
              positive={
                metrics.totalPropertiesWithSaleValue.variation === 0
                  ? "equal"
                  : metrics.totalPropertiesWithSaleValue.isPositive
              }
            />

            <DonutChart
              data={[
                {
                  name: "Disponíveis",
                  value: metrics.financialVacancyRate.result,
                },
                {
                  name: "Ocupados",
                  value: 100 - metrics.financialVacancyRate.result,
                },
              ]}
              label="Imóveis por Status de Disponibilidade"
              colors={['#9E75FB', '#FF5555']}
            />

              <DonutChart
                data={metrics.availablePropertiesByType}
                label="Imóveis na carteira"
                colors={["#FF7777", "#77FF7B", "#F9FF53", "#77A2FF", "#E477FF"]}
              />


            <GaugeCard
              label="Taxa de Ocupação"
              value={100 - metrics.financialVacancyRate.result}
              color="#8B5CF6"
            />

            <GaugeCard
              label="Índice de Vacância Física"
              value={metrics.vacancyInMonths.result}
              color="#8B5CF6"
            />
          </>
      )}
      
        {(filter === "clients" || filter === "all") && (
          <>
            <NumericCard
              value={metrics.ownersTotal.result.toString()}
              label="Proprietários Total"
              variation={metrics.ownersTotal.variation.toFixed(
                0
              )}
              positive={
                metrics.ownersTotal.variation === 0
                  ? "equal"
                  : metrics.ownersTotal.isPositive
              }
            />
            <NumericCard
              value={metrics.tenantsTotal.result.toString()}
              label="Inquilinos Total"
              variation={metrics.tenantsTotal.variation.toFixed(
                0
              )}
              positive={
                metrics.tenantsTotal.variation === 0
                  ? "equal"
                  : metrics.tenantsTotal.isPositive
              }
            />
            <NumericCard
              value={metrics.propertiesPerOwner.result.toFixed(2)}
              label="Imóveis por Proprietário"
              variation={metrics.propertiesPerOwner.variation.toFixed(
                0
              )}
              positive={
                metrics.propertiesPerOwner.variation === 0
                  ? "equal"
                  : metrics.propertiesPerOwner.isPositive
              }
            />
            <NumericCard
              value={metrics.agenciesTotal.result.toFixed(2)}
              label="Total de Agência Parceiras"
              variation={metrics.agenciesTotal.variation.toFixed(
                0
              )}
              positive={
                metrics.agenciesTotal.variation === 0
                  ? "equal"
                  : metrics.agenciesTotal.isPositive
              }
            />
            <DonutChart
              data={metrics.propertiesByAgency}
              colors={["#FF7777", "#F9FF53", "#77FF7B", "#E477FF", "#77A2FF"]}
              label="Imóveis por Agência"
            />
          </>
        )}

        {(filter === "map" || filter === "all") && (
          <GeoLocationMapWrapper locations={metrics.geolocationData} />
        )}
      </div>
    </section>
  );
}
