import React from 'react';

function Login() {
    return (
        <div className="container">
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
