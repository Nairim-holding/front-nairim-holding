'use client'
import React, { useRef } from 'react';
import Label from '../Label';

interface InputFileProps{
  label: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  accept?: string;
  id: string;
  required?: boolean;
  svg?: React.ReactNode;
  textButton?: string;
}

export default function InputFile({textButton="Escolher arquivos" ,label ,onChange,accept, id, required, svg}: InputFileProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="w-full">
        <Label id={id} label={label} required={required} svg={svg}></Label>
        <div className="flex flex-col items-start w-full p-5 border-2 border-dashed border-[#CCCCCC] rounded-lg">
            <button
                type="button"
                onClick={handleButtonClick}
                className="flex justify-center items-center max-w-[200px] px-5 w-full h-[45px] bg-[#F0F0F0] rounded-lg text-[16px] font-medium text-[#666666] border border-[#E0E0E0] drop-shadow-custom-black"
            >
                {textButton}
            </button>
            <input
                type="file"
                ref={fileInputRef}
                onChange={onChange}
                accept={accept}
                className="hidden"
            />
        </div>
    </div>
  );
}
