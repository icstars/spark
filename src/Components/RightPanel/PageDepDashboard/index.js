import { Link } from 'react-router-dom';
import React from 'react';
function pageDepDashboard() {
    return (

        <div>
            <div className="people-rand-list">
                <p>People</p>
                <p>Employee Name</p>
                <Link to="/People"><button type="button">Open more</button></Link>
            </div>
            <div className="topic-scores">
            <p>Topic scores</p>
            <p>Topic name</p>
            </div>
        </div>

    );
}

export default pageDepDashboard;
