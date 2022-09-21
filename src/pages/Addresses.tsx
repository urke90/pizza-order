import { useCallback, useEffect } from 'react';
import { useModal } from 'hooks/useModal';
import { useForm } from 'hooks/useForm';
import { IFormState } from 'ts/form';
import { uidSelector } from 'redux/reducers/authReducer';
import { useAppDispatch, useAppSelector } from 'hooks/useRedux';
import { IAddress } from 'ts/address';
import {
    asyncCreateAddress,
    asyncGetAddresses
} from 'redux/actions/address-actions';
import { addressesSelector } from 'redux/reducers/addressReducer';

import AddressItem from 'components/addresses/AddressItem';
import AddressCreateEdit from 'components/addresses/AddressCreateEdit';
import LoadingSpinner from 'shared/ui/LoadingSpinner';
import Modal from 'shared/ui/Modal';
import Button from 'shared/form/Button';

import './Addresses.scss';

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
    const isLoading = useAppSelector(addressesSelector.isLoading);
    const error = useAppSelector(addressesSelector.error);

    const addressesToRender = Object.values(addresses);

    useEffect(() => {
        console.log('addresses', addresses);
    }, [addresses]);

    useEffect(() => {
        if (uid.trim() === '') return;
        dispatch(asyncGetAddresses(uid));
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
        dispatch(asyncCreateAddress({ uid, data }));
        handleToggleModal();
    }, [dispatch, formState.inputs, handleToggleModal, uid]);

    if (isLoading) {
        return <LoadingSpinner asOverlay />;
    } else if (!isLoading && addressesToRender.length === 0 && !!error) {
        return (
            <div className="addresses">
                <header className="addresses__header">
                    <h2>
                        You have no addresses to show at the moment, please add
                        an address.
                    </h2>
                </header>
                <div className="addresses__container">
                    <div className="addresses__button-add">
                        <Button type="button" onClick={handleToggleModal}>
                            Add address
                        </Button>
                    </div>
                </div>
            </div>
        );
    }

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
                    {addressesToRender.length > 0 &&
                        addressesToRender.map((address) => (
                            <AddressItem
                                key={address.id}
                                address={address}
                                uid={uid}
                            />
                        ))}
                </ul>
            </div>
        </div>
    );
};

export default Addresses;
