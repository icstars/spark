import React from 'react';
import { Helmet } from 'react-helmet';

function Login() {
    return (
        <div className="container">
            <Helmet>
                <title>Login</title>
            </Helmet>
            <div>
                <h1>Login</h1>
                <input name="input-login" defaultValue="Username"/>
                <input name="input-login" defaultValue="Password" />
                <button type="login-button">Login</button>
            </div>
        </div>
    );
}


export default Login;
