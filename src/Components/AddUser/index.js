import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AddUser() {
    const [user, setUser] = useState({
        firstname: '',
        lastname: '',
        email: '',
        username: '',
        password: '',
        company_role: '',
        is_admin: false,
        hired_date: '',
        manager_id: '',
        department_id: ''
    });
    const [image, setImage] = useState(null);
    const [department, setDepartments] = useState([]);

    useEffect(() => {
        // Fetch departments
        axios.get('http://localhost:5212/departments')
            .then(response => {
                console.log('Departments fetched:', response.data); // Debugging: Check response
                setDepartments(response.data);
            })
            .catch(error => {
                console.error('Error fetching departments:', error);
            });
    }, []);
    

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setUser({ ...user, [name]: type === 'checkbox' ? checked : value });
    };

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('firstname', user.firstname);
        formData.append('lastname', user.lastname);
        formData.append('email', user.email);
        formData.append('username', user.username);
        formData.append('password', user.password);
        formData.append('company_role', user.company_role);
        formData.append('is_admin', user.is_admin);
        formData.append('hired_date', user.hired_date);
        formData.append('manager_id', user.manager_id);
        formData.append('department_id', user.department_id);

        if (image) {
            formData.append('image', image);
        }
        console.log(formData);
        try {
            const response = await axios.post('http://localhost:5212/employees-with-image', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log('User created:', response.data);
        } catch (error) {
            console.error('There was an error!', error);
        }
    };

    return (
        <div>
            <h2>Add User</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>First Name:</label>
                    <input 
                        type="text" 
                        name="firstname" 
                        value={user.firstname} 
                        onChange={handleInputChange} 
                    />
                </div>
                <div>
                    <label>Last Name:</label>
                    <input 
                        type="text" 
                        name="lastname" 
                        value={user.lastname} 
                        onChange={handleInputChange} 
                    />
                </div>
                <div>
                    <label>Email:</label>
                    <input 
                        type="email" 
                        name="email" 
                        value={user.email} 
                        onChange={handleInputChange} 
                    />
                </div>
                <div>
                    <label>Username:</label>
                    <input 
                        type="text" 
                        name="username" 
                        value={user.username} 
                        onChange={handleInputChange} 
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input 
                        type="password" 
                        name="password" 
                        value={user.password} 
                        onChange={handleInputChange} 
                    />
                </div>
                <div>
                    <label>Company Role:</label>
                    <input 
                        type="text" 
                        name="company_role" 
                        value={user.company_role} 
                        onChange={handleInputChange} 
                    />
                </div>
                <div>
                    <label>Hired Date:</label>
                    <input 
                        type="date" 
                        name="hired_date" 
                        value={user.hired_date} 
                        onChange={handleInputChange} 
                    />
                </div>
                <div>
                    <label>Manager ID:</label>
                    <input 
                        type="number" 
                        name="manager_id" 
                        value={user.manager_id} 
                        onChange={handleInputChange} 
                    />
                </div>
                <div>
                    <label>Department:</label>
                    <select
                        name="department_id"
                        value={user.department_id}
                        onChange={handleInputChange}
                    >
                        <option value="">Select Department</option>
                        {department.map(department => (
                            <option key={department.id} value={department.id}>
                                {department.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>Is Admin:</label>
                    <input 
                        type="checkbox" 
                        name="is_admin" 
                        checked={user.is_admin} 
                        onChange={handleInputChange} 
                    />
                </div>
                <div>
                    <label>Profile Image:</label>
                    <input type="file" onChange={handleImageChange} />
                </div>
                <button type="submit">Add User</button>
            </form>
        </div>
    );
}

export default AddUser;
