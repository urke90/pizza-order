interface IAddress_inputs_config {
    type: 'text' | 'email' | 'hidden' | 'number' | 'password';
    name: 'city' | 'street' | 'zipCode' | 'floor' | 'apartment' | 'phone';
    id: string;
    placeholder: string;
    label: string;
    errorMessage: string;
}

export const ADDRESS_INPUTS_CONFIG: IAddress_inputs_config[] = [
    {
        type: 'text',
        name: 'city',
        id: 'city',
        placeholder: 'City',
        label: 'City',
        errorMessage: 'Please provide city name!'
    },
    {
        type: 'text',
        name: 'zipCode',
        id: 'zip',
        placeholder: 'Zip/Postal code',
        label: 'Zip/Postal code',
        errorMessage: 'Please provide zip/postal code!'
    },
    {
        type: 'text',
        name: 'street',
        id: 'street',
        placeholder: 'Street',
        label: 'Street',
        errorMessage: 'Please provide street name!'
    },
    {
        type: 'text',
        name: 'floor',
        id: 'floor',
        placeholder: 'Floor',
        label: 'Floor',
        errorMessage: 'Please provide floor number!'
    },
    {
        type: 'text',
        name: 'apartment',
        id: 'apartment',
        placeholder: 'Apartment',
        label: 'Apartment',
        errorMessage: 'Please provide apartment number!'
    },
    {
        type: 'text',
        name: 'phone',
        id: 'phone',
        placeholder: 'Phone',
        label: 'Phone',
        errorMessage: 'Please provide phone number!'
    }
];
