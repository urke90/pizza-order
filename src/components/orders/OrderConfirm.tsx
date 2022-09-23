import { useEffect, useState } from 'react';
import { ICartItem } from 'ts/orders-cart';
import { useAppSelector, useAppDispatch } from 'hooks/useRedux';
import { asyncGetAddresses } from 'redux/actions/addressActions';

import { addressesSelector } from 'redux/reducers/addressReducer';
import { IAddress } from 'ts/address';

import Accordion from 'shared/ui/Accordion';
import OrderItem from './OrderItem';

import './OrderConfirm.scss';

interface IOrderConfirmProps {
    cartItems: ICartItem[];
    addresses: IAddress[];
    // onAddressChange:
}

const OrderConfirm: React.FC<IOrderConfirmProps> = ({
    cartItems,
    addresses
}) => {
    // const dispatch = useAppDispatch();
    // const addresses = useAppSelector(addressesSelector.addresses);
    // const addressesToRender = Object.values(addresses);
    // const uid = useAppSelector(uidSelector);
    // console.log('addresses in OrderConfirm component', addresses);
    //e: React.ChangeEvent<HTMLSelectElement>

    console.log('addresses in orderConfirm', addresses);

    return (
        <div className="order-confirm">
            <ul className="order-confirm__list">
                {cartItems.length > 0 &&
                    cartItems.map(({ title, quantity, pizzaId }) => (
                        <OrderItem
                            key={pizzaId}
                            title={title}
                            quantity={quantity}
                            isPizzaItem
                        />
                    ))}
            </ul>
            <div className="order-confirm__addresses">
                <Accordion
                    contentType="addresses"
                    items={addresses}
                    title="Choose Address"
                />
            </div>
        </div>
    );
};
export default OrderConfirm;
