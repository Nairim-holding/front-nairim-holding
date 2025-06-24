import Owner from "./owner";
import propertyTypes from './propertyTypes';

export default interface Property {
    id: number;
    owner_id: number;
    type_id: number;
    title: string;
    bedrooms: number;
    bathrooms: number;
    half_bathrooms: number;
    garage_spaces: number;
    area_total: number;
    area_built: number;
    frontage: number;
    furnished: boolean;
    floor_number: number;
    tax_registration: string;
    notes: string | null;
    created_at: string;
    updated_at: string;
    values?: Array<any>;
    addresses?: Array<any>;
    owner?: Owner
    type?: propertyTypes
}
