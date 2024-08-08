import { Link } from 'react-router-dom';
import React from 'react';
function pageHome() {
    return (

        <div classname="container">
            <div>
            <Link to="/EvalOverlook"><button type="button">View evaluation</button></Link>
                
            </div>
        </div>

    );
}

export default pageHome;
