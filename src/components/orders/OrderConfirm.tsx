import { useEffect } from 'react';
import { ICartItem } from 'ts/orders-cart';
import { useAppSelector, useAppDispatch } from 'hooks/useRedux';
import { asyncGetAddresses } from 'redux/actions/addressActions';

import { addressesSelector } from 'redux/reducers/addressReducer';
import { uidSelector } from 'redux/reducers/authReducer';

import OrderItem from './OrderItem';
import LoadingSpinner from 'shared/ui/LoadingSpinner';

import './OrderConfirm.scss';

interface IOrderConfirmProps {
    cartItems: ICartItem[];
}

/**
 *
 * Figure out a way to render addresses, should i fetch them here in OrderConfirm or in Cart and pass them through props
 */

const OrderConfirm: React.FC<IOrderConfirmProps> = ({ cartItems }) => {
    // const dispatch = useAppDispatch();
    // const addresses = useAppSelector(addressesSelector.addresses);
    // const isLoading = useAppSelector(addressesSelector.isLoading);
    // const addressesToRender = Object.values(addresses);
    // const uid = useAppSelector(uidSelector);
    // console.log('addresses in OrderConfirm component', addresses);

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
                <select name="addresses" id="addresses"></select>
            </div>
        </div>
    );
};
export default OrderConfirm;
