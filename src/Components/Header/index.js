import React from 'react';
import profile_icon from "./img/profile_icon.svg";
import { useNavigate } from 'react-router-dom'; // for redirecting to other pages after logout

function Header() {
    const navigate = useNavigate();
    //clean our data about the user
    const handleLogout = () => {
        localStorage.removeItem('userId');
        localStorage.removeItem('username');
        localStorage.removeItem('isAuthenticated');
        localStorage.removeItem('isAdmin');
        localStorage.removeItem('isManager');
        navigate('/Login'); //going to login page
    }

    return (
        <div className="main-header">
            <div className="logo-wrapper">
                <img src={profile_icon} alt="logo-img"></img>
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
