import { Link } from 'react-router-dom';
import React from 'react';

import profile_icon from "./img/profile_icon.svg";
import metrics_icon from "./img/metrics_icon.svg";
import people_icon from "./img/people_icon.svg";

function NavMenu() {
    const userId = localStorage.getItem('userId');

    return (
        <div>
            <ul className='nav-menu'>
                <div className='nav-element'>
                    <li>
                        <Link className='nav-element-link' to={`/home/${userId}`}>
                            <img className='nav-element-icon' src={profile_icon} alt="Home icon"></img>Home
                        </Link>
                    </li>
                </div>
                <div className='nav-element'>
                    <li>
                        <Link className='nav-element-link' to="/DepMetrics">
                            <img className='nav-element-icon' src={metrics_icon} alt="DeptMetricsIcon"></img>Department metrics
                        </Link>
                    </li>
                </div>
                <div className='nav-element'>
                    <li>
                        <Link className='nav-element-link' to="/People">
                            <img className='nav-element-icon' src={people_icon} alt="icon"></img>People
                        </Link>
                    </li>
                </div>
            </ul>
        </div>
    );
};

export default NavMenu;