import OrderItem from './OrderItem';
import { ICartItem } from 'ts/orders';

import './OrderList.scss';

interface IOrderListProps {
    createdPizza: ICartItem;
}

const OrderList: React.FC<IOrderListProps> = ({ createdPizza }) => {
    const { title, imageUrl, ingredients, quantity } = createdPizza;

    const ingredientsToRender = Object.values(ingredients);

    return (
        <div className="order">
            <header className="order__heading">
                <h3>{title}</h3>
            </header>
            <div className="order__img">
                <img src={imageUrl} alt={title} />
            </div>
            <div className="order__quantity">
                <h4>
                    Quantity: <span>{quantity}</span>{' '}
                </h4>
            </div>
            <ul className="order__list">
                {ingredientsToRender &&
                    ingredientsToRender.map(({ id, title, quantity }) => (
                        <OrderItem key={id} title={title} quantity={quantity} />
                    ))}
            </ul>
        </div>
    );
};

export default OrderList;
