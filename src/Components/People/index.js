import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import {Link} from 'react-router-dom';
import checkmark_icon from "./img/check.png";
import edit_icon from "./img/edit.png";
import delete_icon from "./img/delete.png";
import './people-style.css';

function People() {
    const [people, setPeople] = useState([]);
    const [loading, setLoading] = useState(true);
    const [sortField, setSortField] = useState(null);
    const [sortOrder, setSortOrder] = useState('asc');
    const [openMenuId, setOpenMenuId] = useState(null);

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
                    aField = '${a.title}'.toLowerCase();
                    bField = '${b.title}'.toLowerCase();
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
    
    // Three dotes dropdown menu
    const handleMenuToggle = (id) => {
        if (openMenuId === id) {
            setOpenMenuId(null); // Close the menu if it's already open
        } else {
            setOpenMenuId(id); // Open the menu for the clicked item
        }
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div className="people-container">
            <h1>People</h1>
            <table>
                <thead>
                    <tr>
                        <th><input type="checkbox" /></th>
                        <th>Image</th>
                        <th onClick={() => handleSort('name')}>
                            Full Name{sortField === 'name' && (sortOrder === 'asc' ? '▲' : '▼')}</th>
                        <th>Date</th>
                        <th onClick={() => handleSort('department')}>
                            Department{sortField === 'name' && (sortOrder === 'asc' ? '▲' : '▼')}</th>
                        <th onClick={() => handleSort('title')}>
                            Title{sortField === 'name' && (sortOrder === 'asc' ? '▲' : '▼')}</th>
                        <th className='th-email'>Email</th>
                        <th>Status</th>
                        <th className="th-action">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {people.map(p => (
                        <tr key={p.id}>
                            <td><input type="checkbox" /></td>
                            <td><img src="" alt="Avatar"/></td>
                            <td>
                                <Link to={`/home/${p.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                    {p.firstname} {p.lastname}
                                </Link>
                            </td>
                            <td>September 9, 2024{/*{p.date}*/}</td>
                            <td>{p.department?.name}</td>
                            <td>TitleTitle{/*{p.title}*/}</td> 
                            <td className='td-email'>{p.email}</td>
                            <td>
                                <button className="td-status-b">Status</button>{/*{p.status}*/}
                            </td>
                            <td className="td-action-b"><div className="ellipsis-container">
                                <button
                                    className="ellipsis-button"
                                    onClick={() => handleMenuToggle(p.id)}
                                >
                                    {openMenuId === p.id && (
                                        <div className="dropdown-menu">
                                            <button onClick={() => alert('Evaluate')}>
                                                <img src={checkmark_icon} alt="checkmark"/>Evaluate
                                            </button>
                                            <button onClick={() => alert('Edit action')}>
                                                <img src={edit_icon} alt="edit"/>Edit
                                            </button>
                                            <button onClick={() => alert('Delete action')}>
                                                <img src={delete_icon} alt="delete"/>Delete
                                            </button>
                                        </div>
                                    )}
                                    &#x2026; {/* This represents the three dots */}
                                </button>
                            </div></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default People;
