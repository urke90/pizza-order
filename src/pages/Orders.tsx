import { useEffect } from 'react';
import { asyncGetOrders } from 'redux/actions/ordersActions';
import { useAppSelector, useAppDispatch } from 'hooks/useRedux';
import { uidSelector } from 'redux/reducers/authReducer';
import { ordersSelectors } from 'redux/reducers/ordersReducer';

import './Orders.scss';

const Orders: React.FC = () => {
    const dispatch = useAppDispatch();
    const uid = useAppSelector(uidSelector);
    const isLoading = useAppSelector(ordersSelectors.isLoading);
    const orders = useAppSelector(ordersSelectors.orders);

    useEffect(() => {
        if (uid) {
            dispatch(asyncGetOrders(uid));
        }
    }, [dispatch, uid]);

    return (
        <section className="orders">
            <header className="orders__header">
                <h2>Your Orders</h2>
            </header>
        </section>
    );
};
export default Orders;

//"auth != null" ===> firebase rules
