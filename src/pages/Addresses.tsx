import { useEffect, useState } from 'react';
import { useModal } from 'hooks/useModal';
import { useForm } from 'hooks/useForm';
import { IFormState } from 'ts/form';
import { uidSelector } from 'redux/reducers/authReducer';
import { useAppDispatch } from 'hooks/useRedux';
import { createAddress } from 'redux/actions/address-actions';

import Button from 'shared/form/Button';
import Modal from 'shared/ui/Modal';
import AddressCreateEdit from 'components/addresses/AddressCreateEdit';
// import LoadingSpinner from 'shared/ui/LoadingSpinner';

import './Addresses.scss';
import { useAppSelector } from 'hooks/useRedux';

export const addressFormCreate: IFormState = {
    inputs: {
        city: {
            value: '',
            isValid: false,
            isTouched: false
        },
        zipCode: {
            value: '',
            isValid: false,
            isTouched: false
        },
        street: {
            value: '',
            isValid: false,
            isTouched: false
        },
        floor: {
            value: '',
            isValid: false,
            isTouched: false
        },
        apartment: {
            value: '',
            isValid: false,
            isTouched: false
        },
        phone: {
            value: '',
            isValid: false,
            isTouched: false
        }
    },
    formIsValid: false
};

const Addresses: React.FC = () => {
    const dispatch = useAppDispatch();
    const [showModal, handleToggleModal] = useModal();
    const { formState, handleInputBlur, handleInputChange } =
        useForm(addressFormCreate);
    const uid = useAppSelector(uidSelector);

    console.log('uid in addresses', uid);

    const addNewAddress = () => {
        // const data = {
        //     ...formState,
        //     id: ''
        // };
        console.log('add address button clicked ');
        dispatch(createAddress({ uid, data: formState }));
        handleToggleModal();
    };

    useEffect(() => {
        console.log('formState.inputs IN ADDDRESSES', formState.inputs);
    }, [formState]);

    return (
        <div className="addresses">
            <Modal
                show={showModal}
                headerTitle="Add New Address"
                onClose={handleToggleModal}
                footer={
                    <Button type="button" onClick={addNewAddress}>
                        Confirm
                    </Button>
                }
            >
                <AddressCreateEdit
                    formState={formState}
                    handleInputChange={handleInputChange}
                    handleInputBlur={handleInputBlur}
                />
            </Modal>
            <header className="addresses__header">
                <h2>Addresses</h2>
            </header>
            <div className="addresses__container">
                <div className="addresses__button-add">
                    <Button type="button" onClick={handleToggleModal}>
                        Add address
                    </Button>
                </div>
                <ul className="addresses__list">
                    <li>address 1</li>
                    <li>address 2</li>
                    <li>address 3</li>
                </ul>
            </div>
        </div>
    );
};

export default Addresses;
