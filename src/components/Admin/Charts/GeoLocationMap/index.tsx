"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";
import "react-leaflet-fullscreen/styles.css";
import { FullscreenControl } from "react-leaflet-fullscreen";
import ReactDOM from "react-dom";

interface Address {
  street: string;
  number: number;
  district: string;
  city: string;
  state: string;
  country: string;
}

interface Property {
  id: number;
  title: string;
  type?: { description: string };
  addresses?: { address: Address }[];
}

interface GeoLocationMapProps {
  locations: { lat: number; lng: number; info: string }[],
}

export default function GeoLocationMap({ locations }: GeoLocationMapProps) {
  console.log(locations)
  const [showPopup, setShowPopup] = useState(false);

  const icon = L.icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
    iconSize: [30, 30],
    iconAnchor: [15, 30],
    popupAnchor: [0, -30],
  });

  const center = [0, 0] as [number, number];
  const initialZoom = 2;

  const MapComponent = (
    <MapContainer
      center={center}
      zoom={initialZoom}
      scrollWheelZoom={true}
      className="w-full h-full rounded-2xl z-0"
      style={{
        height: "100%",
        width: "100%",
        borderRadius: "1rem",
      }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <FullscreenControl position="topright" />

      {locations.map((loc, idx) => (
        <Marker key={idx} position={[loc.lat, loc.lng]} icon={icon}>
          <Popup>{loc.info}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );

  if (locations.length === 0) {
    return (
      <div className="p-6 bg-white rounded-2xl shadow border border-slate-200 text-center h-[500px] flex items-center justify-center">
        <p className="text-slate-500">
          Nenhum imóvel encontrado.
        </p>
      </div>
    );
  }

  return (
    <>
      <div
        className="p-4 bg-white rounded-2xl shadow border border-slate-200 cursor-pointer transition hover:scale-[1.01]"
        onClick={() => setShowPopup(true)}
      >
        <div className="relative w-full h-[500px] overflow-hidden rounded-2xl">
          {MapComponent}
        </div>
      </div>

      {showPopup &&
        ReactDOM.createPortal(
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-4 shadow-2xl w-[90vw] h-[90vh] relative">
              <button
                onClick={() => setShowPopup(false)}
                className="absolute top-3 right-3 p-2 rounded-full bg-slate-200 hover:bg-slate-300 transition"
              >
                ✕
              </button>
              <div className="w-[98%] h-full rounded-xl overflow-hidden">
                {MapComponent}
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
