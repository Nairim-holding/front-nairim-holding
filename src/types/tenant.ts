import Address from "./address";
import Contact from "./contact";

export default interface Tenant {
  id: number;
  addresses: [{ address: Address }];
  contacts: [{ contact: Contact }];
  cnpj: string;
  cpf: string;
  internal_code: number;
  marital_status: string;
  municipal_registration: number;
  name: string;
  occupation: string;
  state_registration: number;
}