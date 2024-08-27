import React from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import profile_icon from "./img/profile_icon.svg";
import logo_icon from "./img/spark_logo_icon.png";
import { useNavigate } from 'react-router-dom'; // for redirecting to other pages after logout
import BurgerMenu from '../BurgerMenu';

import './header-style.css';

function Header() {
    const userId = localStorage.getItem('userId');
    const navigate = useNavigate();
    const location = useLocation(); // Correctly use location here

    // Clean our data about the user
    const handleLogout = () => {
        localStorage.removeItem('userId');
        localStorage.removeItem('username');
        localStorage.removeItem('isAuthenticated');
        localStorage.removeItem('isAdmin');
        localStorage.removeItem('isManager');
        navigate('/Login'); // Going to login page
    }

    // Use the correct method to check if the pathname includes '/Eval'
    const displayBurger = location.pathname.includes('/Eval');

    return (
        <div className="main-header">
            <div className="logo-wrapper">
                {displayBurger && <BurgerMenu />}
                <Link className='nav-text' to={`/home/${userId}`}>
                    <img className="logo-icon" src={logo_icon} alt="logo-img"></img>
                </Link>
            </div>
            <input type="text" className="searchinput" placeholder="Search.." />
            <div className="header-login-element">
                <button onClick={handleLogout}>Logout</button>
                <img src={profile_icon} alt="profile-img"></img>
            </div>
            <nav className="main-nav">
            </nav>
        </div>
    );
}

export default Header;
