import { IOrder } from 'ts/orders-cart';

import OrderItem from './OrderItem';
import './OrderList.scss';

interface IOrdersListProps {
    orderItem: IOrder;
}

const OrderList: React.FC<IOrdersListProps> = ({ orderItem }) => {
    const { items, totalPrice } = orderItem;

    console.log('orderItem in OrderList.tsx', orderItem);

    return (
        <ul className="order-list">
            {items.length > 0 &&
                items.map((item) => (
                    <OrderItem key={item.pizzaId} order={item} />
                ))}
        </ul>
    );
};

export default OrderList;
