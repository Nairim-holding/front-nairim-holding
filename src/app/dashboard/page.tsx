"use client";

import React, { useEffect, useState, Suspense } from "react";
import DashboardLayout from "@/layout/dashboardLayout";
import { MetricResponse } from "@/types/dashboard";
import { useSearchParams } from "next/navigation";

function DashboardContent() {
  const searchParams = useSearchParams();

  const [metrics, setMetrics] = useState<MetricResponse | null>(null);
  const [geoData, setGeoData] = useState<{ lat: number; lng: number; info: string }[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loadingMetrics, setLoadingMetrics] = useState(true);
  const [loadingGeo, setLoadingGeo] = useState(true);

  useEffect(() => {
    async function fetchDashboard() {
      try {
        setError(null);
        setLoadingMetrics(true);
        setLoadingGeo(true);

        const startDate = searchParams.get("startDate");
        const endDate = searchParams.get("endDate");

        const today = new Date();

        const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
        const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

        const formatDate = (date: Date) => date.toISOString().split("T")[0];

        const start = startDate || formatDate(firstDayOfMonth);
        const end = endDate || formatDate(lastDayOfMonth);

        const baseUrl = process.env.NEXT_PUBLIC_URL_API;
        if (!baseUrl) throw new Error("NEXT_PUBLIC_URL_API não configurada");

        const metricsRes = await fetch(`${baseUrl}/dashboard?startDate=${start}&endDate=${end}`, {
          cache: "no-store",
        });

        if (!metricsRes.ok) throw new Error("Erro ao carregar métricas");
        const data: MetricResponse = await metricsRes.json();

        setMetrics({ ...data, geolocationData: [] });
        setLoadingMetrics(false);

        fetch(`${baseUrl}/dashboard-geo?startDate=${start}&endDate=${end}`, {
          cache: "no-store",
        })
          .then(async (res) => {
            if (!res.ok) throw new Error("Erro ao carregar geolocalização");
            const geo = await res.json();

            setGeoData(
              geo.map((g: any) => ({
                lat: Number(g.lat ?? 0),
                lng: Number(g.lng ?? 0),
                info: String(g.info ?? ""),
              }))
            );
          })
          .catch((err) => console.error("⚠️ Geo erro:", err))
          .finally(() => setLoadingGeo(false));
      } catch (err: any) {
        console.error(err);
        setError(err.message || "Erro desconhecido");
        setLoadingMetrics(false);
      }
    }

    fetchDashboard();
  }, [searchParams]);

  if (loadingMetrics) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-600">Carregando dashboard...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen text-red-600">
        <p>{error}</p>
      </div>
    );
  }

  if (!metrics) {
    return (
      <div className="flex justify-center items-center min-h-screen text-gray-500">
        Nenhum dado disponível.
      </div>
    );
  }

  const fullMetrics = {
    ...metrics,
    geolocationData: geoData.length ? geoData : metrics.geolocationData ?? [],
  };

  return <DashboardLayout metrics={fullMetrics} geoLoading={loadingGeo} />;
}

export default function Page() {
  return (
    <Suspense fallback={<div className="flex justify-center items-center min-h-screen">Carregando...</div>}>
      <DashboardContent />
    </Suspense>
  );
}
