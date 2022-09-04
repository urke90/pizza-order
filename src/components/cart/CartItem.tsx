import { ICartItem } from 'ts/orders';

import CartIngredientItem from './CartIngredientItem';

import './CartItem.scss';

interface ICartItemProps {
    item: ICartItem;
}

const CartItem: React.FC<ICartItemProps> = ({ item }) => {
    // console.log('item in cartItem', item);

    const { pizzaId, imageUrl, title, sourceUrl, quantity, ingredients } = item;

    const ingredientsToRender = Object.values(ingredients);

    // console.log('ingredientsToRender', ingredientsToRender);

    return (
        <li className="cart-item">
            <div className="cart-item__heading">
                <div className="cart-item__img">
                    <img src={imageUrl} alt={title} />
                </div>
                <div className="cart-item__description">
                    <h5 className="cart-item__title">{title}</h5>
                    <a
                        className="cart-item__link"
                        href={sourceUrl}
                        target="_blank"
                        rel="noreferrer"
                    >
                        Check Online
                    </a>
                    <p className="cart-item__quantity">Quantity: {quantity}</p>
                </div>
            </div>

            <h4 className="cart-item__title--ingredients">Ingredients:</h4>
            <ul className="cart-item__list--ingredients">
                {ingredientsToRender &&
                    ingredientsToRender.length > 1 &&
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
