import React from 'react';

import OrderItem from './OrderItem';
import './OrderList';

interface IOrdersListProps {}

const OrderList: React.FC<IOrdersListProps> = () => {
    return <ul className="order-list">orders list</ul>;
};
export default OrderList;
