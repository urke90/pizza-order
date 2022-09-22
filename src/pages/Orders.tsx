import React, { useEffect } from 'react';
import axiosRequest from 'api/axios.config';
import { DB_ENDPOINTS } from 'api/endpoints';
import { useAppSelector } from 'hooks/useRedux';
import { uidSelector } from 'redux/reducers/authReducer';

const Orders: React.FC = () => {
    const uid = useAppSelector(uidSelector);
    console.log('uid in orders', uid);

    useEffect(() => {
        const fetchOrders = async () => {
            const url = DB_ENDPOINTS.orders + uid + '.json';

            try {
                const response = await axiosRequest({ url, method: 'GET' });
                // console.log('response FETHCED ORDERS', response);

                const fetchedArrays: any[] = Object.values(response.data);
                console.log('arrays', fetchedArrays);

                let fletArr = fetchedArrays.flat();
                console.log('fletArr', fletArr);

                let forEachArray: any[] = [];

                fetchedArrays.forEach((arr) => {
                    arr.forEach((nestArr: any[]) => {
                        forEachArray.push(nestArr);
                    });
                });

                console.log('forEachArray', forEachArray);
            } catch (error) {
                console.log('error', error);
            }
        };

        if (uid.trim() !== '') {
            fetchOrders();
        }
    }, [uid]);

    return <div>Orders page</div>;
};
export default Orders;

//"auth != null" ===> firebase rules
