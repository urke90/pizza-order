import { useCallback, useEffect, useState } from 'react';
import { useModal } from 'hooks/use-modal';
import { useForm } from 'hooks/use-form';
import { useAppDispatch, useAppSelector } from 'hooks/use-redux';
import { addressCreateForm, addressUpdateForm } from 'config/form.config';
import { uidSelector } from 'redux/reducers/auth-reducer';
import { IAddress } from 'ts/address';
import type { TAddressMode } from 'ts/address';
import {
    asyncCreateAddress,
    asyncGetAddresses,
    asyncUpdateAddress
} from 'redux/actions/address-actions';
import { addressesSelector } from 'redux/reducers/address-reducer';

import AddressItem from 'components/addresses/AddressItem';
import AddressCreateEdit from 'components/addresses/AddressCreateEdit';
import LoadingSpinner from 'shared/ui/LoadingSpinner';
import Modal from 'shared/ui/Modal';
import Button from 'shared/form/Button';

import './Addresses.scss';

const Addresses: React.FC = () => {
    /**
     * HOOKS
     */
    const dispatch = useAppDispatch();
    const [isCreateAddressMode, setIsCreateMode] = useState(true);
    const [addressId, setAddressId] = useState('');
    const [showModal, handleToggleModal] = useModal();
    const { formState, handleInputBlur, handleInputChange, setInputFields } =
        useForm(addressCreateForm);

    /**
     * SELECTORS
     */

    const uid = useAppSelector(uidSelector);
    const addresses = useAppSelector(addressesSelector.addresses);
    const isLoading = useAppSelector(addressesSelector.isLoading);
    const error = useAppSelector(addressesSelector.error);

    const { city, zipCode, street, floor, apartment, phone } = formState.inputs;
    const addressesToRender = Object.values(addresses);

    // data used for creating new or updating existing address
    const data: IAddress = {
        city: city.value,
        zipCode: zipCode.value,
        street: street.value,
        floor: floor.value,
        apartment: apartment.value,
        phone: phone.value,
        id: addressId
    };

    // toggles between create address and edit address and opens modal
    const onToggleAddressMode = useCallback(
        (type: TAddressMode, addressId: string = '') => {
            if (type === 'edit') {
                setIsCreateMode(false);
                setAddressId(addressId);
                handleToggleModal();
                return;
            }

            setIsCreateMode(true);
            setAddressId('');
            handleToggleModal();
        },
        [handleToggleModal]
    );

    // updates or creates new address based on isCreatedAddressMode
    const handleSubmitAddress = useCallback(
        (data: IAddress, isCreateAddressMode: boolean, addressId: string) => {
            if (isCreateAddressMode) {
                dispatch(asyncCreateAddress({ uid, data }));
                handleToggleModal();
                return;
            }

            dispatch(asyncUpdateAddress({ uid, data, addressId }));

            handleToggleModal();
        },
        [dispatch, handleToggleModal, uid]
    );

    /**
     * updates inputs in useForm() hook
     * if action is update then it will have prepopulated values
     */
    useEffect(() => {
        if (isCreateAddressMode && addressId.trim() === '') {
            setInputFields(addressCreateForm);
        } else {
            if (!addressId) {
                return;
            }

            const updateAddressForm = addressUpdateForm(addresses[addressId]);
            setInputFields(updateAddressForm);
        }
    }, [
        isCreateAddressMode,
        addressId,
        handleToggleModal,
        addresses,
        setInputFields
    ]);

    // Fetch Addresses on load if we have user ID (uid)
    useEffect(() => {
        if (uid) {
            dispatch(asyncGetAddresses(uid));
        }
    }, [dispatch, uid]);

    // fallback content
    if (isLoading) {
        return <LoadingSpinner asOverlay />;
    } else if (!isLoading && addressesToRender.length === 0 && !error) {
        return (
            <div className="addresses">
                <h2 className="addresses__heading">
                    You have no addresses to show at the moment, please add an
                    address.
                </h2>
                <div className="addresses__fallback-content">
                    <Button type="button" onClick={handleToggleModal}>
                        Add address
                    </Button>
                </div>
            </div>
        );
    } else if (!isLoading && error) {
        <div className="addresses">
            <h2 className="addresses__heading">{error}</h2>
        </div>;
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
                        onClick={() =>
                            handleSubmitAddress(
                                data,
                                isCreateAddressMode,
                                addressId
                            )
                        }
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
            <h2 className="addresses__heading">Addresses</h2>
            <div className="addresses__container">
                <div className="addresses__button-add">
                    <Button
                        type="button"
                        onClick={() => onToggleAddressMode('create')}
                    >
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
                                onAddressUpdate={onToggleAddressMode}
                            />
                        ))}
                </ul>
            </div>
        </div>
    );
};

export default Addresses;
