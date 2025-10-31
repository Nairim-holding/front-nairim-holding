"use client";

import { useState } from "react";
import { ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { motion, AnimatePresence } from "framer-motion";

interface GaugeCardProps {
  value: number;
  max?: number;
  label?: string;
  color?: string;
  loading?: boolean;
}

export default function GaugeCard({
  value,
  max = 100,
  label,
  color = "#16a34a",
  loading = false,
}: GaugeCardProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);

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

  const percentage = Math.min(Math.max(value / max, 0), 1) * 100;

  const data = [
    { name: "Filled", value: percentage },
    { name: "Remaining", value: 100 - percentage },
  ];

  return (
    <>
      <div
        onClick={() => setIsFullscreen(true)}
        className="bg-white rounded-lg p-4 border border-[#DDE1E6] shadow-chart w-full cursor-pointer hover:scale-[1.02] transition-transform flex flex-col justify-between"
        style={{ minHeight: 200 }}
      >
        {label && (
          <h3 className="text-lg font-semibold mb-2 text-[#21272A] text-start">
            {label}
          </h3>
        )}

        <div className="relative flex-1 w-full" style={{ minHeight: 200 }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                startAngle={180}
                endAngle={0}
                innerRadius="60%"
                outerRadius="100%"
                dataKey="value"
                stroke="none"
                label={({ cx, cy }) => (
                  <text
                    x={cx}
                    y={cy}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fontSize={24}
                    color="#21272A"
                  >
                    {`${Math.round(percentage)}%`}
                  </text>
                )}
              >
                {data.map((entry, index) => (
                  <Cell key={index} fill={index === 0 ? color : "#e5e7eb"} />
                ))}
              </Pie>
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
                <h3 className="text-xl font-semibold mb-3 text-[#21272A] text-center">
                  {label}
                </h3>
              )}

              <div className="relative h-full w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={data}
                      startAngle={180}
                      endAngle={0}
                      innerRadius="70%"
                      outerRadius="100%"
                      dataKey="value"
                      stroke="none"
                      label={({ cx, cy }) => (
                        <text
                          x={cx}
                          y={cy}
                          textAnchor="middle"
                          dominantBaseline="middle"
                          fontSize={36}
                          fontWeight="700"
                          fill={'#21272A'}
                        >
                          {`${Math.round(percentage)}%`}
                        </text>
                      )}
                    >
                      {data.map((entry, index) => (
                        <Cell
                          key={index}
                          fill={index === 0 ? color : "#e5e7eb"}
                        />
                      ))}
                    </Pie>
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