import React, { useEffect, useState } from 'react';
import { useForm } from 'hooks/useForm';
import { IFormState } from 'ts/form';
import { ADDRESS_INPUTS_CONFIG } from 'config/address.config';
import { IAddress } from 'ts/address';

import Input from 'shared/form/Input';

import './AddressCreate.scss';

/**
 * THIS WILL BE REUSABLE COMPONENT FOR CREATING AND UPDATING ADDRESS SO WE MUST BE ABLE TO SET INITIAL VALUES
 * WE WILL NEED TO SAVE ADDRESS TO REDUX
 * WE WILL NEED TO SABVE ADDRSS TO DB
 * CONFIRM BUTTON WILL BE IN MODAL (PARRENT COMPONENT) so we will need to pass callback func to update fields ===>
 * CALL useForm() in PARENT COMPONENT ?!?!??!?!?!??!
 */

interface IAddressCreateEditProps {}

export const addressForm: IFormState = {
    inputs: {
        city: {
            value: '',
            isValid: false
        },
        zipCode: {
            value: '',
            isValid: false
        },
        street: {
            value: '',
            isValid: false
        },
        floor: {
            value: '',
            isValid: false
        },
        apartment: {
            value: '',
            isValid: false
        },
        phone: {
            value: '',
            isValid: false
        }
    },
    formIsValid: false
};

const AddressCreateEdit: React.FC<IAddressCreateEditProps> = () => {
    const { formState, handleInputChange } = useForm(addressForm);

    const handleSubmitAddress = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    };

    return (
        <div className="address-create">
            <form
                className="address-create__form"
                onSubmit={handleSubmitAddress}
            >
                {ADDRESS_INPUTS_CONFIG.length > 0 &&
                    ADDRESS_INPUTS_CONFIG.map(
                        ({
                            type,
                            name,
                            id,
                            placeholder,
                            label,
                            errorMessage
                        }) => (
                            <div
                                key={id}
                                className="address-create__form-control"
                            >
                                <Input
                                    type={type}
                                    name={name}
                                    id={id}
                                    placeholder={placeholder}
                                    label={label}
                                    onChange={handleInputChange}
                                    value={formState.inputs[name].value}
                                    isValid={formState.inputs[name].isValid}
                                    errorMessage={errorMessage}
                                />
                            </div>
                        )
                    )}
                <div>
                    <button disabled={!formState.formIsValid}> aaaaa </button>
                </div>
            </form>
        </div>
    );
};
export default AddressCreateEdit;
