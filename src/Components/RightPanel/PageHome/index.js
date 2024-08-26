import { Link } from 'react-router-dom';
import React from 'react';
<<<<<<< HEAD
function pageHome() {
=======

function PageHome({ userId }) {
>>>>>>> main
    return (
        <div>
            <div className="right-panel-view-evaluation-button">
                <Link className="evaluation-button" to="/EvalOverlook">
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
