// components/Admin/Charts/DonutChart.tsx

"use client";

import { useState } from "react";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { motion, AnimatePresence } from "framer-motion";
import { MetricDataItem } from "@/types/dashboard";
import DataModal from "../DataModal";

interface DonutChartProps {
  data: Array<{
    name: string;
    value: number;
    data?: MetricDataItem[];
  }>;
  label: string;
  loading?: boolean;
  colors?: string[];
}



export default function DonutChart({ data, colors, label, loading = false }: DonutChartProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedData, setSelectedData] = useState<MetricDataItem[]>([]);
  const [modalTitle, setModalTitle] = useState("");
  const COLORS = colors && colors.length > 0
    ? colors
    : ["#9E75FB", "#FF5555", "#FFBB28", "#FF8042", "#8884D8", "#82ca9d"];
  // Skeleton loading state
  if (loading) {
    return (
      <div className="bg-white rounded-lg p-4 border border-[#DDE1E6] shadow-chart w-full cursor-pointer transition-transform flex flex-col justify-between animate-pulse"
        style={{ minHeight: 200 }}
      >
        {label && (
          <div className="h-5 bg-gray-200 rounded w-2/5 mb-2"></div>
        )}
        <div className="relative flex-1 w-full" style={{ minHeight: 200 }}>
          <div className="h-full w-full bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  const total = data.reduce((acc, item) => acc + item.value, 0);

  // Função para abrir modal com dados específicos
  const handleDataClick = (item: any) => {
    if (item.data && item.data.length > 0) {
      setSelectedData(item.data);
      setModalTitle(`${label} - ${item.name}`);
      setIsModalOpen(true);
    }
  };

  // Função para abrir modal com todos os dados
  const handleOpenAllData = () => {
    const allData = data.flatMap(item => item.data || []);
    if (allData.length > 0) {
      setSelectedData(allData);
      setModalTitle(`${label} - Todos os Itens`);
      setIsModalOpen(true);
    }
  };

  // Função para abrir detalhes a partir do fullscreen
  const handleFullscreenDetails = () => {
    setIsFullscreen(false);
    // Pequeno delay para garantir que a animação de fechamento aconteça
    setTimeout(() => {
      handleOpenAllData();
    }, 300);
  };

  const renderCustomizedLabel = ({
    cx, cy, midAngle, innerRadius, outerRadius, percent
  }: any) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * Math.PI / 180);
    const y = cy + radius * Math.sin(-midAngle * Math.PI / 180);

    return (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  // Custom Tooltip
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const item = payload[0].payload;
      return (
        <div 
          className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg"
          onClick={(e) => {
            e.stopPropagation();
            handleDataClick(item);
          }}
        >
          <p className="font-medium">{item.name}</p>
          <p className="text-sm text-gray-600">
            {item.value} ({((item.value / total) * 100).toFixed(1)}%)
          </p>
          {item.data && item.data.length > 0 && (
            <p className="text-xs text-blue-600 mt-1 cursor-pointer hover:underline">
              Clique para ver {item.data.length} itens
            </p>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="h-full">
      <div
        onClick={() => setIsFullscreen(true)}
        className="bg-white rounded-lg p-4 border border-[#DDE1E6] shadow-chart w-full cursor-pointer hover:scale-[1.02] transition-transform flex flex-col justify-between h-full"
      >
        {/* Header com ícone de detalhes */}
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-semibold text-[#21272A] text-start">
            {label}
          </h3>
          
          {/* Ícone de detalhes se algum item tiver dados */}
          {data.some(item => item.data && item.data.length > 0) && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleOpenAllData();
              }}
              className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition"
              title="Ver detalhes"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14,2 14,8 20,8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
                <polyline points="10,9 9,9 8,9" />
              </svg>
            </button>
          )}
        </div>

        <div className="relative flex-1 w-full" style={{ minHeight: 200 }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                onClick={handleDataClick}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Modal de detalhes para o gráfico */}
      <DataModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={modalTitle}
        data={selectedData}
      />

      {/* Modal fullscreen */}
      <AnimatePresence>
        {isFullscreen && (
          <motion.div
            className="fixed inset-0 bg-black/70 z-50 flex justify-center items-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-2xl p-6 relative w-full max-w-4xl h-[90vh] flex flex-col"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <button
                onClick={() => setIsFullscreen(false)}
                className="absolute top-3 right-3 p-2 rounded-full bg-slate-200 hover:bg-slate-300 transition"
              >
                ✕
              </button>

              {label && (
                <h3 className="text-xl font-semibold mb-3 text-[#21272A] text-center">
                  {label}
                </h3>
              )}

              <div className="relative flex-1 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={data}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={renderCustomizedLabel}
                      outerRadius={150}
                      fill="#8884d8"
                      dataKey="value"
                      onClick={handleDataClick}
                    >
                      {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              {/* Botão para ver detalhes no fullscreen */}
              {data.some(item => item.data && item.data.length > 0) && (
                <div className="flex justify-center mt-4">
                  <button
                    onClick={handleFullscreenDetails}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                  >
                    Ver Detalhes
                  </button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}