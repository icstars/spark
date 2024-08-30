import { Link } from 'react-router-dom';
import React from 'react';

import '../right-panel-style.css';

function pageDepDashboard() {
    return (
        <div className='col-auto'>
            <div className="row flex-column gy-3 people-rand-list">
                <p>People</p>
                <p>Employee Name</p>
                <Link to="/People" className='btn btn-dark'>
                    Open more
                </Link>
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
