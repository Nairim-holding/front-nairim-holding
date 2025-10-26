"use client";

import { useEffect } from "react";
import CountUp from "react-countup";
import { ResponsiveContainer, LineChart, Line } from "recharts";

interface NumericCardProps {
  value: string | number;
  label: string;
  data?: { value: number }[]; 
  color?: string;
  variation?: any;
  positive?: boolean | string;
}

export default function NumericCard({ value, label, data, color = "#16a34a", variation, positive }: NumericCardProps) {
  const numericValue = Number(value);
  const isNumeric = !isNaN(numericValue);
  return (
    <div className="p-4 bg-white rounded-lg shadow-chart border border-[#DDE1E6] flex flex-col justify-start items-start relative">
      <div className="text-sm">
          <h3 className="text-lg text-[#697077] mb-2 text-start">
            {label}
          </h3>
      </div>
      {
      <div className="absolute bg-[#EBEBEB] rounded-xl px-1 shadow-chart w-[70px] h-[25px] flex items-center justify-center gap-2 right-[100px] top-[50px]">
      <p className="text-[#525252] font-roboto">{Math.round(Number(variation) / 100) + '%'}</p>
        {
          positive == true ? (
            <svg width="12" height="9" viewBox="0 0 12 9" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0.583668 8.7344H11.0837C11.19 8.73406 11.2942 8.70474 11.3851 8.64959C11.4759 8.59444 11.5501 8.51555 11.5994 8.42141C11.6488 8.32726 11.6716 8.22144 11.6653 8.11531C11.659 8.00919 11.6239 7.9068 11.5638 7.81915L6.31375 0.235812C6.09617 -0.0786042 5.57233 -0.0786042 5.35417 0.235812L0.104168 7.81915C0.0433992 7.90661 0.00776293 8.00906 0.00113104 8.11536C-0.00550085 8.22166 0.0171253 8.32774 0.0665511 8.42208C0.115977 8.51643 0.190312 8.59542 0.28148 8.65048C0.372649 8.70554 0.477163 8.73456 0.583668 8.7344Z" fill="#00C30D"/>
            </svg>
          ) : positive == false ? (
            <svg width="12" height="9" viewBox="0 0 12 9" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0.583668 -2.00272e-05H11.0837C11.19 0.000312805 11.2942 0.0296335 11.3851 0.0847836C11.4759 0.139935 11.5501 0.218826 11.5994 0.312968C11.6488 0.407111 11.6716 0.512939 11.6653 0.619061C11.659 0.725183 11.6239 0.82758 11.5638 0.91523L6.31375 8.49856C6.09617 8.81298 5.57233 8.81298 5.35417 8.49856L0.104168 0.91523C0.0433992 0.827763 0.00776293 0.725314 0.00113104 0.619016C-0.00550085 0.512717 0.0171253 0.406634 0.0665511 0.312292C0.115977 0.21795 0.190312 0.138957 0.28148 0.0838957C0.372649 0.0288353 0.477163 -0.000187874 0.583668 -2.00272e-05Z" fill="#B70000"/>
            </svg>
          ) : positive == 'equal' && (
            <svg width="18" height="2" viewBox="0 0 18 2" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M0 1C0 0.734784 0.105357 0.48043 0.292893 0.292893C0.48043 0.105357 0.734784 0 1 0H17C17.2652 0 17.5196 0.105357 17.7071 0.292893C17.8946 0.48043 18 0.734784 18 1C18 1.26522 17.8946 1.51957 17.7071 1.70711C17.5196 1.89464 17.2652 2 17 2H1C0.734784 2 0.48043 1.89464 0.292893 1.70711C0.105357 1.51957 0 1.26522 0 1Z" fill="#525252"/>
            </svg>
          )
        }
      </div>
      }
      <div className="text-2xl font-bold text-[#21272A]" >
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
        <div className="mt-2 h-12 text-[#21272A]">
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
