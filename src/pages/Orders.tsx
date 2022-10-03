import { useEffect } from 'react';
import { asyncGetOrders } from 'redux/actions/orders-actions';
import { useAppSelector, useAppDispatch } from 'hooks/use-redux';
import { uidSelector } from 'redux/reducers/auth-reducer';
import { ordersSelectors } from 'redux/reducers/orders-reducer';

import OrderList from 'components/orders/OrderList';
import LoadingSpinner from 'shared/ui/LoadingSpinner';

import './Orders.scss';

const Orders: React.FC = () => {
    const dispatch = useAppDispatch();
    const uid = useAppSelector(uidSelector);
    const isLoading = useAppSelector(ordersSelectors.isLoading);
    const orders = useAppSelector(ordersSelectors.orders);
    const error = useAppSelector(ordersSelectors.error);

    const ordersToRender = Object.values(orders);

    useEffect(() => {
        if (uid) {
            dispatch(asyncGetOrders(uid));
        }
    }, [dispatch, uid]);

    // Fallback content
    if (isLoading) {
        return <LoadingSpinner asOverlay />;
    } else if (!isLoading && ordersToRender.length === 0 && !error) {
        return (
            <section className="orders">
                <h2 className="orders__heading">You have no orders to show!</h2>
            </section>
        );
    } else if (!isLoading && error) {
        return (
            <section className="orders">
                <h2 className="orders__heading">{error}</h2>
            </section>
        );
    }

    return (
        <section className="orders">
            <h2 className="orders__heading">Your Orders</h2>
            <div className="orders__container">
                {ordersToRender.length > 0 &&
                    ordersToRender.map((orderItem) => (
                        <OrderList
                            key={orderItem.orderId}
                            orderItem={orderItem}
                        />
                    ))}
            </div>
        </section>
    );
};
export default Orders;

//"auth != null" ===> firebase rules
