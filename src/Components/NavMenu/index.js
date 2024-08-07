import { Link } from 'react-router-dom';
import React from 'react';

function NavMenu() {
    return (
        <div>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/DepMetrics">Department metrics</Link></li>
            <li><Link to="/People">People</Link></li>
            <li><Link to="/Charts/LineChart">Charts</Link></li>
        </div>
    );
}

export default NavMenu;
