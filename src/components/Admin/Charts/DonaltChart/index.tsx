"use client";

import { useState, useRef } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { motion, AnimatePresence } from "framer-motion";

interface DonutChartProps {
  data: { name: string; value: number }[];
  colors?: string[];
  label?: string;
}

export default function DonutChart({
  data,
  colors = ["#f59e0b", "#6D28D9"],
  label,
}: DonutChartProps) {
  const [selected, setSelected] = useState<string | null>(null);
  const [selectedFullscreen, setSelectedFullscreen] = useState<string | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [rotation, setRotation] = useState(0);
  const startAngleRef = useRef<number | null>(null);

  const filteredData = data.filter(d => d.value > 0);
  const total = filteredData.reduce((acc, d) => acc + d.value, 0);

  const renderLabel = (
    { cx, cy, midAngle, innerRadius, outerRadius, index }: any,
    dataset: typeof filteredData
  ) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    const value = dataset[index]?.value;
    if (value == null) return null;

    return (
      <text
        x={x}
        y={y}
        fill="#383838"
        textAnchor="middle"
        dominantBaseline="central"
        fontSize={14}
        fontWeight="600"
        pointerEvents="none"
      >
        {Math.round(value)}
      </text>
    );
  };

  const renderCells = (dataset: typeof filteredData, selectedItem: string | null) =>
    dataset.map((entry) => (
      <Cell
        key={entry.name}
        fill={colors[filteredData.findIndex((d) => d.name === entry.name) % colors.length]}
        fillOpacity={selectedItem && entry.name !== selectedItem ? 0.3 : 1}
        cursor="pointer"
        strokeWidth={1}
      />
    ));

  const handleMouseDown = (e: React.MouseEvent) => {
    startAngleRef.current = e.clientX;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (startAngleRef.current !== null) {
      const diff = e.clientX - startAngleRef.current;
      setRotation((prev) => prev + diff);
      startAngleRef.current = e.clientX;
    }
  };

  const handleMouseUp = () => {
    startAngleRef.current = null;
  };

  return (
    <>
      <div
        onClick={() => {
          setIsFullscreen(true);
          setSelectedFullscreen(null);
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        className="bg-white rounded-lg p-4 border border-[#DDE1E6] shadow-chart w-full cursor-pointer hover:scale-[1.02] transition-transform flex flex-col justify-between"
      >
        {label && (
          <h2 className="text-lg font-semibold mb-2 text-[#21272A] text-start">
            {label}
          </h2>
        )}

        <div className="h-64 flex items-center justify-between gap-4">
          <ResponsiveContainer width="80%" height="100%">
            <PieChart>
              <Pie
                data={filteredData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={1}
                dataKey="value"
                labelLine={false}
                label={(props) => renderLabel(props, filteredData)}
                startAngle={rotation}
                endAngle={360 + rotation}
                onClick={(entry: any) => setSelected(entry.name)}
                strokeWidth={20}
                strokeLinejoin="round"
              >
                {renderCells(filteredData, selected)}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>

          <div className="flex flex-col gap-2 text-sm w-32">
            {filteredData.map((entry, index) => {
              const percentage = total ? Math.round((entry.value / total) * 100) : 0;
              return (
                <div
                  key={entry.name}
                  className={`flex items-center gap-2 cursor-pointer transition ${
                    selected === entry.name ? "font-bold text-[#6D28D9]" : "text-gray-700"
                  }`}
                  onClick={() =>
                    setSelected(selected === entry.name ? null : entry.name)
                  }
                >
                  <div
                    className="w-3 h-3 rounded-sm"
                    style={{ backgroundColor: colors[index % colors.length] }}
                  />
                  <span>{`${percentage}% ${entry.name}`}</span>
                </div>
              );
            })}
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
              className="bg-white rounded-2xl p-6 relative w-full max-w-4xl h-[90vh] flex flex-col"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
            >
              <button
                onClick={() => setIsFullscreen(false)}
                className="absolute top-3 right-3 p-2 rounded-full bg-slate-200 hover:bg-slate-300 transition"
              >
                ✕
              </button>

              <h2 className="text-xl font-semibold mb-3 text-slate-800 text-center">
                {label}
              </h2>

              <div className="flex flex-1 items-center justify-between gap-6">
                <div className="flex-1 h-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={filteredData}
                        cx="50%"
                        cy="50%"
                        innerRadius={90}
                        outerRadius={140}
                        paddingAngle={5}
                        dataKey="value"
                        labelLine={false}
                        label={(props) => renderLabel(props, filteredData)}
                        startAngle={rotation}
                        endAngle={360 + rotation}
                        onClick={(entry: any) =>
                          setSelectedFullscreen(entry.name)
                        }
                      >
                        {renderCells(filteredData, selectedFullscreen)}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                <div className="flex flex-col gap-3 text-base w-40">
                  {filteredData.map((entry, index) => {
                    const percentage = total ? Math.round((entry.value / total) * 100) : 0;
                    return (
                      <div
                        key={entry.name}
                        className={`flex items-center gap-2 cursor-pointer transition ${
                          selectedFullscreen === entry.name
                            ? "font-bold text-[#6D28D9]"
                            : "text-gray-700"
                        }`}
                        onClick={() =>
                          setSelectedFullscreen(
                            selectedFullscreen === entry.name ? null : entry.name
                          )
                        }
                      >
                        <div
                          className="w-4 h-4 rounded-sm"
                          style={{ backgroundColor: colors[index % colors.length] }}
                        />
                        <span>{`${entry.name} ${percentage}%`}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
