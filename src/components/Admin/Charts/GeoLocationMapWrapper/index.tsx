"use client";

import dynamic from "next/dynamic";

const GeoLocationMap = dynamic(() => import("@/components/Admin/Charts/GeoLocationMap"), {
  ssr: false,
});

interface GeoLocationMapWrapperProps {
  locations: { lat: number; lng: number; info: string }[];
  loading?: boolean;
}

export default function GeoLocationMapWrapper({ locations, loading = false }: GeoLocationMapWrapperProps) {
  if (loading) {
    return (
      <div className="bg-white rounded-lg p-4 border border-[#DDE1E6] shadow-chart w-full h-[500px] animate-pulse flex flex-col justify-center items-center transition-all duration-300">
        <div className="h-full w-full bg-gray-100 rounded-md"></div>
      </div>
    );
  }

  return <GeoLocationMap locations={locations} />;
}