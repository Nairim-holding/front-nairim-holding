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
  properties: Property[];
}

export default function GeoLocationMap({ properties }: GeoLocationMapProps) {
  const [locations, setLocations] = useState<
    { lat: number; lng: number; info: string }[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    async function fetchCoordinates() {
      setLoading(true);
      const coords: { lat: number; lng: number; info: string }[] = [];

      for (const property of properties) {
        const addr = property.addresses?.[0]?.address;
        if (!addr) continue;

        const fullAddress = `${addr.street}, ${addr.number}, ${addr.city}, ${addr.state}, ${addr.country}`;
        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
              fullAddress
            )}`
          );
          const data = await response.json();
          if (data && data[0]) {
            coords.push({
              lat: parseFloat(data[0].lat),
              lng: parseFloat(data[0].lon),
              info: `${property.title} (${addr.city}/${addr.state})`,
            });
          }
        } catch (error) {
          console.error("Erro ao obter coordenadas:", error);
        }
      }

      setLocations(coords);
      setLoading(false);
    }

    fetchCoordinates();
  }, [properties]);

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

  if (loading) {
    return (
      <div className="p-6 bg-white dark:bg-slate-800 rounded-2xl shadow border border-slate-200 dark:border-slate-700 text-center flex items-center justify-center h-[500px]">
        <p className="text-slate-500 dark:text-slate-400">Carregando mapa...</p>
      </div>
    );
  }

  if (locations.length === 0) {
    return (
      <div className="p-6 bg-white dark:bg-slate-800 rounded-2xl shadow border border-slate-200 dark:border-slate-700 text-center h-[500px] flex items-center justify-center">
        <p className="text-slate-500 dark:text-slate-400">
          Nenhum imóvel encontrado.
        </p>
      </div>
    );
  }

  return (
    <>
      <div
        className="p-4 bg-white dark:bg-slate-800 rounded-2xl shadow border border-slate-200 dark:border-slate-700 cursor-pointer transition hover:scale-[1.01]"
        onClick={() => setShowPopup(true)}
      >
        <h3 className="text-lg font-semibold mb-3 text-slate-700 dark:text-slate-100 text-center">
          Mapa de Localização dos Imóveis
        </h3>
        <div className="relative w-full h-[500px] overflow-hidden rounded-2xl">
          {MapComponent}
        </div>
      </div>

      {showPopup &&
        ReactDOM.createPortal(
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 shadow-2xl w-[90vw] h-[90vh] relative">
              <button
                onClick={() => setShowPopup(false)}
                className="absolute top-3 right-3 p-2 rounded-full bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 transition"
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
