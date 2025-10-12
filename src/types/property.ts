import Address from "./address";
import Agency from "./agency";
import Owner from "./owner";
import propertyTypes from './propertyTypes';

export default interface Property {
    id: number;
    agency: Agency;
    owner_id: number;
    agency_id: number;
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
    addresses?: [{address: Address}];
    owner?: Owner
    type?: propertyTypes
    documents: [{
        id: number;
        file_type: string;
        file_path: string;
    }]
    is_active: boolean;
}
