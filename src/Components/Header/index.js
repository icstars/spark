import React from 'react';
import {Link} from 'react-router-dom';
import profile_icon from "./img/profile_icon.svg";


function Header() {
    return (

        <div className="main-header">
            <div className="logo-wrapper">
                <img src={profile_icon} alt="logo-img"></img>
            </div>

            <input type="text" className="searchinput" placeholder="Search.." />
            <div className="header-login-element">
                <Link to="/Login">Login</Link>
                <img src={profile_icon} alt="profile-img"></img>
            </div>
            
            <nav className="main-nav">
            </nav>
        </div>

    );
}

export default Header;
