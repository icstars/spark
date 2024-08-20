import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    const userId = localStorage.getItem('userId');

    // If not loged it, going to login page
    if (!userId) {
        return <Navigate to="/Login" />;
    }

    // if already login, render component
    return children;
};

export default PrivateRoute;
