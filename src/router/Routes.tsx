import { Routes, Route, Navigate } from 'react-router-dom';

import Main from 'pages/Main';
import Login from 'pages/Login';
import Orders from 'pages/Orders';
import CustomPizza from 'pages/CustomPizza';
import Addresses from 'pages/Addresses';
import Cart from 'pages/Cart';

interface IRoutesConfig {
    name: string;
    path: string;
    component: React.ReactNode;
}

const ROUTES_CONFIG: IRoutesConfig[] = [
    {
        name: 'Main',
        path: '/',
        component: <Main />
    },
    {
        name: 'Login',
        path: 'login',
        component: <Login />
    },
    {
        name: 'Orders',
        path: 'orders',
        component: <Orders />
    },
    {
        name: 'Custom',
        path: 'custom-pizza',
        component: <CustomPizza />
    },
    {
        name: 'Cart',
        path: 'cart',
        component: <Cart />
    },
    {
        name: 'Addresses',
        path: 'addresses',
        component: <Addresses />
    },
    {
        name: 'Not-Found',
        path: '*',
        component: <Navigate to="/" />
    }
];

const RoutesComponent: React.FC = () => {
    return (
        <>
            <Routes>
                {ROUTES_CONFIG.map(({ path, component }) => (
                    <Route key={path} path={path} element={component} />
                ))}

                {/* <Route path="/" element={<Main />} />
                <Route path="login" element={<Login />} />
                <Route path="orders" element={<Orders />} />
                <Route path="custom-pizza" element={<CustomPizza />} />
                <Route path="cart" element={<Cart />} />
                <Route path="*" element={<Navigate to="/" />} /> */}
            </Routes>
        </>
    );
};
export default RoutesComponent;
