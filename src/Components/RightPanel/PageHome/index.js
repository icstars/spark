import { Link } from 'react-router-dom';
import React from 'react';

import '../right-panel-style.css';

function PageHome({ userId }) {
    return (
        <div>
            <div className="right-panel-view-evaluation-button">
                <Link className="evaluation-button" to={`/View/${userId}`}>
                    <button type="button">View evaluation</button>
                </Link>
                <Link className="evaluation-button" to={`/Eval/${userId}`}>
                    <button type="button">Evaluation</button>
                </Link>
            </div>
        </div>
    );
}

export default PageHome;