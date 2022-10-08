import { useState } from 'react';
import { AiFillCloseCircle } from 'react-icons/ai';

import { IOrder } from 'ts/orders-cart';

import OrderAddressItem from './OrderAddressItem';
import OrderItem from './OrderItem';
import Backdrop from 'shared/ui/Backdrop';

import './OrderList.scss';

interface IOrdersListProps {
    order: IOrder;
}

const OrderList: React.FC<IOrdersListProps> = ({ order }) => {
    const [showOrderItems, setShowOrderItems] = useState(false);

    const { items, totalPrice, address } = order;
    const { city, street } = address;

    const handleToggleOrderItems = () => {
        setShowOrderItems((prevShowState) => !prevShowState);
    };

    return (
        <div className="order-list">
            <OrderAddressItem
                city={city}
                street={street}
                totalPrice={totalPrice}
                totalItems={items.length}
                onToggleOrderItems={handleToggleOrderItems}
            />
            <ul
                className={`order-list__dropdown ${
                    showOrderItems
                        ? 'order-list__dropdown--slide-down'
                        : 'order-list__dropdown--slide-up'
                }`}
            >
                <Backdrop
                    show={showOrderItems}
                    onClose={() => setShowOrderItems(false)}
                />
                {showOrderItems && (
                    <li className="order-list__dropdown-actions">
                        <p>Total Items: {items.length}</p>
                        <AiFillCloseCircle
                            className="order-list__dropdown-button"
                            onClick={handleToggleOrderItems}
                        />
                    </li>
                )}
                {items.length > 0 &&
                    items.map((item) => (
                        <OrderItem
                            key={item.pizzaId}
                            orderItem={item}
                            showItem={showOrderItems}
                        />
                    ))}
            </ul>
        </div>
    );
};

export default OrderList;
