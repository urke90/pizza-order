import { useCallback, useEffect } from 'react';
import { useModal } from 'hooks/useModal';
import { useForm } from 'hooks/useForm';
import { IFormState } from 'ts/form';
import { uidSelector } from 'redux/reducers/authReducer';
import { useAppDispatch, useAppSelector } from 'hooks/useRedux';
import { IAddress } from 'ts/address';
import { createAddress, getAddresses } from 'redux/actions/address-actions';
import { addressesSelector } from 'redux/reducers/addressReducer';

import Button from 'shared/form/Button';
import Modal from 'shared/ui/Modal';
import AddressCreateEdit from 'components/addresses/AddressCreateEdit';
// import LoadingSpinner from 'shared/ui/LoadingSpinner';

import './Addresses.scss';
import {} from 'hooks/useRedux';

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
    const addresses = useAppSelector(addressesSelector.addresses);

    useEffect(() => {
        if (uid.trim() === '') return;
        dispatch(getAddresses(uid));
    }, [dispatch, uid]);

    const addNewAddress = useCallback(() => {
        const { city, zipCode, street, floor, apartment, phone } =
            formState.inputs;

        const data: IAddress = {
            city: city.value,
            zipCode: zipCode.value,
            street: street.value,
            floor: floor.value,
            apartment: apartment.value,
            phone: phone.value,
            id: ''
        };
        dispatch(createAddress({ uid, data }));
        handleToggleModal();
    }, [dispatch, formState.inputs, handleToggleModal, uid]);

    return (
        <div className="addresses">
            <Modal
                show={showModal}
                headerTitle="Add New Address"
                onClose={handleToggleModal}
                footer={
                    <Button
                        type="button"
                        onClick={addNewAddress}
                        disabled={!formState.formIsValid}
                    >
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
