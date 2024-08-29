import { Link } from 'react-router-dom';
import React from 'react';

import '../right-panel-style.css';

const styles = {
    container: {
        width: '300px',
        margin: '0 auto',
        padding: '20px',
        border: '1px solid #ddd',
        borderRadius: '5px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    },
    header: {
        fontSize: '18px',
        marginBottom: '10px',
    },
    employeeList: {
        listStyle: 'none',
        padding: '0',
        margin: '0',
    },
    employeeItem: {
        display: 'flex',
        justifyContent: 'space-between',
        padding: '5px 0',
        borderBottom: '1px solid #eee',
    },
    loadMore: {
        display: 'block',
        width: '100%',
        padding: '10px',
        textAlign: 'center',
        backgroundColor: '#000',
        color: '#fff',
        textDecoration: 'none',
        borderRadius: '5px',
        marginTop: '10px',
        cursor: 'pointer',
    },
};

const employees = [
    { name: 'Employee Name', value: 20 },
    { name: 'Employee Name', value: 15 },
    { name: 'Employee Name', value: 29 },
    { name: 'Employee Name', value: 40 },
    { name: 'Employee Name', value: 25 },
];

const categoryScores = [
    { category: "Teamwork", score: 3 },
    { category: "Communication", score: 1 },
    { category: "Knowledge Application & Problem Solving", score: 3 },
    { category: "Code Aesthetics", score: 2 },
    { category: "Best Practices", score: 3 }
  ];

function pageDepDashboard() {
    return (
        <div>
            <div className="people-rand-list">
                <p>People</p>
                <p>Employee Name</p>
                <Link to="/People"><button className='btn btn-dark' type="button">Open more</button></Link>
            </div>
            {/* <div>
                <h3 className="category-scores">Category Scores</h3>
                <ul className='list-unstyled'>
                {categoryScores.map(category => <li><p>{category.category} {category.score}</p></li>)}
                </ul>
            </div> */}
            <div className="container mt-5 p-3 border rounded shadow-sm" style={{ maxWidth: '300px' }}>
            <h5 className="mb-3">People:</h5>
            <ul className="list-group">
                {employees.map((employee, index) => (
                    <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                        <span>{employee.name}</span>
                        <span>{employee.value}</span>
                    </li>
                ))}
            </ul>
            <button className="btn btn-dark btn-block mt-3">Open more</button>
        </div>
        </div>
    );
}

export default pageDepDashboard;
