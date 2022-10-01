import { IAddress } from 'ts/address';
import type { TAddressMode } from 'ts/address';
import { useAppDispatch, useAppSelector } from 'hooks/use-redux';
import { asyncDeleteAddress } from 'redux/actions/address-actions';
import { addressesSelector } from 'redux/reducers/address-reducer';

import Button from 'shared/form/Button';

import './AddressItem.scss';

interface IAddressItemProps {
    address: IAddress;
    uid: string;
    onAddressUpdate: (type: TAddressMode, addressId: string) => void;
}

/**
 * FIGURE OUT A WAY TO RENDER DIVS WITH ADDRESS INFO DYNAMICALLY
 */

const AddressItem: React.FC<IAddressItemProps> = (props) => {
    const { id, city, street, zipCode, floor, apartment, phone } =
        props.address;

    console.log('address', props.address);

    const { onAddressUpdate, uid } = props;
    const dispatch = useAppDispatch();
    const isBtnDisabled = useAppSelector(addressesSelector.isBtnDisabled);

    const deleteAddressHandler = () => {
        dispatch(asyncDeleteAddress({ uid, addressId: id }));
    };

    return (
        <li className="address-item">
            <div className="address-item__data">
                <h5 className="address-item__title">City</h5>
                <p className="address-item__description">{street}</p>
            </div>
            <div className="address-item__data">
                <h5 className="address-item__title">Street</h5>
                <p className="address-item__description">{city}</p>
            </div>
            <div className="address-item__data">
                <h5 className="address-item__title">Zip/Postal code</h5>
                <p className="address-item__description">{zipCode}</p>
            </div>
            <div className="address-item__data">
                <h5 className="address-item__title">Floor</h5>
                <p className="address-item__description">{floor}</p>
            </div>
            <div className="address-item__data">
                <h5 className="address-item__title">Apartment</h5>
                <p className="address-item__description">{apartment}</p>
            </div>
            <div className="address-item__data">
                <h5 className="address-item__title">Phone</h5>
                <p className="address-item__description">{phone}</p>
            </div>

            <div className="address-item__actions">
                <Button
                    type="button"
                    onClick={() => onAddressUpdate('edit', id)}
                    disabled={!id || isBtnDisabled}
                >
                    Update
                </Button>
                <Button
                    type="button"
                    onClick={deleteAddressHandler}
                    disabled={!uid || !id || isBtnDisabled}
                >
                    Remove
                </Button>
            </div>
        </li>
    );
};

export default AddressItem;
