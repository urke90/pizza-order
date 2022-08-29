import OrderItem from './OrderItem';
import { ICartItem } from 'ts/orders';

import './OrderList.scss';

interface IOrderListProps {
    createdPizza: ICartItem;
}

const OrderList: React.FC<IOrderListProps> = ({ createdPizza }) => {
    console.log('createdPizza', createdPizza.title);

    const { title, imageUrl, ingredients, quantity } = createdPizza;

    const ingredientsToRender = Object.values(ingredients);

    console.log('ingredientsToRender', ingredientsToRender);

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
                    ingredientsToRender.map((ing) => {
                        return (
                            <li className="order__item">
                                <span className="order__item--title">
                                    {ing.title}
                                </span>
                                {'    '}{' '}
                                <span className="order__item--quantity">
                                    {ing.quantity}
                                </span>
                            </li>
                        );
                    })}
            </ul>
        </div>
    );
};

export default OrderList;
