import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import {Link} from 'react-router-dom';

function People() {
    const [people, setPeople] = useState([]);
    const [loading, setLoading] = useState(true);
    const [sortField, setSortField] = useState(null);
    const [sortOrder, setSortOrder] = useState('asc');

    // Fetch data from API
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:5212/employees`);
                const data = await response.json();
                setPeople(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };
        fetchData();
    }, []);
    

    // Sorting function
    const handleSort = (field) => {
        const sortedPeople = [...people].sort((a, b) => {
            let aField, bField;
    
            switch (field) {
                case 'name':
                    // Combine firstname and lastname for sorting
                    aField = `${a.firstname} ${a.lastname}`.toLowerCase();
                    bField = `${b.firstname} ${b.lastname}`.toLowerCase();
                    break;
                case 'department':
                    // Access the department name for sorting
                    aField = a.department?.name?.toLowerCase() || '';
                    bField = b.department?.name?.toLowerCase() || '';
                    break;
                case 'title':
                    // Directly access the title for sorting
                    aField = a.title.toLowerCase();
                    bField = b.title.toLowerCase();
                    break;
                default:
                    aField = '';
                    bField = '';
            }
    
            if (aField < bField) return sortOrder === 'asc' ? -1 : 1;
            if (aField > bField) return sortOrder === 'asc' ? 1 : -1;
            return 0;
        });
    
        setPeople(sortedPeople);
        // Toggle sort order
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    };
    

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div className='container'>
            <table>
                <thead>
                    <tr>
                        <th><input type="checkbox" /></th>
                        <th onClick={() => handleSort('name')}>
                            Full Name {sortField === 'name' && (sortOrder === 'asc' ? '🔼' : '🔽')}</th>
                        <th>Date</th>
                        <th onClick={() => handleSort('department')}>
                            Department{sortField === 'department' && (sortOrder === 'asc' ? '🔼' : '🔽')}</th>
                        <th onClick={() => handleSort('title')}>
                            Title{sortField === 'title' && (sortOrder === 'asc' ? '🔼' : '🔽')}</th>
                        <th>Email</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {people.map(p => (
                        <tr key={p.id}>
                            <td><input type="checkbox" /></td>
                            <td>{p.firstname} {p.lastname}</td>
                            <td>{p.date}</td>
                            <td>{p.department?.name}</td>
                            <td>{p.title}</td>
                            <td>{p.email}</td>
                            <td>{p.status}</td>
                            <td>
                                <button>Edit</button>
                                <button>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default People;
