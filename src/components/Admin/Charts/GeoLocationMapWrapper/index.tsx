"use client";

import dynamic from "next/dynamic";

const GeoLocationMap = dynamic(() => import("@/components/Admin/Charts/GeoLocationMap"), {
  ssr: false,
});

export default function GeoLocationMapWrapper({ locations }: {   locations: { lat: number; lng: number; info: string }[]}) {
  return <GeoLocationMap locations={locations} />;
}
