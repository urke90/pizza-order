import { IAddress } from 'ts/address';
import Button from 'shared/form/Button';

import './AddressItem.scss';

interface IAddressItemProps {
    address: IAddress;
}

const AddressItem: React.FC<IAddressItemProps> = (props) => {
    const { id, city, street, zipCode, floor, apartment, phone } =
        props.address;

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
                <Button type="button">Update</Button>
                <Button type="button">Remove</Button>
            </div>
        </li>
    );
};

export default AddressItem;
