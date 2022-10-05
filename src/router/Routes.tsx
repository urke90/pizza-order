import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import LoadingSpinner from 'shared/ui/LoadingSpinner';

const Main = lazy(() => import('../pages/Main'));
const Login = lazy(() => import('../pages/Login'));
const Orders = lazy(() => import('../pages/Orders'));
const CustomPizza = lazy(() => import('../pages/CustomPizza'));
const Addresses = lazy(() => import('../pages/Addresses'));
const Cart = lazy(() => import('../pages/Cart'));

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
        <Suspense fallback={<LoadingSpinner asOverlay />}>
            <Routes>
                {ROUTES_CONFIG.map(({ path, component }) => (
                    <Route key={path} path={path} element={component} />
                ))}
            </Routes>
        </Suspense>
    );
};
export default RoutesComponent;
