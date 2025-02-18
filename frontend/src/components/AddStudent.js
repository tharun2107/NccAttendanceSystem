import React, { useState } from 'react';
import axios from 'axios';

const AddStudent = () => {
  const [student, setStudent] = useState({
    name: '',
    regimentalNumber: '',
    category: 'B1', // Default to 'b1'
    division: 'SD', // Default to 'SD'
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudent((prevStudent) => ({
      ...prevStudent,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/api/students/add', student, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`, // Sending Bearer token for authentication
      }
    })
    .then(response => {
      alert('Student added successfully');
      setStudent({ name: '', regimentalNumber: '', category: 'B1', division: 'SD' }); // Reset form
    })
    .catch(error => {
      console.error("There was an error adding the student:", error);
    });
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center">Add Student</h1>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group mb-3">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            className="form-control"
            value={student.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group mb-3">
          <label htmlFor="regimentalNumber">Regimental Number</label>
          <input
            type="text"
            id="regimentalNumber"
            name="regimentalNumber"
            className="form-control"
            value={student.regimentalNumber}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group mb-3">
          <label htmlFor="category">Category</label>
          <select
            id="category"
            name="category"
            className="form-control"
            value={student.category}
            onChange={handleChange}
            required
          >
            <option value="B1">B1</option>
            <option value="B2">B2</option>
            <option value="C">C</option>
          </select>
        </div>

        <div className="form-group mb-3">
          <label htmlFor="division">Division</label>
          <select
            id="division"
            name="division"
            className="form-control"
            value={student.division}
            onChange={handleChange}
            required
          >
            <option value="SD">SD</option>
            <option value="SI">SI</option>
          </select>
        </div>

        <button type="submit" className="btn btn-success">Add Student</button>
      </form>
    </div>
  );
};

export default AddStudent;
