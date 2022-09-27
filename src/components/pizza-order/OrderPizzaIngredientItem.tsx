import './OrderConfirmItem.scss';

interface IOrderConfirmItemProps {
    title: string;
    quantity: number;
    isPizzaItem?: boolean;
}

const OrderConfirmItem: React.FC<IOrderConfirmItemProps> = ({
    title,
    quantity,
    isPizzaItem
}) => {
    const quanityToDisplay = isPizzaItem ? quantity : quantity.toFixed(2);

    return (
        <li className="order-confirm-item">
            <span className="order-item__title">{title}</span>{' '}
            <span className="order-item__quantity">{quanityToDisplay}</span>
        </li>
    );
};

export default OrderConfirmItem;

/**
 *  ADD PIZZA TO ORDER ====> tu su mi samo sastojicu od pizze i qty
 *  CONFIRM ORDER ====> tu prikazujem title pizze i qty pizze
 *
 * * ZA ORDERS PAGE TREBA DA IMAM LISTU ORDERA GDE SVAKI ORDER IMA INFO ZA PIZZU I ADRESU
 */
