"use client";

import CountUp from "react-countup";
import { ResponsiveContainer, LineChart, Line } from "recharts";

interface NumericCardProps {
  value: string | number;
  label: string;
  data?: { value: number }[]; 
  color?: string;
}

export default function NumericCard({ value, label, data, color = "#16a34a" }: NumericCardProps) {
  const numericValue = Number(value);
  const isNumeric = !isNaN(numericValue);

  return (
    <div className="p-4 bg-white dark:bg-slate-800 rounded-2xl shadow border border-slate-200 dark:border-slate-700 flex flex-col justify-center items-center text-center">
      <div className="text-sm text-slate-500 dark:text-slate-400">
          <h3 className="text-lg font-semibold mb-2 text-slate-700 dark:text-slate-100 text-center">
            {label}
          </h3>
      </div>
      <div className="text-3xl font-bold text-[#6D28D9]">
        {isNumeric ? (
          <CountUp 
            end={numericValue} 
            duration={3} 
            decimal="2"
            separator="," 
          />
        ) : (
          value
        )}
      </div>
      {data && data.length > 0 && (
        <div className="mt-2 h-12 text-[#6D28D9]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <Line type="monotone" dataKey="value" stroke={color} strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}
