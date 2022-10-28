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

const AddressItem: React.FC<IAddressItemProps> = (props) => {
    const dispatch = useAppDispatch();
    const isBtnDisabled = useAppSelector(addressesSelector.isBtnDisabled);

    const { id } = props.address;
    const { onAddressUpdate, uid } = props;

    // Array of arrays where [0] === apartment/city/street... [1] === values
    const addressToRender = Object.entries(props.address);

    const deleteAddressHandler = () => {
        dispatch(asyncDeleteAddress({ uid, addressId: id }));
    };

    return (
        <li className="address-item">
            {addressToRender.length > 0 &&
                addressToRender.map(([label, value]) =>
                    label !== 'id' ? (
                        <div key={label} className="address-item__data">
                            <h5 className="address-item__title">{label}:</h5>
                            <p className="address-item__description">{value}</p>
                        </div>
                    ) : null
                )}
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
