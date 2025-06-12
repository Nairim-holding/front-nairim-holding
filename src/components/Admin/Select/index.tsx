'use client'
import React, { useState, useEffect, useRef } from 'react';
import Label from '../Label';

interface Option {
  value: string;
  label: string;
}

interface CustomSelectProps {
  options: Option[];
  defaultValue?: string;
  onChange?: (selectedValue: string) => void; 
  id: string;
  label: string;
  required?: boolean;
  svg?: React.ReactNode;
}

export default function Select({ options, defaultValue, onChange, label, required, svg, id }: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState<string>(defaultValue || options[0]?.value || '');
  const [selectedLabel, setSelectedLabel] = useState<string>(
    defaultValue ? options.find(opt => opt.value === defaultValue)?.label || '' : options[0]?.label || ''
  );

  const selectRef = useRef<HTMLSelectElement>(null); 
  const customSelectRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => { 
      if (customSelectRef.current && !customSelectRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleOptionClick = (option: Option) => {
    setSelectedValue(option.value);
    setSelectedLabel(option.label);
    setIsOpen(false);
    if (onChange) {
      onChange(option.value);
    }

    if (selectRef.current) {
      selectRef.current.value = option.value;
    }
  };

  const toggleSelect = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative font-poppins max-w-[250px] w-full" ref={customSelectRef}>
      <select
        ref={selectRef}
        className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer z-10 hidden"
        value={selectedValue}
        onChange={(e) => handleOptionClick(options.find(opt => opt.value === e.target.value) as Option)}
        aria-hidden="true"
        name={id}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      <Label id={id} label={label} required={required} svg={svg}></Label>
      <div
        className="bg-white border border-[#CCCCCC] rounded-lg py-2 px-4 flex justify-between items-center cursor-pointer relative text-[14px] text-[#111111B2] h-[40px]"
        onClick={toggleSelect}
      >
        <span>{selectedLabel}</span>
        <svg
          className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
        </svg>
      </div>

      {isOpen && (
        <ul className="absolute z-20 w-full bg-white border border-[#CCCCCC] rounded-lg mt-1 shadow-lg max-h-60 overflow-y-auto text-[14px] text-[#111111B2]">
          {options.map((option) => (
            <li
              key={option.value}
              className={`py-2 px-4 cursor-pointer ${
                selectedValue === option.value ? 'bg-[#EDEDED] font-semibold' : ''
              }`}
              onClick={() => handleOptionClick(option)}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}