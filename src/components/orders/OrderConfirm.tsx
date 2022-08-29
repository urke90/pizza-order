import React from 'react';
// import { useNavigate } from 'react-router-dom';

import Button from 'shared/form/Button';

import './OrderConfirm.scss';

interface IOrderConfirmProps {}

const OrderConfirm: React.FC<IOrderConfirmProps> = () => {
    // const navigate = useNavigate();

    return (
        <div className="order-confirm">
            <header className="order-confirm__header">
                <h3>Order has been added to the cart!</h3>
            </header>
            <p>Continue shopping or go to cart?</p>
            <div className="order-confirm__buttons-wrapper">
                <Button type="button" onClick={() => {}}>
                    continue
                </Button>

                <Button type="button" onClick={() => {}}>
                    cart
                </Button>
            </div>
        </div>
    );
};
export default OrderConfirm;
