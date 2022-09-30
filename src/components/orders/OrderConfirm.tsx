import { ICartItem } from 'ts/orders-cart';
import { IAddress } from 'ts/address';

import Accordion from 'shared/ui/Accordion';
import OrderPizzaIngredientItem from '../pizza-order/OrderPizzaIngredientItem';

import './OrderConfirm.scss';

interface IOrderConfirmProps {
    cartItems: ICartItem[];
    addresses: IAddress[];
    totalPrice: number;
    selectedAddress: IAddress;
}

const OrderConfirm: React.FC<IOrderConfirmProps> = ({
    cartItems,
    addresses,
    totalPrice,
    selectedAddress
}) => {
    return (
        <div className="order-confirm">
            <ul className="order-confirm__list">
                {cartItems.length > 0 &&
                    cartItems.map(({ title, quantity, pizzaId }) => (
                        <OrderPizzaIngredientItem
                            key={pizzaId}
                            title={title}
                            quantity={quantity}
                            isPizzaItem
                        />
                    ))}
            </ul>
            <p className="order-confirm__price">
                Total Price:{' '}
                <span className="color--red">{totalPrice.toFixed(2)}</span> $
            </p>
            <Accordion
                contentType="addresses"
                addresses={addresses}
                title="Choose Address"
            />
            {!!selectedAddress && (
                <p className="order-confirm__address--selected">
                    {selectedAddress.street}
                </p>
            )}
        </div>
    );
};
export default OrderConfirm;
