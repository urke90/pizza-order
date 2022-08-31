import { Navigate } from 'react-router-dom';

import './Cart.scss';

import React from 'react';

interface ICartProps {}

const NotFound: React.FC<ICartProps> = () => {
    return <div className="cart">this is cart page</div>;
};

export default NotFound;
