import { Link } from 'react-router-dom';
import React from 'react';

import '../right-panel-style.css';

function pageDepDashboard() {
    return (
        <div>
            <div className="people-rand-list">
            <h2 className='title-list-people'>Employee</h2> 
                <ul>
                <li> Jim Jones 20 </li>
                <li> Bob Gates 15 </li>
                <li> Eva Ryan 29 </li>
                <li> Tom Perez 40 </li>
                <li> Rita Khan 25 </li>
                </ul>
                <Link to="/People"><button type="button">Open more</button></Link>
            </div>
            <div>
                <h3 className="category-scores">Category Scores</h3>
                <ul>
                <li>Teamwork 3</li>
                <li>Communication 1</li>
                <li>Knowledge Application & Problem Solving 3</li>
                <li>Code Aesthetics 2</li>
                <li>Best Practices 3</li>
                </ul>
            </div>
        </div>
    );
}

export default pageDepDashboard;
