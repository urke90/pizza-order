import { useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from 'hooks/use-redux';
import { useModal } from 'hooks/use-modal';
import { addressesSelector } from 'redux/reducers/address-reducer';
import { asyncCreateOrder } from 'redux/actions/orders-actions';
import { asyncGetAddresses } from 'redux/actions/address-actions';
import { IOrderItem } from 'ts/orders-cart';
import { removeSelectedAddressId } from 'redux/reducers/address-reducer';
import { resetCart } from 'redux/reducers/cart-reducer';

import CartItem from 'components/cart/CartItem';
import OrderConfirm from 'components/orders/OrderConfirm';
import Button from 'shared/form/Button';
import Modal from 'shared/ui/Modal';
import LoadingSpinner from 'shared/ui/LoadingSpinner';

import './Cart.scss';

const Cart: React.FC = () => {
    const dispatch = useAppDispatch();
    const [showModal, handleToggleModal] = useModal();
    const cart = useAppSelector((state) => state.cartReducer.cart);
    const uid = useAppSelector((state) => state.authReducer.uid);
    const isLoadingAddresses = useAppSelector(addressesSelector.isLoading);
    const addresses = useAppSelector(addressesSelector.addresses);
    const selectedAddressId = useAppSelector(
        addressesSelector.selectedAddressId
    );
    const addressesItems = Object.values(addresses);
    const cartItems = Object.values(cart);

    useEffect(() => {
        if (uid) {
            dispatch(asyncGetAddresses(uid));
        }
    }, [dispatch, uid]);

    const handleCreateOrder = useCallback(() => {
        const address = addresses[selectedAddressId];

        const data: IOrderItem[] = cartItems.map((cartItem) => ({
            ...cartItem,
            address
        }));

        dispatch(asyncCreateOrder({ uid, data }));
        dispatch(removeSelectedAddressId());
        dispatch(resetCart());
        handleToggleModal();
    }, [
        dispatch,
        handleToggleModal,
        selectedAddressId,
        addresses,
        cartItems,
        uid
    ]);

    let orderButton: React.ReactNode | null = null;

    if (cartItems.length > 0 && addressesItems.length === 0) {
        orderButton = (
            <>
                <h3>Please add an address before creating an order</h3>
                <div className="cart__link">
                    <Link to="/addresses">
                        <Button type="button">Addresses</Button>
                    </Link>
                </div>
            </>
        );
    } else if (cartItems.length > 0 && addressesItems.length > 0) {
        orderButton = (
            <Button
                type="button"
                onClick={handleToggleModal}
                disabled={cartItems.length === 0}
            >
                Create order
            </Button>
        );
    }

    if (isLoadingAddresses) {
        return <LoadingSpinner asOverlay />;
    } else if (!isLoadingAddresses && cartItems.length === 0) {
        return (
            <div className="cart">
                <header className="cart__header">
                    <h3>
                        You don't have any items in the cart. Start adding some?
                    </h3>
                    <div className="cart__link">
                        <Link to="/">
                            <Button type="button">Pizza</Button>
                        </Link>
                    </div>
                </header>
            </div>
        );
    }

    return (
        <>
            <Modal
                headerTitle="Your Order"
                onClose={handleToggleModal}
                show={showModal}
                footer={
                    <Button
                        type="button"
                        onClick={handleCreateOrder}
                        disabled={!selectedAddressId}
                    >
                        Confirm
                    </Button>
                }
            >
                <OrderConfirm
                    cartItems={cartItems}
                    addresses={addressesItems}
                />
            </Modal>
            <div className="cart">
                <header className="cart__header">
                    <h2>Your Cart</h2>
                </header>
                <div className="cart__container">
                    <ul className="cart__list">
                        {cartItems.length > 0 &&
                            cartItems.map((cartItem) => (
                                <CartItem
                                    key={cartItem.pizzaId}
                                    item={cartItem}
                                />
                            ))}
                    </ul>
                </div>
                <div className="cart__actions">{orderButton}</div>
            </div>
        </>
    );
};

export default Cart;
