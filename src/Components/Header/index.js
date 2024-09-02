import React from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import profile_icon from "./img/profile_icon.svg";
import logo_icon from "./img/spark_logo_icon.png";
import { useNavigate } from 'react-router-dom'; // for redirecting to other pages after logout
import BurgerMenu from '../BurgerMenu';
import HeaderInfo from '../HeaderInfo';
import './header-style.css';

function Logo({ userId }) {
    return (
        <Link className='col-auto p-0' to={`/home/${userId}`}>
            <img className="logo-icon" src={logo_icon} alt="logo-img"></img>
        </Link>
    )
}

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
    const displayBurger = location.pathname.includes('/Eval') || location.pathname.includes('/View');

    return (
        <>
        
            <header className='row align-items-center m-0 position-fixed w-100 bg-white pb-1 px-4'>
                {displayBurger && <BurgerMenu />}
                <Logo userId={userId} />
                <HeaderInfo userId={userId} />
                <button className='btn btn-dark col-auto' onClick={handleLogout}>Logout</button>
            </header>
            <div className='p-5 bg-white'></div>
        </>

    );
}

export default Header;
