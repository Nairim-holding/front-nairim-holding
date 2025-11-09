export interface MetricDataItem {
  id: string | number;
  title?: string;
  [key: string]: any;
}

export interface MetricWithData {
  result: number;
  variation: number;
  isPositive: boolean;
  data?: MetricDataItem[];
}

export interface MetricResponse {
  averageRentalTicket: MetricWithData;
  totalRentalActive: MetricWithData;
  totalAcquisitionValue: MetricWithData;
  financialVacancyRate: MetricWithData;
  totalPropertyTaxAndCondoFee: MetricWithData;
  vacancyInMonths: MetricWithData;
  totalPropertys: MetricWithData;
  countPropertiesWithLessThan3Docs: MetricWithData;
  totalPropertiesWithSaleValue: MetricWithData;
  ownersTotal: MetricWithData;
  tenantsTotal: MetricWithData;
  propertiesPerOwner: MetricWithData;
  agenciesTotal: MetricWithData;
  
  availablePropertiesByType: Array<{
    name: string;
    value: number;
    data?: MetricDataItem[];
  }>;
  propertiesByAgency: Array<{
    name: string;
    value: number;
    data?: MetricDataItem[];
  }>;
  
  geolocationData: Array<{
    lat: number;
    lng: number;
    info: string;
  }>;
}