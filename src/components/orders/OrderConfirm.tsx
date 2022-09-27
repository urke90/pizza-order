import { ICartItem } from 'ts/orders-cart';
import { IAddress } from 'ts/address';

import Accordion from 'shared/ui/Accordion';
import OrderPizzaIngredientItem from '../pizza-order/OrderPizzaIngredientItem';

import './OrderConfirm.scss';

interface IOrderConfirmProps {
    cartItems: ICartItem[];
    addresses: IAddress[];
}

const OrderConfirm: React.FC<IOrderConfirmProps> = ({
    cartItems,
    addresses
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
            <div className="order-confirm__addresses">
                <Accordion
                    contentType="addresses"
                    addresses={addresses}
                    title="Choose Address"
                />
            </div>
        </div>
    );
};
export default OrderConfirm;
