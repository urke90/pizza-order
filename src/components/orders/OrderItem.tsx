import { IOrderItem } from 'ts/orders-cart';

import './OrderItem.scss';

interface IOrderItemProps {
    order: IOrderItem;
}

const OrderItem: React.FC<IOrderItemProps> = ({ order }) => {
    const { imageUrl, sourceUrl, title, quantity, address, ingredients } =
        order;
    // console.log('individual order', order);

    return (
        <li className="order-item">
            <header className="order-item__header">
                <div className="cart-item__img">
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
                    <div className="order-item__quantity">
                        <p className="order-item__value">
                            Quantity: {quantity}
                        </p>
                    </div>
                </div>
            </header>
        </li>
    );
};
export default OrderItem;
