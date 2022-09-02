import React, { useEffect } from 'react';

import CartItem from 'components/cart/CartItem';
import { useAppSelector } from 'hooks/useRedux';

import './Cart.scss';

interface ICartProps {}

const Cart: React.FC<ICartProps> = () => {
    const cart = useAppSelector((state) => state.ordersReducer.cart);

    console.log('cart', cart);

    const cartItems = Object.values(cart);

    console.log('cartItems', cartItems);
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
                            <CartItem key={cartItem.id} item={cartItem} />
                        ))}
                </ul>
            </div>
        </div>
    );
};

export default Cart;
