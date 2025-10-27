import { Owner } from "framer-motion";
import Property from "./property";
import Tenant from "./tenant";
import Agency from "./agency";

export default interface MetricResponse {
  averageRentalTicket?: { result: number; variation: number; isPositive?: boolean };
  totalRentalActive?: { result: number; variation: number; isPositive?: boolean };
  totalPropertyTaxAndCondoFee?: { result: number; variation: number; isPositive?: boolean };
  totalAcquisitionValue?: { result: number; variation: number; isPositive?: boolean };
  financialVacancyRate?: { result: number; variation?: number };
  vacancyInMonths?: { result: number; variation: number; isPositive?: boolean };
  totalPropertys?: { result: number; variation: number; isPositive?: boolean };
  countPropertiesWithLessThan3Docs?: { result: number; variation: number; isPositive?: boolean };
  totalPropertiesWithSaleValue?: { result: number; variation: number; isPositive?: boolean };
  availablePropertiesByType?: Array<{ name: string; value: number }>;
  availablePropertiesByTypeLabels?: any;
  ownersTotal?: { result: number; variation: number; isPositive?: boolean };
  tenantsTotal?: { result: number; variation: number; isPositive?: boolean };
  propertiesPerOwner?: { result: number; variation: number; isPositive?: boolean };
  agenciesTotal?: { result: number; variation: number; isPositive?: boolean };
  propertiesByAgency?: Array<{ name: string; value: number }>;
  properties?: Property[];
  owners?: Owner[];
  tenants?: Tenant[];
  agencies?: Agency[];
  geolocationData?: { lat: number; lng: number; info: string }[];
  [key: string]: any;
}