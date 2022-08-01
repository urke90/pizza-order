import { Navigate } from 'react-router-dom';

import React from 'react';

type NotFoundProps = {};

const NotFound: React.FC<NotFoundProps> = () => {
    return <Navigate to="/" />;
};
export default NotFound;
