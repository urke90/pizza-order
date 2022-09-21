export interface IAddress {
    id: string;
    city: string;
    street: string;
    zipCode: string;
    floor: string;
    apartment: string;
    phone: string;
}

export type TAddressMode = 'create' | 'edit';
