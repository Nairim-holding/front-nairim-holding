"use client";

import { useState, useRef } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
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
  const [selectedFullscreen, setSelectedFullscreen] = useState<string | null>(
    null
  );
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [rotation, setRotation] = useState(0);
  const startAngleRef = useRef<number | null>(null);

  const renderLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, index }: any, dataset: typeof data) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor="middle"
        dominantBaseline="central"
        fontSize={14}
        fontWeight="600"
        pointerEvents="none"
      >
        {dataset[index]?.value ?? ""}
      </text>
    );
  };

  const renderCells = (dataset: typeof data, selectedItem: string | null) =>
    dataset.map((entry) => (
      <Cell
        key={entry.name}
        fill={colors[data.findIndex((d) => d.name === entry.name) % colors.length]}
        fillOpacity={selectedItem && entry.name !== selectedItem ? 0.3 : 1}
        cursor="pointer"
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
        className="bg-white dark:bg-slate-800 rounded-2xl p-4 shadow-md cursor-pointer hover:scale-[1.02] transition-transform select-none"
      >
        {label && (
          <h2 className="text-lg font-semibold mb-3 text-slate-700 dark:text-slate-100 text-center">
            {label}
          </h2>
        )}
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={5}
                dataKey="value"
                labelLine={false}
                label={(props) => renderLabel(props, data)}
                startAngle={rotation}
                endAngle={360 + rotation}
                onClick={(entry: any) => setSelected(entry.name)}
              >
                {renderCells(data, selected)}
              </Pie>
              <Tooltip />
              <Legend
                onClick={(e: any) =>
                  setSelected(selected === e?.value ? null : e?.value ?? null)
                }
                wrapperStyle={{ cursor: "pointer" }}
              />
            </PieChart>
          </ResponsiveContainer>
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
              className="bg-white dark:bg-slate-800 rounded-2xl p-6 relative w-full max-w-4xl h-[90vh]"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
            >
              <button
                onClick={() => setIsFullscreen(false)}
                className="absolute top-3 right-3 p-2 rounded-full bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 transition"
              >
                ✕
              </button>

              <h2 className="text-xl font-semibold mb-3 text-slate-800 dark:text-slate-100 text-center">
                {label}
              </h2>

              <div className="relative h-full w-full">
                {selectedFullscreen && (
                  <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
                    <span className="text-4xl font-bold text-slate-800 dark:text-slate-100">
                      {data.find((d) => d.name === selectedFullscreen)?.value ?? ""}
                    </span>
                  </div>
                )}
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={data}
                      cx="50%"
                      cy="50%"
                      innerRadius={100}
                      outerRadius={150}
                      paddingAngle={5}
                      dataKey="value"
                      labelLine={false}
                      label={(props) => renderLabel(props, data)}
                      startAngle={rotation}
                      endAngle={360 + rotation}
                      onClick={(entry: any) => setSelectedFullscreen(entry.name)}
                    >
                      {renderCells(data, selectedFullscreen)}
                    </Pie>
                    <Tooltip />
                    <Legend
                      onClick={(e: any) =>
                        setSelectedFullscreen(
                          selectedFullscreen === e?.value ? null : e?.value ?? null
                        )
                      }
                        wrapperStyle={{
                            cursor: "pointer",
                            position: "absolute",
                            bottom: 20,  
                            left: "50%",
                            transform: "translateX(-50%)",
                            textAlign: "center",
                        }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
