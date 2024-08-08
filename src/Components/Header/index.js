import React from 'react';
import {Link} from 'react-router-dom';
function Header() {
    return (
        <div className="main-header">
            <div className="logo-wrapper">
            </div>
            <h1>Header</h1>
            <input type="text" className="searchinput" placeholder="Search.." />
            <Link to="/Login">Login</Link>
            <nav className="main-nav">
                
            </nav>
        </div>

    );
}

export default Header;
