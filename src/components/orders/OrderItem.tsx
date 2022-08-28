interface IOrderItemProps {
    title: string;
    quantity: number;
}

const OrderItem: React.FC<IOrderItemProps> = ({ title, quantity }) => {
    console.log('OrderItem.tsx title', title);
    console.log('OrderItem.tsx quantity', quantity);

    return <li>OrderItem component</li>;
};
export default OrderItem;
