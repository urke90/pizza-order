import React from 'react';
import Button from 'shared/form/Button';

import './OrderConfirm.scss';

interface IOrderConfirmProps {}

const OrderConfirm: React.FC<IOrderConfirmProps> = () => {
    return (
        <div className="order-confirm__wrapper">
            <h3>Order has been added to the cart</h3>
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
