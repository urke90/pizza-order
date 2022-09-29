import { ICartItem } from 'ts/orders-cart';

import OrderPizzaIngredientItem from '../pizza-order/OrderPizzaIngredientItem';
import { countPizzaTotalPrice } from 'util/pizzas-data';
import './PizzaAdd.scss';

interface IPizzaAddListProps {
    createdPizza: ICartItem;
}

const PizzaAdd: React.FC<IPizzaAddListProps> = ({ createdPizza }) => {
    const { title, imageUrl, ingredients, quantity, price } = createdPizza;

    const ingredientsToRender = Object.values(ingredients);
    const totalPrice = countPizzaTotalPrice(price, quantity);

    return (
        <div className="pizza-add">
            <header className="pizza-add__heading">
                <h3>{title}</h3>
            </header>
            <div className="pizza-add__img">
                <img src={imageUrl} alt={title} />
            </div>
            <div className="pizza-add__details">
                <h4 className="pizza-add__quantity">
                    Quantity: <span>{quantity}</span>
                </h4>
                <h4>
                    Price: <span>{totalPrice}</span> $
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

export default PizzaAdd;
