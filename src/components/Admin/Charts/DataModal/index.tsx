"use client";

import { motion, AnimatePresence } from "framer-motion";
import { MetricDataItem } from "@/types/dashboard";

interface DataModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  data: MetricDataItem[];
  columns?: string[];
}

export default function DataModal({ isOpen, onClose, title, data, columns }: DataModalProps) {
  const availableColumns = columns || (data.length > 0 ? Object.keys(data[0]) : []);
  
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/70 z-50 flex justify-center items-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white rounded-2xl p-6 relative w-full max-w-6xl h-[90vh] flex flex-col"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-[#21272A]">
                {title} - Detalhes ({data.length} itens)
              </h3>
              <button
                onClick={onClose}
                className="p-2 rounded-full bg-slate-200 hover:bg-slate-300 transition"
              >
                ✕
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-auto">
              {data.length === 0 ? (
                <div className="flex justify-center items-center h-full text-gray-500">
                  Nenhum dado disponível
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50 sticky top-0">
                      <tr>
                        {availableColumns.map((column) => (
                          <th
                            key={column}
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            {formatColumnName(column)}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {data.map((item, index) => (
                        <tr key={item.id || index} className="hover:bg-gray-50">
                          {availableColumns.map((column) => (
                            <td
                              key={column}
                              className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                            >
                              {formatCellValue(item[column], column)}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-200">
              <span className="text-sm text-gray-500">
                Total: {data.length} registros
              </span>
              <button
                onClick={onClose}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Fechar
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function formatColumnName(column: string): string {
  const columnMap: { [key: string]: string } = {
    id: "ID",
    title: "Título",
    name: "Nome",
    email: "E-mail",
    type: "Tipo",
    rentalValue: "Valor Aluguel",
    saleValue: "Valor Venda",
    purchaseValue: "Valor Aquisição",
    propertyTax: "IPTU",
    condoFee: "Condomínio",
    totalTaxAndCondo: "Total de Taxas e Condomínio",
    areaTotal: "Área Total",
    documentCount: "Qtd. Documentos",
    status: "Status",
    currentStatus: "Status",
    createdAt: "Data Criação",
    tradeName: "Nome Fantasia",
    legalName: "Razão Social",
    agency: "Imobiliária",
    propertiesCount: "Qtd. Propriedades",
    documents: "Documentos",
    agencyName: "Nome da Imobiliária",
    totalValue: "Valor Total",
    monthlyCost: "Custo Mensal"
  };
  
  return columnMap[column] || column.charAt(0).toUpperCase() + column.slice(1);
}

// Função para formatar valores das células
function formatCellValue(value: any, column?: string): string {
  if (value === null || value === undefined) return "-";
  
  // CORREÇÃO 1: Formatar objeto da imobiliária
  if (column === 'agency' && typeof value === 'object') {
    if (value.tradeName) return value.tradeName;
    if (value.legalName) return value.legalName;
    if (value.name) return value.name;
    if (value.id) return `Imobiliária ${value.id}`;
    return "-";
  }

  // CORREÇÃO 2: Formatar objetos de agência em outras colunas
  if ((column === 'tradeName' || column === 'legalName' || column === 'agencyName') && typeof value === 'object') {
    if (value.tradeName) return value.tradeName;
    if (value.legalName) return value.legalName;
    if (value.name) return value.name;
    return "-";
  }
  
  // CORREÇÃO 3: Traduzir status
  if ((column === 'status' || column === 'currentStatus') && typeof value === 'string') {
    const statusMap: { [key: string]: string } = {
      'AVAILABLE': 'Disponível',
      'RENTED': 'Ocupado',
      'OCCUPIED': 'Ocupado',
      'SOLD': 'Vendido',
      'MAINTENANCE': 'Em Manutenção',
      'UNAVAILABLE': 'Indisponível',
      'available': 'Disponível',
      'rented': 'Ocupado',
      'occupied': 'Ocupado',
      'sold': 'Vendido',
      'maintenance': 'Em Manutenção',
      'unavailable': 'Indisponível'
    };
    return statusMap[value] || value;
  }
  
  if (typeof value === "number") {
    // CORREÇÃO 4: Formatar valores monetários para todas as colunas de valor
    const moneyColumns = [
      'rentalValue', 'saleValue', 'purchaseValue', 'propertyTax', 
      'condoFee', 'totalTaxAndCondo', 'totalValue', 'monthlyCost'
    ];
    
    if (moneyColumns.includes(column || '')) {
      return `R$ ${value.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    }
    
    // Para outros números, formata normalmente
    return value.toLocaleString("pt-BR");
  }
  
  if (typeof value === "string") {
    // Verifica se é uma data
    if (value.match(/^\d{4}-\d{2}-\d{2}/)) {
      try {
        return new Date(value).toLocaleDateString("pt-BR");
      } catch {
        return value;
      }
    }
    return value;
  }
  
  if (typeof value === "boolean") {
    return value ? "Sim" : "Não";
  }
  
  if (typeof value === "object") {
    // Para arrays (como documentos)
    if (Array.isArray(value)) {
      if (value.length === 0) return "Nenhum";
      return `${value.length} item(ns)`;
    }
    
    // Para outros objetos, tenta extrair informações úteis
    if (value.tradeName || value.legalName) {
      return value.tradeName || value.legalName;
    }
    if (value.name || value.title) {
      return value.name || value.title;
    }
    if (value.id) {
      return `ID: ${value.id}`;
    }
    
    // Se não conseguir extrair nada útil, mostra como string
    try {
      return JSON.stringify(value);
    } catch {
      return "[Objeto]";
    }
  }
  
  return String(value);
}