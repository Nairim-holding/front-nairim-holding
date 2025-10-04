// types/lease.ts
import Tenant from "./tenant";

export interface Lease {
  id: number;
  property_id: number;

  property?: {
    id: number;
    title?: string;
    type?: {
      id: number;
      description: string;
    };
  };
  owner?: {
    id: number;
    name: string;
  };
  tenant?: Tenant;

  start_date: string;
  end_date: string;
  status: "EXPIRED" | "EXPIRING" | "UP_TO_DATE";

  rent_amount: number;       // Aluguel
  condo_fee?: number;        // Condomínio
  property_tax?: number;     // IPTU
  extra_charges?: number;    // Taxas extras

  agency_commission?: string; // Percentual (ex: "10%")
  commission_amount?: number; // Valor da comissão

  rent_due_date?: string;
  tax_due_date?: string;
  condo_due_date?: string;

  contract_number?: number;

  created_at?: string;
  updated_at?: string;
}
