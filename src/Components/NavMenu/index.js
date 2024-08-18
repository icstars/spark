import { Link } from 'react-router-dom';
import React from 'react';

import profile_icon from "./img/profile_icon.svg";
import metrics_icon from "./img/metrics_icon.svg";
import people_icon from "./img/people_icon.svg";

function NavMenu() {

    return (
    
        <div>

            <ul className='nav-menu'>
                <div className='nav-element'>
                    <li>
                        <img className='nav-element-icon' src={profile_icon} alt="Home icon"></img>
                        <Link className='nav-element-link nav-element-link-1' to="/">Home</Link>
                    </li>
                </div>
                <div className='nav-element'>
                    <li>
                        <img className='nav-element-icon' src={metrics_icon} alt="DeptMetricsIcon"></img>
                        <Link className='nav-element-link nav-element-link-2' to="/DepMetrics">Department metrics</Link>
                    </li>
                </div>  
                <div className='nav-element'>
                    <li>
                        <img className='nav-element-icon' src={people_icon} alt="icon"></img>
                        <Link className='nav-element-link nav-element-link-3' to="/People">People</Link>
                    </li>
                </div>
                {/* <li><Link to="/Charts/LineChart">Charts</Link></li> */}
            </ul>
        </div>
    );
};

export default NavMenu;
