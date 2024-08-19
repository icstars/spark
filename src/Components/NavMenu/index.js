import { Link } from 'react-router-dom';
import React from 'react';

function NavMenu() {
<<<<<<< Updated upstream
    return (
        <div className='nav-menu-links'>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/DepMetrics">Department metrics</Link></li>
            <li><Link to="/People">People</Link></li>
            {/* <li><Link to="/Charts/LineChart">Charts</Link></li> */}
=======
    const userId = localStorage.getItem('userId');

    return (

        <div>

            <ul className='nav-menu'>
                <div className='nav-element'>
                    <li>
                        <img className='nav-element-icon' src={profile_icon} alt="Home icon"></img>
                        <Link className='nav-element-link nav-element-link-1' to={`/home/${userId}`}>Home</Link>
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
>>>>>>> Stashed changes
        </div>
    );
}

export default NavMenu;
