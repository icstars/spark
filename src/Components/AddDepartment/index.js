import axios from "axios";
import React, { useState } from "react";

function AddDepartment() {
  const [department, setDepartment] = useState({
    name: "",
  });

  // Handle input change
  const handleInputChange = (e) => {
    const { value } = e.target;
    setDepartment({ name: value }); // Update the department name state
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Submitting department:", department);

    try {
      // Send the data as JSON
      const response = await axios.post(
        "http://localhost:5212/departments",
        department, // Send the department object directly
        {
          headers: {
            "Content-Type": "application/json", // Set the content type to JSON
          },
        }
      );
      console.log("Response:", response.data);
    } catch (error) {
      console.error("There was an error!", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <ul>
          <li>
            <input
              type="text"
              value={department.name}
              onChange={handleInputChange} // Add onChange handler
            />
          </li>
          <button type="submit" className="btn btn-primary mt-3">
            Add Department
          </button>
        </ul>
      </form>
    </div>
  );
}

export default AddDepartment;
