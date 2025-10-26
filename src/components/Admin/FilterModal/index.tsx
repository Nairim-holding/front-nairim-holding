"use client";
import { FieldMeta } from "@/types/fieldMeta";
import { useState, useEffect } from "react";

interface FilterModalProps {
  visible: boolean;
  setVisible: (v: boolean) => void;
  fields?: FieldMeta[];
  title: string;
  onApply: (filters: Record<string, any>) => void;
  onClear: () => void;
}

export default function FilterModal({ visible, setVisible, fields, title, onApply, onClear }: FilterModalProps) {
  const [filters, setFilters] = useState<Record<string, any>>({});
  const [showOptions, setShowOptions] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (!visible) {
      // opcional: não limpar para manter valores
      // setFilters({});
    }
  }, [visible]);

  function handleChange(key: string, value: any) {
    setFilters(prev => ({ ...prev, [key]: value }));
  }

  function handleApply() {
    onApply(filters);
    // Não limpar filters: mantém o valor no input
  }

  function toggleOptions(key: string, show: boolean) {
    setShowOptions(prev => ({ ...prev, [key]: show }));
  }

  function filterOptions(field: FieldMeta) {
    return field.options ?? [];
  }

  return (
    <div className="bg-white filter-shadow rounded-xl p-5">
      <h2 className="text-lg font-semibold mb-2">Filtrar {title}</h2>
      <div className="grid grid-cols-4 gap-3 overflow-y-auto">
        {fields?.map(field => (
          <div key={field.key} className="flex flex-col gap-1 relative justify-end">
            <label className="text-sm font-medium text-[#656565]">{field.label}</label>

            {field.type !== "checkbox" && field.options && (
              <div>
                <input
                  type={field.type === "number" ? "number" : "text"}
                  value={filters[field.key] ?? ""}
                  onChange={e => handleChange(field.key, e.target.value)}
                  onFocus={() => toggleOptions(field.key, true)}
                  onBlur={() => setTimeout(() => toggleOptions(field.key, false), 150)}
                  className="border px-2 py-1 rounded w-full"
                />
                {showOptions[field.key] && filterOptions(field).length > 0 && (
                  <ul className="absolute z-50 bg-white border rounded shadow-md w-full max-h-40 overflow-auto mt-1">
                    {filterOptions(field).map((opt, index) => (
                      <li
                        key={`${field.key}-${opt.value}-${index}`}
                        onMouseDown={() => handleChange(field.key, opt.value)}
                        className="px-2 py-1 hover:bg-gray-100 cursor-pointer"
                      >
                        {opt.label}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}

            {field.type === "checkbox" && (
              <input
                type="checkbox"
                checked={!!filters[field.key]}
                onChange={e => handleChange(field.key, e.target.checked)}
                className="mt-2"
              />
            )}
          </div>
        ))}
      </div>

      <div className="flex justify-end gap-3 mt-5">
        <button
          onClick={onClear}
          className="border px-3 py-1.5 rounded-xl text-sm border-[#8B5CF6] text-[#6D28D9] drop-shadow-purple-soft"
        >
          Limpar Filtro
        </button>
        <button
          onClick={handleApply}
          className="flex justify-center gap-3 items-center max-w-[100px] w-full h-[40px] bg-gradient-to-r from-[#8B5CF6] to-[#6D28D9] rounded-xl text-[14px] font-normal text-[#fff] border border-[#8B5CF6] drop-shadow-purple-soft"
        >
          Filtrar
        </button>
      </div>
    </div>
  );
}
