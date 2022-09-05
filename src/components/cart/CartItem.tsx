import { AiFillMinusCircle, AiFillPlusCircle } from 'react-icons/ai';
import { ICartItem } from 'ts/orders';
import { useAppDispatch } from 'hooks/useRedux';
import type { TIngredientActionType } from 'ts/ingredients';
import { changePizzaQuantity } from 'redux/reducers/ordersReducer';
import CartIngredientItem from './CartIngredientItem';

import './CartItem.scss';

interface ICartItemProps {
    item: ICartItem;
}

const CartItem: React.FC<ICartItemProps> = ({ item }) => {
    // console.log('item in cartItem', item);
    const dispatch = useAppDispatch();

    const { pizzaId, imageUrl, title, sourceUrl, quantity, ingredients } = item;

    const ingredientsToRender = Object.values(ingredients);

    // console.log('ingredientsToRender', ingredientsToRender);

    const handlePizzaQuantityChange = (
        pizzaId: string,
        type: TIngredientActionType
    ) => {
        dispatch(changePizzaQuantity({ pizzaId, type }));
    };

    return (
        <li className="cart-item">
            <div className="cart-item__heading">
                <div className="cart-item__img">
                    <img src={imageUrl} alt={title} />
                </div>
                <div className="cart-item__description">
                    <h5 className="cart-item__title ellipsis">{title}</h5>
                    <a
                        className="cart-item__link"
                        href={sourceUrl}
                        target="_blank"
                        rel="noreferrer"
                    >
                        Check Online
                    </a>
                    <div className="cart-item__quantity">
                        <AiFillPlusCircle
                            className="cart-item__quantity-icon"
                            onClick={() =>
                                handlePizzaQuantityChange(pizzaId, 'inc')
                            }
                        />
                        <p className="cart-item__value">Quantity: {quantity}</p>
                        <AiFillMinusCircle
                            className="cart-item__quantity-icon"
                            onClick={() =>
                                handlePizzaQuantityChange(pizzaId, 'dec')
                            }
                        />
                    </div>
                </div>
            </div>

            <h4 className="cart-item__title--ingredients">Ingredients:</h4>
            <ul className="cart-item__list--ingredients">
                {ingredientsToRender &&
                    ingredientsToRender.length &&
                    ingredientsToRender.map((ing) => (
                        <CartIngredientItem
                            key={ing.id}
                            ingredient={ing}
                            pizzaId={pizzaId}
                        />
                    ))}
            </ul>
        </li>
    );
};
export default CartItem;
