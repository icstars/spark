import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import checkmark_icon from "./img/check.png";
import edit_icon from "./img/edit.png";
import delete_icon from "./img/delete.png";
import profile_icon from "./img/profile.png"
import './people-style.css';

function People() {
    const [people, setPeople] = useState([]);
    const [loading, setLoading] = useState(true);
    const [sortField, setSortField] = useState(null);
    const [sortOrder, setSortOrder] = useState('asc');
    const [openMenuId, setOpenMenuId] = useState(null);
    const [department, setDepartments] = useState([]); // Fetch department list
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

    // Track the currently edited user and their form values
    const [editUserId, setEditUserId] = useState(null); // ID of user being edited
    const [editFormValues, setEditFormValues] = useState({
        firstname: '',
        lastname: '',
        email: '',
        company_role: '',
        department_id: '',
        hired_date: ''
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:5212/employees`);
                const data = await response.json();
                setPeople(data);
                setLoading(false);

                const departmentResponse = await fetch(`http://localhost:5212/departments`);
                const departmentData = await departmentResponse.json();
                setDepartments(departmentData);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    // Handle input changes in the inline form
    const handleInputChange = (e) => {
        const { name, value } = e.target;

        // Directly set the date string (no need to manipulate it with `Date`)
        if (name === 'hired_date') {
            setEditFormValues((prevValues) => ({
                ...prevValues,
                hired_date: value  // Just set the date string as-is
            }));
        } else {
            setEditFormValues((prevValues) => ({
                ...prevValues,
                [name]: value
            }));
        }
    };

    // Handle edit button click - populate the form with existing values
    const handleEditClick = (person) => {
        setEditUserId(person.id); // Set the current user being edited
        setEditFormValues({
            firstname: person.firstname,
            lastname: person.lastname,
            email: person.email,
            company_role: person.company_role,
            department_id: person.department?.id || '', // Set department ID if exists
            hired_date: person.hired_date ? person.hired_date.split('T')[0] : ''// Format date for input
        });
    };



    // Save the updated user information
    const handleSaveClick = async () => {
        try {
            const response = await fetch(`http://localhost:5212/users/${editUserId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(editFormValues)  // Directly use the string values, including the date
            });

            if (response.ok) {
                // Find the department name based on the selected department_id
                const updatedDepartment = department.find(dep => dep.id === Number(editFormValues.department_id));

                // Update the local state with the new user info
                setPeople((prevPeople) =>
                    prevPeople.map((p) =>
                        p.id === editUserId
                            ? {
                                ...p,
                                ...editFormValues,
                                department: updatedDepartment ? { id: updatedDepartment.id, name: updatedDepartment.name } : p.department,
                                // Fix the date issue by removing any timezone shift
                                hired_date: editFormValues.hired_date // Use the date as-is without conversion to UTC

                            }
                            : p
                    )
                );

                // Reset editing state
                setEditUserId(null);
            } else {
                console.error('Error saving data:', response.statusText);
            }
        } catch (error) {
            console.error('Error saving data:', error);
        }
    };


    const handleCancelClick = () => {
        setEditUserId(null); // Cancel the edit
    };



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
            <Helmet>People</Helmet>
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
                            <td className='img-box'>
                                {p.img ? (
                                    <img className='img'
                                        src={`http://localhost:5212/images/${p.id}`} // Fetch the image from your backend
                                        alt={`${p.firstname} ${p.lastname}`}
                                        style={{ width: '45px', height: '45px' }}
                                    />
                                ) : (
                                    <img className='img'
                                        src={profile_icon} // Fallback image
                                        alt="Default Avatar"
                                        style={{ width: '45px', height: '45px', borderRadius: '50%' }}
                                    />
                                )}
                            </td>
                            <td>
                                {editUserId === p.id ? (
                                    <input
                                        type="text"
                                        name="firstname"
                                        value={editFormValues.firstname}
                                        onChange={handleInputChange}
                                    />
                                ) : (
                                    <Link to={`/home/${p.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                        {p.firstname} {p.lastname}
                                    </Link>
                                )}
                            </td>
                            <td>
                                {editUserId === p.id ? (
                                    <input
                                        type="date"
                                        name="hired_date"
                                        value={editFormValues.hired_date}  // Use the raw string from the state
                                        onChange={handleInputChange}
                                    />
                                ) : (
                                    p.hired_date.split('T')[0] // Display the date as it is, without converting to Date object
                                )}
                            </td>
                            <td>
                                {editUserId === p.id ? (
                                    <select
                                        name="department_id"
                                        value={editFormValues.department_id}
                                        onChange={handleInputChange}
                                    >
                                        <option value="">Select Department</option>
                                        {department.map(department => (
                                            <option key={department.id} value={department.id}>
                                                {department.name}
                                            </option>
                                        ))}
                                    </select>
                                ) : (
                                    p.department?.name
                                )}
                            </td>
                            <td>
                                {editUserId === p.id ? (
                                    <input
                                        type="text"
                                        name="company_role"
                                        value={editFormValues.company_role}
                                        onChange={handleInputChange}
                                    />
                                ) : (
                                    p.company_role
                                )}
                            </td>
                            <td className='td-email'>
                                {editUserId === p.id ? (
                                    <input
                                        type="text"
                                        name="email"
                                        value={editFormValues.email}
                                        onChange={handleInputChange}
                                    />
                                ) : (
                                    p.email
                                )}
                            </td>
                            <td>
                                <button className="td-status-b">Status</button>{/*{p.status}*/}
                            </td>

                            <td className="td-action-b">
                                {editUserId === p.id ? (
                                    <>
                                        <button onClick={handleSaveClick}>Save</button>
                                        <button onClick={handleCancelClick}>Cancel</button>
                                    </>
                                ) : (
                                    <div className="ellipsis-container">
                                        <button
                                            className="ellipsis-button"
                                            onClick={() => handleMenuToggle(p.id)}
                                        >
                                            &#x2026; {/* This represents the three dots */}
                                        </button>
                                        {openMenuId === p.id && (
                                            <div className="dropdown-menu">
                                                <button onClick={() => alert('Evaluate')}>
                                                    <img src={checkmark_icon} alt="checkmark" /> Evaluate
                                                </button>
                                                <button onClick={() => handleEditClick(p)}>
                                                    <img src={edit_icon} alt="edit" /> Edit
                                                </button>
                                                <button onClick={() => alert('Delete action')}>
                                                    <img src={delete_icon} alt="delete" /> Delete
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default People;
