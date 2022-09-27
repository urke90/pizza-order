import { ICartItem } from 'ts/orders-cart';

import OrderPizzaIngredientItem from '../pizza-order/OrderPizzaIngredientItem';
import './PizzaAddList.scss';

interface IPizzaAddListProps {
    createdPizza: ICartItem;
}

const PizzaAddList: React.FC<IPizzaAddListProps> = ({ createdPizza }) => {
    const { title, imageUrl, ingredients, quantity } = createdPizza;

    const ingredientsToRender = Object.values(ingredients);

    return (
        <div className="pizza-add">
            <header className="pizza-add__heading">
                <h3>{title}</h3>
            </header>
            <div className="pizza-add__img">
                <img src={imageUrl} alt={title} />
            </div>
            <div className="pizza-add__quantity">
                <h4>
                    Quantity: <span>{quantity}</span>{' '}
                </h4>
            </div>
            <ul className="pizza-add__list">
                {ingredientsToRender.length > 0 &&
                    ingredientsToRender.map(({ id, title, quantity }) => (
                        <OrderPizzaIngredientItem
                            key={id}
                            title={title}
                            quantity={quantity}
                        />
                    ))}
            </ul>
        </div>
    );
};

export default PizzaAddList;
