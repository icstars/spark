import { Link } from 'react-router-dom';
import React from 'react';

import '../right-panel-style.css';

function PageHome({ userId }) {
    return (
        <div className='col-auto'>
            <div className="row flex-column gy-3 right-panel-view-evaluation-button">
                <Link to={`/View/${userId}`} className='col-12 py-1 btn btn-dark'>
                    View evaluation
                </Link>
                <Link to={`/Eval/${userId}`} className='col-12 py-1 btn btn-dark'>
                    Evaluation
                </Link>
            </div>
        </div>
    );
}

export default PageHome;