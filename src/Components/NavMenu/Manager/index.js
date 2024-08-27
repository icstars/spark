import { Link, useLocation } from 'react-router-dom';
import React from 'react';

import '../nav-menu-style.css';

import profile_icon from "./img/profile_icon.svg";
import metrics_icon from "./img/metrics_icon.svg";
import people_icon from "./img/people_icon.svg";

function NavMenu() {
    const userId = localStorage.getItem('userId');
    const location = useLocation();
    
    return (
        <div>
            <ul className='nav-menu'>
                <div className={`nav-element ${location.pathname === `/home/${userId}` ? 'active' : ''}`}>
                    <Link className='nav-text' to={`/home/${userId}`}>
                        <li className='nav-element-link'>

                            <img className='nav-element-icon' src={profile_icon} alt="Home icon"></img>Home

                        </li>
                    </Link>
                </div>
                <div className={`nav-element ${location.pathname === `/DepMetrics` ? 'active' : ''}`}>
                    <Link className='nav-text' to="/DepMetrics">
                        <li className='nav-element-link'>

                            <img className='nav-element-icon' src={metrics_icon} alt="DeptMetricsIcon"></img>Department metrics

                        </li>
                    </Link>
                </div>
                <div className={`nav-element ${location.pathname === `/People` ? 'active' : ''}`}>
                    <Link className='nav-text' to="/People">
                        <li className='nav-element-link'>

                            <img className='nav-element-icon' src={people_icon} alt="icon"></img><div className='nav-text'>People</div>

                        </li>
                    </Link>
                </div>
            </ul>
        </div>
    );
};

export default NavMenu;