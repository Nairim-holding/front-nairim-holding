'use client'
import React, { useState } from "react";
import IncrementDecrementButtons from "./IncrementDecrementButton";

interface InputProps {
    id: string;
    label: string;
    required?: boolean;
    type: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeHolder: string;
    svg?: React.ReactNode;
}

export default function Input({
    id,
    label,
    required,
    type,
    value,
    onChange,
    placeHolder,
    svg,
}: InputProps) {
    const [internalValue, setInternalValue] = useState<string>(value || "");

    const handleIncrement = () => {
        const newValue = (parseFloat(internalValue) || 0) + 1;
        setInternalValue(String(newValue));
        onChange?.({ target: { value: String(newValue) } } as React.ChangeEvent<HTMLInputElement>);
    };

    const handleDecrement = () => {
        const current = parseFloat(internalValue) || 1;
        const newValue = Math.max(current - 1, 1);
        setInternalValue(String(newValue));
        onChange?.({ target: { value: String(newValue) } } as React.ChangeEvent<HTMLInputElement>);
    };


    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputVal = e.target.value;
        const parsed = parseFloat(inputVal);

        if (parsed < 1 || inputVal.startsWith("0") || inputVal.startsWith("-")) return;
        setInternalValue(e.target.value);
        onChange?.(e);
    };

    return (
        <div className="flex flex-col font-poppins max-w-[250px] w-full">
            <label htmlFor={id} className="flex items-center gap-4 pl-2 mb-1 max-h-[20px]">
                {svg && svg}
                <p className="text-[#111111B2] text-[14px] font-normal">
                    {label}
                    {required && <span className="text-[#FF0000B2]">*</span>}
                </p>
            </label>

            <div className="relative flex items-center">
                {type === "number" && (
                    <IncrementDecrementButtons handleDecrement={handleDecrement} handleIncrement={handleIncrement}></IncrementDecrementButtons>
                )}

                <input
                    id={id}
                    name={id}
                    type={type}
                    value={type === "number" ? internalValue : value}
                    onChange={type === "number" ? handleInputChange : onChange}
                    placeholder={placeHolder}
                    required={required}
                    min={1}
                    className={`w-full border-2 border-[#CCCCCC] rounded-lg h-[40px] outline-none px-5 text-[#111111B2] text-[14px] font-normal placeholder-[#111111B2] no-spinner`}
                />
            </div>
        </div>
    );
}
