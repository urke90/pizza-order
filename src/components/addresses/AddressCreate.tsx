import React, { useEffect, useState } from 'react';
import Input from 'shared/form/Input';

import { IAddress } from 'ts/address';

import './AddressCreate.scss';

type AddressCreateProps = {};

interface IADDRESS_INPUTS_CONFIG {
    type: 'text' | 'email' | 'hidden' | 'number' | 'password';
    name: 'state' | 'city' | 'street' | 'zipCode';
    id: string;
    placeholder: string;
    label: string;
}

const ADDRESS_INPUTS_CONFIG: IADDRESS_INPUTS_CONFIG[] = [
    {
        type: 'text',
        name: 'state',
        id: 'state',
        placeholder: 'State',
        label: 'State'
    },
    {
        type: 'text',
        name: 'city',
        id: 'city',
        placeholder: 'City',
        label: 'City'
    },
    {
        type: 'text',
        name: 'street',
        id: 'street',
        placeholder: 'Street',
        label: 'Street'
    },
    {
        type: 'text',
        name: 'zipCode',
        id: 'zip',
        placeholder: 'Zip/Postal code',
        label: 'Zip/Postal code'
    }
];

const AddressCreate: React.FC<AddressCreateProps> = () => {
    const [address, setAddress] = useState<IAddress>({
        id: '',
        state: '',
        city: '',
        street: '',
        zipCode: ''
    });

    useEffect(() => {
        console.log('address', address);
    }, [address]);

    const handleChangeAddress = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        console.log('handleChangeAddress value', e.target.value);

        setAddress((prevAddress) => ({
            ...prevAddress,
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmitAddress = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    };

    return (
        <div className="address-create">
            <form
                className="address-create__form"
                onSubmit={handleSubmitAddress}
            >
                {ADDRESS_INPUTS_CONFIG &&
                    ADDRESS_INPUTS_CONFIG.map(
                        ({ type, name, id, placeholder, label }) => (
                            <div className="address-create__form-control">
                                <Input
                                    key={id}
                                    type={type}
                                    name={name}
                                    id={id}
                                    placeholder={placeholder}
                                    label={label}
                                    onChange={handleChangeAddress}
                                    initValue={address[name]}
                                />
                            </div>
                        )
                    )}
            </form>
        </div>
    );
};
export default AddressCreate;
