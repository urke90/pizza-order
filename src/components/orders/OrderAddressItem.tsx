import Button from 'shared/form/Button';

import './OrderAddressItem.scss';

interface IOrderAddressItemProps {
    city: string;
    street: string;
    totalItems: number;
    totalPrice: number;
    onToggleOrderItems: () => void;
}

const OrderAddressItem: React.FC<IOrderAddressItemProps> = ({
    city,
    street,
    totalItems,
    totalPrice,
    onToggleOrderItems
}) => {
    return (
        <div className="order-address">
            <h4 className="order-address__heading">Address</h4>
            <p className="order-address__description">
                <span className="order-address__description-label">City:</span>
                {city}
            </p>
            <p className="order-address__description">
                <span className="order-address__description-label">
                    Street:
                </span>
                {street}
            </p>
            <p className="order-address__description">
                <span className="order-address__description-label">
                    Total Pizza Items:
                </span>
                <span className="color--red">{totalItems}</span>
            </p>
            <p className="order-address__description order-address__description-price">
                <span className="order-address__description-label">
                    Total Price:
                </span>
                {totalPrice.toFixed(2)} $
            </p>
            <div className="order-address__actions">
                <Button type="button" onClick={onToggleOrderItems}>
                    Show Items
                </Button>
            </div>
        </div>
    );
};
export default OrderAddressItem;
