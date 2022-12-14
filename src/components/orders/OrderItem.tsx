import { ICartItem } from 'ts/orders-cart';
import { countPizzaTotalPrice } from 'util/pizzas-data';

import './OrderItem.scss';

interface IOrderItemProps {
    orderItem: ICartItem;
    showItem: boolean;
}

const OrderItem: React.FC<IOrderItemProps> = ({ orderItem, showItem }) => {
    const { imageUrl, sourceUrl, title, quantity, ingredients, price } =
        orderItem;

    const totalPrice = countPizzaTotalPrice(price, quantity);

    return (
        <li className="order-item">
            <div className="order-item__img">
                <img src={imageUrl} alt={title} />
            </div>
            <div className="order-item__description">
                <h5 className="order-item__title ellipsis">{title}</h5>
                <a
                    className="order-item__link"
                    href={sourceUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                >
                    Check Online
                </a>
                <p className="order-item__value">Quantity: {quantity}</p>
                <p className="order-item__value">Total: {totalPrice} $</p>
            </div>
        </li>
    );
};

export default OrderItem;
