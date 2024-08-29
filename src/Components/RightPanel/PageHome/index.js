import { Link } from 'react-router-dom';
import React from 'react';

import '../right-panel-style.css';

function PageHome({ userId, isEvaluationExists }) {
    return (
        <div>
            <div className="row flex-column gy-3 right-panel-view-evaluation-button">
                <Link to={`/View/${userId}`} className='col-12 py-1 btn btn-dark'>
                    View evaluation
                </Link>
                {!isEvaluationExists && ( // Conditionally render the Evaluation button
                    <Link to={`/Eval/${userId}`} className='col-12 py-1 btn btn-dark'>
                        Evaluation
                    </Link>
                )}
            </div>
        </div>
    );
}

export default PageHome;