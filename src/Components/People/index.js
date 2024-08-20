import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import { Link } from 'react-router-dom';

function People() {
    const [people, setPeople] = useState([]);
    const [error, setError] = useState('');

    // const [departments, setDepartments] = useState([]);

    useEffect(() => {
        // Fetch the data from the backend
        axios.get('http://localhost:5212/employees')
            .then(response => {
                console.log(response.data)
                setPeople(response.data);
            })
            .catch(error => {
                setError('Failed to fetch people');
                console.error(error);
            });
    }, []);

    return (
        <div className="container">
            <Helmet>
                <title>People Panel</title>
            </Helmet>
            <div>
                <h2>People</h2>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <ul>

                    {people.map(person => (
                        <li key={person.id}>
                            <Link to={`/home/${person.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                            <p>Username: {person.username}</p>
                            <p>First Name: {person.firstname}</p>
                            <p>Last Name: {person.lastname}</p>
                            <p>Email: {person.email}</p>
                            <p>Role: {person.company_role}</p>
                            <p>Department: {person.department?.name}</p>
                            <p>Admin: {person.is_admin ? 'Yes' : 'No'}</p>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default People;
