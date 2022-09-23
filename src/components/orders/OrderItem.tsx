import './OrderItem.scss';

interface IOrderItemProps {
    title: string;
    quantity: number;
    isPizzaItem?: boolean;
}

const OrderItem: React.FC<IOrderItemProps> = ({
    title,
    quantity,
    isPizzaItem
}) => {
    const quanityToDisplay = isPizzaItem ? quantity : quantity.toFixed(2);

    return (
        <li className="order-item">
            <span className="order-item__title">{title}</span>{' '}
            <span className="order-item__quantity">{quanityToDisplay}</span>
        </li>
    );
};

export default OrderItem;
