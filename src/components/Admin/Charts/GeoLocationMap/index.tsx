"use client";

import { MapContainer, TileLayer, Marker, Popup, GeoJSON } from "react-leaflet";
import L, { LatLngExpression } from "leaflet";
import { useEffect, useRef, useState } from "react";
import "leaflet/dist/leaflet.css";
import "react-leaflet-fullscreen/styles.css";
import { FullscreenControl } from "react-leaflet-fullscreen";
import ReactDOM from "react-dom";

interface GeoLocationMapProps {
  locations: { lat: number; lng: number; info: string }[];
}

export default function GeoLocationMap({ locations }: GeoLocationMapProps) {
  const [showPopup, setShowPopup] = useState(false);
  const [countriesData, setCountriesData] = useState<any>(null);
  const [mainCountryName, setMainCountryName] = useState<string>("");
  const mapRef = useRef<L.Map | null>(null);

  const icon = L.icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
    iconSize: [30, 30],
    iconAnchor: [15, 30],
    popupAnchor: [0, -30],
  });

  const initialCenter: LatLngExpression = [0, 0];
  const initialZoom = 2;

  // --- Carrega GeoJSON
  useEffect(() => {
    fetch(
      "https://raw.githubusercontent.com/datasets/geo-countries/master/data/countries.geojson"
    )
      .then((res) => res.json())
      .then((data) => setCountriesData(data))
      .catch((err) => console.error("Erro ao carregar GeoJSON:", err));
  }, []);

  // --- Funções utilitárias
  function pointInRing(point: [number, number], ring: number[][]) {
    let x = point[0], y = point[1], inside = false;
    for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
      const xi = ring[i][0], yi = ring[i][1];
      const xj = ring[j][0], yj = ring[j][1];
      const intersect = yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi + Number.EPSILON) + xi;
      if (intersect) inside = !inside;
    }
    return inside;
  }

  function pointInPolygon(point: [number, number], polygonCoords: any) {
    if (!Array.isArray(polygonCoords)) return false;
    const outer = polygonCoords[0];
    if (!pointInRing(point, outer)) return false;
    for (let k = 1; k < polygonCoords.length; k++) {
      if (pointInRing(point, polygonCoords[k])) return false;
    }
    return true;
  }

  function pointInFeature(point: [number, number], feature: any) {
    const geom = feature.geometry;
    if (!geom) return false;
    if (geom.type === "Polygon") return pointInPolygon(point, geom.coordinates);
    if (geom.type === "MultiPolygon") {
      for (const poly of geom.coordinates) {
        if (pointInPolygon(point, poly)) return true;
      }
    }
    return false;
  }

  // --- Determina país com mais localizações e ajusta zoom
  useEffect(() => {
    if (!countriesData || locations.length === 0) return;

    const counts = new Map<string, { count: number; feature: any }>();

    locations.forEach((loc) => {
      const point: [number, number] = [loc.lng, loc.lat];
      let foundFeature: any = null;
      for (const feature of countriesData.features) {
        try {
          if (pointInFeature(point, feature)) {
            foundFeature = feature;
            break;
          }
        } catch {}
      }
      if (foundFeature) {
        const name =
          (foundFeature.properties?.ADMIN ||
            foundFeature.properties?.name ||
            foundFeature.properties?.NAME) + "";
        const key = name.toLowerCase();
        const prev = counts.get(key);
        if (prev) prev.count++;
        else counts.set(key, { count: 1, feature: foundFeature });
      }
    });

    let bestCountry = "";
    let bestData: { count: number; feature: any } | null = null;
    for (const [k, v] of counts.entries()) {
      if (!bestData || v.count > bestData.count) {
        bestData = v;
        bestCountry = k;
      }
    }

    if (bestData) {
      setMainCountryName(bestCountry);
      try {
        const geo = L.geoJSON(bestData.feature as any);
        const bounds = geo.getBounds();
        if (!bounds.isValid() || !mapRef.current) {
          centerOnLocations();
        } else {
          // Ajusta bounds do país com mais localizações
          mapRef.current.fitBounds(bounds.pad(0.2));
          // Remove limite de zoom máximo para países pequenos
        }
      } catch (e) {
        console.error("Erro ao ajustar bounds do país:", e);
        centerOnLocations();
      }
    } else {
      setMainCountryName("");
      centerOnLocations();
    }
  }, [countriesData, locations]);

  function centerOnLocations() {
    if (!mapRef.current || locations.length === 0) return;
    const bounds = L.latLngBounds(locations.map((l) => L.latLng(l.lat, l.lng)));
    if (bounds.isValid()) mapRef.current.fitBounds(bounds.pad(0.15));
    else mapRef.current.setView(initialCenter, initialZoom);
  }

  // --- Estilo dos países: apenas país principal visível, outros totalmente invisíveis
  const getCountryStyle = (feature: any) => {
    const name =
      (feature.properties?.ADMIN ||
        feature.properties?.name ||
        feature.properties?.NAME ||
        ""
      ).toLowerCase();
    if (name === mainCountryName) {
      return {
        fillColor: "#9ca3af",
        fillOpacity: 0.75,
        color: "#6b7280",
        weight: 1,
      };
    }
    return {
      fillColor: "transparent",
      fillOpacity: 0,
      color: "transparent",
      weight: 0,
    };
  };

  const MapComponent = (
    <MapContainer
      center={initialCenter}
      zoom={initialZoom}
      scrollWheelZoom={true}
      whenReady={() => {
        if (mapRef.current) return;
        const map = (mapRef.current = L.map(document.createElement("div")));
      }}
      className="w-full h-full rounded-2xl z-0"
      style={{ height: "100%", width: "100%", borderRadius: "1rem" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <FullscreenControl position="topright" />

      {countriesData && <GeoJSON data={countriesData} style={getCountryStyle} />}

      {locations.map((loc, idx) => (
        <Marker key={idx} position={[loc.lat, loc.lng]} icon={icon}>
          <Popup>{loc.info}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );

  if (!locations || locations.length === 0) {
    return (
      <div className="p-6 bg-white rounded-2xl shadow border border-slate-200 text-center h-[500px] flex items-center justify-center">
        <p className="text-slate-500">Nenhum imóvel encontrado.</p>
      </div>
    );
  }

  return (
    <>
      <div
        className="p-4 bg-white rounded-2xl shadow border border-slate-200 cursor-pointer transition hover:scale-[1.01]"
        onClick={() => setShowPopup(true)}
      >
        <div className="relative w-full h-[500px] overflow-hidden rounded-2xl">{MapComponent}</div>
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
              <div className="w-[98%] h-full rounded-xl overflow-hidden">{MapComponent}</div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
