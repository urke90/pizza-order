import { useState } from 'react';

import {
    BsFillArrowDownCircleFill,
    BsFillArrowUpCircleFill
} from 'react-icons/bs';
import { useAppDispatch } from 'hooks/useRedux';
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
                <Button type="button" width="100%" secondary>
                    <div
                        className="accordion__button-content"
                        onClick={handleToggleAccordion}
                    >
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
                                className="accordion__item"
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
