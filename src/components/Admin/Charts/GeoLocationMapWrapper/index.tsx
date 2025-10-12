"use client";

import dynamic from "next/dynamic";

const GeoLocationMap = dynamic(() => import("@/components/Admin/Charts/GeoLocationMap"), {
  ssr: false,
});

export default function GeoLocationMapWrapper({ properties }: { properties: any[] }) {
  return <GeoLocationMap properties={properties} />;
}
