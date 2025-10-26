"use client";
import React, { useState, useEffect, useRef } from 'react';
import Label from '../Label';
import { Option, SelectProps } from './type';
import IconArrowDown from '@/components/Icons/IconArrowDown';

export default function Select({ options, defaultValue, onChange, label, required, svg, id, tabIndex, disabled, ...props }: SelectProps) {
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

  useEffect(() => {
  if (defaultValue) {
    setSelectedValue(defaultValue);
    const foundLabel = options.find(opt => opt.value === defaultValue)?.label || options[0]?.label || '';
    setSelectedLabel(foundLabel);
  }
}, [defaultValue, options]);

  return (
    <div className="relative font-poppins max-w-[250px] w-full" ref={customSelectRef}>
      <select
        ref={selectRef}
        className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer z-10 hidden"
        value={selectedValue}
        onChange={(e) => handleOptionClick(options.find(opt => opt.value === e.target.value) as Option)}
        aria-hidden="true"
        tabIndex={tabIndex}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      <Label id={id} label={label} required={required} svg={svg}></Label>
      <div
        className={`${disabled ? 'bg-[#EDEDED] cursor-not-allowed' : 'bg-white border border-[#CCCCCC] cursor-pointer'} rounded-lg py-2 px-4 flex justify-between items-center relative text-[14px] text-[#111111B2] h-[40px]`}
        onClick={!disabled ? toggleSelect : () => null}
        tabIndex={tabIndex}
      >
        <span>{selectedLabel}</span>
        <IconArrowDown size={13} color="#666"></IconArrowDown>
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