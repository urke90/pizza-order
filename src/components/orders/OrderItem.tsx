interface IOrderItemProps {
    title: string;
    quantity: number;
}

const OrderItem: React.FC<IOrderItemProps> = ({ title, quantity }) => {
    return (
        <li className="order__item">
            <span className="order__item--title">{title}</span>{' '}
            <span className="order__item--quantity">{quantity.toFixed(2)}</span>
        </li>
    );
};

export default OrderItem;
