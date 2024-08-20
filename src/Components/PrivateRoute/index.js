import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children, allowedRoles = [] }) => {
    // const userId = localStorage.getItem('userId');
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true'; // check isAuthenticated 
    const isAdmin = localStorage.getItem('isAdmin') === 'true';
    const isManager = localStorage.getItem('isManager') === 'true';

    const userRoles = [];
    if (isAdmin) userRoles.push('admin');
    if (isManager) userRoles.push('manager');
    if (!isAdmin && !isManager) userRoles.push('employee');

    // Determine if the user has access based on allowedRoles


    const hasAccess = isAuthenticated && allowedRoles.some(role => userRoles.includes(role));

    console.log(userRoles);
    return hasAccess ? children : <Navigate to="/Login" />;

    // // If not loged it, going to login page
    // if (!userId) {
    //     return <Navigate to="/Login" />;
    // }

    // // if already login, render component
    // return children;
};

export default PrivateRoute;
