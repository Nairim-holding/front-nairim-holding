import Address from "./address";
import Contact from "./contact";

export default interface Agency{
  id: number;
  trade_name: string;
  legal_name: string;
  cnpj: string;
  state_registration: number;
  municipal_registration: number;
  license_number: string;
  addresses?: [{address: Address}];
  contacts?: [{contact: Contact}];
  created_at: string; 
  updated_at: string; 
}