import { AiFillMinusCircle, AiFillPlusCircle } from 'react-icons/ai';
import { ICartItem } from 'ts/orders-cart';
import { useAppDispatch } from 'hooks/use-redux';
import type { TIngredientActionType } from 'ts/ingredients';
import {
    changePizzaQuantity,
    removePizzaFromCart
} from 'redux/reducers/cart-reducer';

import CartIngredientItem from './CartIngredientItem';
import Button from 'shared/form/Button';

import './CartItem.scss';

interface ICartItemProps {
    item: ICartItem;
}

const CartItem: React.FC<ICartItemProps> = ({ item }) => {
    const dispatch = useAppDispatch();
    const { pizzaId, imageUrl, title, sourceUrl, quantity, ingredients } = item;
    const ingredientsToRender = Object.values(ingredients);

    const handlePizzaQuantityChange = (
        pizzaId: string,
        type: TIngredientActionType
    ) => {
        dispatch(changePizzaQuantity({ pizzaId, type }));
    };

    const handleRemovePizzaFromCart = (pizzaId: string) => {
        dispatch(removePizzaFromCart({ pizzaId }));
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
                        rel="noreferrer noopener"
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
            <h4 className="cart-item__ingredients-title">Ingredients:</h4>
            <ul className="cart-item__ingredients-list">
                {ingredientsToRender.length > 0 &&
                    ingredientsToRender.map((ing) => (
                        <CartIngredientItem
                            key={ing.id}
                            ingredient={ing}
                            pizzaId={pizzaId}
                        />
                    ))}
            </ul>
            <div className="cart-item__button--remove">
                <Button
                    type="button"
                    onClick={() => handleRemovePizzaFromCart(pizzaId)}
                    secondary
                >
                    remove
                </Button>
            </div>
        </li>
    );
};
export default CartItem;
