import { Routes, Route, Navigate } from 'react-router-dom';

import Main from 'pages/Main';
import Login from 'pages/Login';
import Orders from 'pages/Orders';
import CustomPizza from 'pages/CustomPizza';
import NotFound from 'pages/NotFound';

const ROUTES_CONFIG = [
    {
        name: 'Main',
        path: '/',
        component: Main
    },
    {
        name: 'Login',
        path: 'login',
        component: Login
    },
    {
        name: 'Orders',
        path: 'orders',
        component: Orders
    },
    {
        name: 'Custom',
        path: 'custom-pizza',
        component: CustomPizza
    },
    {
        name: '404',
        path: '*',
        component: NotFound
    }
];

type RoutesProps = {};

const RoutesComponent: React.FC<RoutesProps> = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<Main />} />
                <Route path="login" element={<Login />} />
                <Route path="orders" element={<Orders />} />
                <Route path="custom-pizza" element={<CustomPizza />} />
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </>
    );
};
export default RoutesComponent;
