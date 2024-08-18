import { Link } from 'react-router-dom';
import React from 'react';
function pageHome() {
    return (

        <div>
            <div className="right-panel-view-evaluation-button">
                <Link className="evaluation-button" to="/EvalOverlook"><button type="button">View evaluation</button></Link>
            </div>
        </div>

    );
}

export default pageHome;
