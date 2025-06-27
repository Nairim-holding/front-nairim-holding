'use client'
import React, { useEffect, useRef } from "react";
import IncrementDecrementButtons from "./IncrementDecrementButton";
import Label from "../Label";
import { maskCEP, maskCNPJ, maskCPF, maskMoney, maskPhone, maskSquareMeters } from "@/utils/masks";

interface InputProps {
  id: string;
  label: string;
  required?: boolean;
  type: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeHolder?: string;
  svg?: React.ReactNode;
  disabled?: boolean;
  tabIndex?: number;
  mask?: string;
  autoFocus?: boolean;
}

const applyMask = (type: string, value: string): string => {
  switch (type) {
    case "cpf":
      return maskCPF(value);
    case "cnpj":
      return maskCNPJ(value);
    case "cep":
      return maskCEP(value);
    case "telefone":
      return maskPhone(value);
    case "money":
      return maskMoney(value);
    case "metros2":
      return maskSquareMeters(value);
    default:
      return value;
  }
};

export default function Input({
  id,
  label,
  required,
  type,
  value,
  onChange,
  placeHolder,
  svg,
  disabled,
  tabIndex,
  mask,
  autoFocus
}: InputProps) {
  const handleIncrement = () => {
    const newValue = (parseFloat(value || "0") || 0) + 1;
    onChange?.({ target: { value: String(newValue) } } as React.ChangeEvent<HTMLInputElement>);
  };

  const handleDecrement = () => {
    const current = parseFloat(value || "1") || 1;
    const newValue = Math.max(current - 1, 1);
    onChange?.({ target: { value: String(newValue) } } as React.ChangeEvent<HTMLInputElement>);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;
    const maskedValue = mask ? applyMask(mask, rawValue) : rawValue;
    onChange?.({ target: { value: maskedValue } } as React.ChangeEvent<HTMLInputElement>);
  };

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);
  return (
    <div className="flex flex-col font-poppins max-w-[250px] w-full">
      <Label id={id} label={label} required={required} svg={svg}></Label>

      <div className="relative flex items-center">
        {type === "number" && (
          <IncrementDecrementButtons
            handleDecrement={handleDecrement}
            handleIncrement={handleIncrement}
          />
        )}

        <input
          id={id}
          ref={inputRef}
          name={id}
          type={type}
          value={value}
          onChange={mask || type === "number" ? handleInputChange : onChange}
          placeholder={placeHolder}
          required={required}
          min={1}
          disabled={disabled}
          tabIndex={tabIndex}
          className={`
            w-full
            border
            rounded-lg
            h-[40px]
            outline-none
            px-5
            text-[14px]
            font-normal
            no-spinner
            border-[#CCCCCC]
            text-[#111111B2]
            placeholder-[#CCC]
            ${disabled && 'bg-[#EDEDED] cursor-not-allowed'}
          `}
        />
      </div>
    </div>
  );
}
