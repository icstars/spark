import { Link } from 'react-router-dom';
import React, { useState } from 'react';

function PageHome({ user, userId, isEvaluationExists }) {
    const [isRoleAdmin, setIsRoleAdmin] = useState(false);

    const isAdmin = localStorage.getItem('isAdmin') === 'true';
    const isManager = localStorage.getItem('isManager') ==='true'

    console.log("admin?", isAdmin);
    return (
        <div className='col-auto right-panel-width'>
            <div className="row flex-column gy-3 right-panel-view-evaluation-button">
                {isAdmin && (
                    <Link to={`/EditUser/${userId}`} className='col-12 py-1 btn btn-dark'>
                        Edit User
                    </Link>
                )}

                {isEvaluationExists && ( // Conditionally render the Evaluation button
                    <Link to={`/View/${userId}`} className='col-12 py-1 btn btn-dark'>
                        View evaluation
                    </Link>
                )}
                {!isEvaluationExists &&( isAdmin || isManager) &&( // Conditionally render the Evaluation button
                    <Link to={`/Eval/${userId}`} className='col-12 py-1 btn btn-dark'>
                        Evaluation
                    </Link>
                )}
            </div>
        </div>
    );
}

export default PageHome;