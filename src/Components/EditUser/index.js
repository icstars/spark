import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios'; // You can use axios or fetch, just for consistency

const EditUser = () => {
    const { id } = useParams(); // Extract the employeeId from the URL
    const [employee, setEmployee] = useState({
        firstname: '',
        lastname: '',
        email: '',
        username: '',
        password: '',
        company_role: '',
        is_admin: false,
        hired_date: '',
        manager_id: '',
        department_id: '',
        img: null,
    });

    const [file, setFile] = useState(null);
    const [departments, setDepartments] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch the employee data on load
    useEffect(() => {
        const fetchEmployee = async () => {
            try {
                const response = await axios.get(`http://localhost:5212/users/${id}`); // Use id from useParams
                console.log('Employee data:', response.data);

                const data = response.data;

                // Format the hired_date to "yyyy-MM-dd"
                if (data.hired_date) {
                    data.hired_date = data.hired_date.split('T')[0]; // Extract only the date part
                }
                setEmployee(response.data);

                setLoading(false);
            } catch (error) {
                console.error('Error fetching employee:', error);
            }
        };

        const fetchDepartments = async () => {
            try {
                const response = await axios.get('http://localhost:5212/departments');
                setDepartments(response.data);
            } catch (error) {
                console.error('Error fetching departments:', error);
            }
        };

        fetchEmployee();
        fetchDepartments();
    }, [id]); // Include id in the dependency array to refetch when id changes

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setEmployee((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        Object.keys(employee).forEach((key) => {
            formData.append(key, employee[key]);
        });

        if (file) {
            formData.append('image', file);
        }

        try {
            const response = await axios.put(`http://localhost:5212/edit/${id}`, formData); // Use the id from useParams

            if (response.status === 204) {
                alert('Employee updated successfully!');
            } else {
                alert('Failed to update employee.');
            }
        } catch (error) {
            console.error('Error updating employee:', error);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }
    return (
        <div>
            <h2>Edit Employee</h2>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div>
                    <label>First Name:</label>
                    <input
                        type="text"
                        name="firstname"
                        value={employee.firstname}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <label>Last Name:</label>
                    <input
                        type="text"
                        name="lastname"
                        value={employee.lastname}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={employee.email}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <label>Username:</label>
                    <input
                        type="text"
                        name="username"
                        value={employee.username}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        name="password"
                        value={employee.password}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label>Company Role:</label>
                    <input
                        type="text"
                        name="company_role"
                        value={employee.company_role}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label>Is Admin:</label>
                    <input
                        type="checkbox"
                        name="is_admin"
                        checked={employee.is_admin}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label>Hired Date:</label>
                    <input
                        type="date"
                        name="hired_date"
                        value={employee.hired_date}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label>Manager ID:</label>
                    <input
                        type="number"
                        name="manager_id"
                        value={employee.manager_id}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label>Department:</label>
                    <select
                        name="department_id"
                        value={employee.department_id}
                        onChange={handleChange}
                    >
                        <option value="">Select Department</option>
                        {departments.map((dep) => (
                            <option key={dep.id} value={dep.id}>
                                {dep.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label>Upload Image:</label>
                    <input type="file" name="image" onChange={handleFileChange} />
                </div>

                <button type="submit">Update Employee</button>
            </form>
        </div>
    );
};

export default EditUser;
