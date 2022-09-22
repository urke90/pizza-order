import { useAppSelector, useAppDispatch } from 'hooks/useRedux';
import { createCartOrder } from 'redux/actions/cartActions';

import CartItem from 'components/cart/CartItem';
import Button from 'shared/form/Button';
import './Cart.scss';

interface ICartProps {}

const Cart: React.FC<ICartProps> = () => {
    const dispatch = useAppDispatch();
    const cart = useAppSelector((state) => state.cartReducer.cart);
    const uid = useAppSelector((state) => state.authReducer.uid);

    console.log('cart', cart);

    const cartItems = Object.values(cart);

    const handleCreateOrder = () => {
        const cartItems = Object.values(cart);
        console.log('cartItems', cartItems);

        dispatch(createCartOrder({ uid, cartItems }));
    };

    // console.log('cartItems', cartItems);
    return (
        <div className="cart">
            <header className="cart__header">
                <h2>Your Cart</h2>
            </header>
            <div className="cart__container">
                <ul className="cart__list">
                    {cartItems &&
                        cartItems.length > 0 &&
                        cartItems.map((cartItem) => (
                            <CartItem key={cartItem.pizzaId} item={cartItem} />
                        ))}
                </ul>
            </div>
            {cartItems.length > 0 && (
                <div className="cart__actions">
                    <Button type="button" onClick={handleCreateOrder}>
                        Create order
                    </Button>
                </div>
            )}
        </div>
    );
};

export default Cart;
