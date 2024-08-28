import { Link } from 'react-router-dom';
import React from 'react';

import '../right-panel-style.css';

function PageHome({ userId }) {
    return (
        <div>
            <div className="row flex-column gy-3 right-panel-view-evaluation-button">
                <Link to={`/View/${userId}`}>
                    <button className='col-12 py-1 btn btn-dark' type="button">View evaluation</button>
                </Link>
                <Link to={`/Eval/${userId}`}>
                    <button className='col-12 py-1 btn btn-dark' type="button">Evaluation</button>
                </Link>
            </div>
        </div>
    );
}

export default PageHome;