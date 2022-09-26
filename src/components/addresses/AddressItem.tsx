import { IAddress } from 'ts/address';
import type { TAddressMode } from 'ts/address';
import { useAppDispatch } from 'hooks/use-redux';
import { asyncDeleteAddress } from 'redux/actions/address-actions';
import Button from 'shared/form/Button';

import './AddressItem.scss';

interface IAddressItemProps {
    address: IAddress;
    uid: string;
    onAddressUpdate: (type: TAddressMode, addressId: string) => void;
}

const AddressItem: React.FC<IAddressItemProps> = (props) => {
    const { id, city, street, zipCode, floor, apartment, phone } =
        props.address;
    const { onAddressUpdate, uid } = props;
    const dispatch = useAppDispatch();

    const deleteAddressHandler = () => {
        dispatch(asyncDeleteAddress({ uid, addressId: id }));
    };

    return (
        <li className="address-item">
            <div className="address-item__data-container">
                <h5 className="address-item__title">City</h5>
                <p>{street}</p>
            </div>
            <div className="address-item__data-container">
                <h5 className="address-item__title">Street</h5>
                <p>{city}</p>
            </div>
            <div className="address-item__data-container">
                <h5 className="address-item__title">Zip/Postal code</h5>
                <p>{zipCode}</p>
            </div>
            <div className="address-item__data-container">
                <h5 className="address-item__title">Floor</h5>
                <p>{floor}</p>
            </div>
            <div className="address-item__data-container">
                <h5 className="address-item__title">Apartment</h5>
                <p>{apartment}</p>
            </div>
            <div className="address-item__data-container">
                <h5 className="address-item__title">Phone</h5>
                <p>{phone}</p>
            </div>
            <div className="address-item__actions">
                <Button
                    type="button"
                    onClick={() => onAddressUpdate('edit', id)}
                    disabled={!id}
                >
                    Update
                </Button>
                <Button
                    type="button"
                    onClick={deleteAddressHandler}
                    disabled={!uid || !id}
                >
                    Remove
                </Button>
            </div>
        </li>
    );
};

export default AddressItem;
