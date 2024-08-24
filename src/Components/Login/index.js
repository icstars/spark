import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom'; // for redirecting to other pages after login
import axios from 'axios'; // or use fetch
import './login-style.css';

function Login() {
    
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await axios.post('http://localhost:5212/login', {
                username,
                password
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
    
            console.log('Server response:', response.data); // just conslole output for a check of our server response
    
            if (response.data.success) {
                const isAdmin = response.data.isAdmin || false;
                const isManager = response.data.isManager || false;
                const userId = response.data.id;
    
                localStorage.setItem('isAuthenticated', 'true');
                localStorage.setItem('isAdmin', isAdmin);
                localStorage.setItem('isManager', isManager);
                localStorage.setItem('userId', userId);
                localStorage.setItem('username', response.data.username);
    
                console.log('User ID:', userId);
                console.log('Is Admin:', isAdmin);
                console.log('Is Manager:', isManager); // just conslole output for a check
    
                if (userId) {
                    navigate(`/home/${userId}`);
                } else {
                    console.error('User ID is undefined');
                }
            } else {
                setError(response.data.message);
            }
        } catch (error) {
            setError('Login failed. Please try again.');
            console.error(error);
        }
    };
    
    return (
        <div className="login-wrapper">
            <Helmet>
                <title>Login</title>
            </Helmet>

            <h1 className="login-title">Login</h1>
            <input
                name="input-login"
                className='login-input-field'
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                name="input-login"
                className='login-input-field'
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button type="button" className="login-buttom" onClick={handleLogin}>Login</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}

        </div>
    );
}

export default Login;
