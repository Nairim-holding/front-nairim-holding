"use client";

import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { motion, AnimatePresence } from "framer-motion";

interface HorizontalBarChartProps {
  data: { name: string; value: number }[];
  colors?: string[];
  label?: string;
}

export default function HorizontalBarChart({
  data,
  colors = ["#16a34a", "#3b82f6", "#f59e0b", "#ef4444"],
  label,
}: HorizontalBarChartProps) {
  const [selectedFullscreen, setSelectedFullscreen] = useState<string | null>(
    null
  );
  const [isFullscreen, setIsFullscreen] = useState(false);

  const renderCells = (dataset: typeof data, selectedItem: string | null) =>
    dataset.map((entry) => (
      <Cell
        key={entry.name}
        fill={colors[data.findIndex((d) => d.name === entry.name) % colors.length]}
        fillOpacity={selectedItem && entry.name !== selectedItem ? 0.3 : 1}
        cursor="pointer"
        onClick={() =>
          setSelectedFullscreen(
            selectedFullscreen === entry.name ? null : entry.name
          )
        }
      />
    ));

  const total = data.reduce((acc, d) => acc + d.value, 0);

  return (
    <>
      <div
        onClick={() => setIsFullscreen(true)}
        className="bg-white rounded-2xl p-4 shadow-md cursor-pointer hover:scale-[1.02] transition-transform select-none"
      >
        {label && (
          <h2 className="text-lg font-semibold mb-3 text-slate-700 text-center">
            {label}
          </h2>
        )}
        <div className="h-64 relative">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              layout="vertical"
              data={data}
              margin={{ top: 20, right: 20, bottom: 40, left: 80 }}
              barCategoryGap={10}
            >
              <XAxis
                type="number"
                domain={[0, 'dataMax']}
                allowDecimals={false}
                tick={{ fontSize: 12 }}
                axisLine={{ stroke: '#cbd5e1' }}
                tickLine={false}
                />
              <YAxis dataKey="name" type="category" width={120} />
              <Tooltip />
              <Bar dataKey="value" barSize={40} label={{ position: "insideRight" }}>
                {renderCells(data, selectedFullscreen)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 text-center font-bold text-slate-700">
            Total: {total}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isFullscreen && (
          <motion.div
            className="fixed inset-0 bg-black/70 z-50 flex justify-center items-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-2xl p-6 relative w-full max-w-4xl h-[90vh]"
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
                <h2 className="text-xl font-semibold mb-3 text-slate-800 text-center">
                  {label}
                </h2>
              )}

              <div className="relative h-full w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    layout="vertical"
                    data={data}
                    margin={{ top: 20, right: 20, bottom: 40, left: 80 }}
                    barCategoryGap={15}
                  >
                    <XAxis
                    type="number"
                    domain={[0, 'dataMax']}
                    allowDecimals={false}
                    tick={{ fontSize: 12 }}
                    axisLine={{ stroke: '#cbd5e1' }}
                    tickLine={false}
                    />
                    <YAxis dataKey="name" type="category" width={120} />
                    <Tooltip />
                    <Bar
                      dataKey="value"
                      barSize={50}
                      label={{ position: "insideRight" }}
                    >
                      {renderCells(data, selectedFullscreen)}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
                <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 text-center font-bold text-slate-800">
                  Total: {total}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
