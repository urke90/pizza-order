import { useState } from 'react';
import { addressesSelector } from 'redux/reducers/addressReducer';
import {
    BsFillArrowDownCircleFill,
    BsFillArrowUpCircleFill
} from 'react-icons/bs';
import { useAppDispatch, useAppSelector } from 'hooks/useRedux';
import { IAddress } from 'ts/address';
import { selectAddressForCart } from 'redux/reducers/addressReducer';

import Button from 'shared/form/Button';

import './Accordion.scss';

interface IAccordionProps {
    contentType: 'pizzaIngredients' | 'cartIngredients' | 'addresses';
    addresses: IAddress[];
    title: string;
}

const Accordion: React.FC<IAccordionProps> = ({ title, addresses }) => {
    const dispatch = useAppDispatch();
    const selectedAddress = useAppSelector(addressesSelector.selectedAddress);

    const [showAccordion, setShowAccordion] = useState(false);

    const handleToggleAccordion = () =>
        setShowAccordion((prevShowState) => !prevShowState);

    const handleSelectAddress = (addressId: string) => {
        dispatch(selectAddressForCart(addressId));
        handleToggleAccordion();
    };

    const arrowIcon = showAccordion ? (
        <BsFillArrowUpCircleFill className="accordion__arrow-icon" />
    ) : (
        <BsFillArrowDownCircleFill className="accordion__arrow-icon" />
    );

    return (
        <div className="accordion">
            <header className="accordion__header">
                <Button
                    type="button"
                    width="100%"
                    secondary
                    onClick={handleToggleAccordion}
                >
                    <div className="accordion__button-content">
                        <div className="">
                            <p>{title}</p>
                        </div>{' '}
                        <div>{arrowIcon}</div>
                    </div>
                </Button>
            </header>

            <ul
                className={`accordion__list ${
                    showAccordion ? 'accordion__list--show' : ''
                }`}
            >
                {addresses.length > 0 &&
                    addresses.map(({ id, street }) => {
                        return (
                            <li
                                className={`accordion__item ${
                                    id === selectedAddress
                                        ? 'accordion__item--active'
                                        : ''
                                }`}
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
export default Accordion;
