import { useState } from 'react';
import { addressesSelector } from 'redux/reducers/address-reducer';
import {
    BsFillArrowDownCircleFill,
    BsFillArrowUpCircleFill
} from 'react-icons/bs';
import { useAppDispatch, useAppSelector } from 'hooks/use-redux';
import { generateGeneralClassName } from 'util/className-generators';
import { IAddress } from 'ts/address';
import { selectAddressForCart } from 'redux/reducers/address-reducer';

import Button from 'shared/form/Button';

import './AddressesDropdown.scss';

interface IAddressesDropdownProps {
    contentType: 'pizzaIngredients' | 'cartIngredients' | 'addresses';
    addresses: IAddress[];
    title: string;
}

const AddressesDropdown: React.FC<IAddressesDropdownProps> = ({
    title,
    addresses
}) => {
    const dispatch = useAppDispatch();
    const selectedAddress = useAppSelector(addressesSelector.selectedAddressId);

    const [showDropdown, setShowDropdown] = useState(false);

    const handleToggleDropdown = () =>
        setShowDropdown((prevShowState) => !prevShowState);

    const handleSelectAddress = (addressId: string) => {
        dispatch(selectAddressForCart(addressId));
        setShowDropdown(false);
    };

    const arrowIcon = showDropdown ? (
        <BsFillArrowUpCircleFill className="addresses-dropdown__arrow-icon" />
    ) : (
        <BsFillArrowDownCircleFill className="addresses-dropdown__arrow-icon" />
    );

    return (
        <div className="addresses-dropdown">
            <header className="addresses-dropdown__header">
                <Button
                    type="button"
                    width="100%"
                    secondary
                    onClick={handleToggleDropdown}
                >
                    <div className="addresses-dropdown__button-content">
                        <div>
                            <p>{title}</p>
                        </div>{' '}
                        <div>{arrowIcon}</div>
                    </div>
                </Button>
            </header>

            <ul
                className={`addresses-dropdown__list ${generateGeneralClassName(
                    showDropdown,
                    'addresses-dropdown__list--slide-down',
                    'addresses-dropdown__list--slide-up'
                )}`}
            >
                {addresses.length > 0 &&
                    addresses.map(({ id, street }) => {
                        return (
                            <li
                                className={`addresses-dropdown__item ${generateGeneralClassName(
                                    id === selectedAddress,
                                    'addresses-dropdown__item--active',
                                    ''
                                )}`}
                                key={id}
                                onClick={() => handleSelectAddress(id)}
                            >
                                {street}
                            </li>
                        );
                    })}
            </ul>
        </div>
    );
};
export default AddressesDropdown;
