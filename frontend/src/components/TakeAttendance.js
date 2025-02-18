import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TakeAttendance = () => {
  const [attendance, setAttendance] = useState([]);
  const [date, setDate] = useState('');
  const [filters, setFilters] = useState({
    category: '',
    division: '',
  });
  const [showAbsentList, setShowAbsentList] = useState(false);
  const [absentStudents, setAbsentStudents] = useState([]);

  // Fetch students for attendance
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      axios.get('http://localhost:5000/api/students', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then(response => {
          const studentsWithStatus = response.data.map(student => ({
            ...student,
            status: 'absent', // Default to absent
          }));
          setAttendance(studentsWithStatus);
        })
        .catch(error => {
          console.error("Error fetching students:", error);
        });
    } else {
      console.log("No token found, please login first.");
    }
  }, []);

  // Handle attendance change
  const handleAttendanceChange = (id, status) => {
    setAttendance(prevState =>
      prevState.map(student =>
        student._id === id ? { ...student, status } : student
      )
    );
  };

  // Handle the date change
  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  // Handle filter change
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prevFilters => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  // Filter students by category and division
  const filteredStudents = attendance.filter(student => {
    return (
      (filters.category ? student.category === filters.category : true) &&
      (filters.division ? student.division === filters.division : true)
    );
  });

  // Handle submit (display absent students for confirmation)
  const handleSubmit = () => {
    if (!date) {
      alert('Please select a date.');
      return;
    }

    // Find absent students
    const absentees = filteredStudents.filter(student => student.status === 'absent');
    setAbsentStudents(absentees);
    setShowAbsentList(true);
  };

  // Mark absent students as present if needed
  const markAbsentAsPresent = (id) => {
    setAbsentStudents(prevState =>
      prevState.map(student =>
        student._id === id ? { ...student, status: 'present' } : student
      )
    );
  };

  // Handle final proceed (send all students' attendance)
  const handleProceed = () => {
    // Merge corrected absent students with already marked present students
    const finalAttendance = filteredStudents.map(student => {
      const verifiedAbsent = absentStudents.find(abs => abs._id === student._id);
      return verifiedAbsent ? verifiedAbsent : student;
    });

    const attendanceData = finalAttendance.map(student => ({
      studentId: student._id,
      status: student.status,
      date,
    }));

    axios.post('http://localhost:5000/api/students/attendance/bulk', attendanceData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      }
    })
    .then(response => {
      alert("Attendance Updated Successfully");
      console.log("Attendance updated successfully:", attendanceData);
      setShowAbsentList(false);
      setDate('');
      setFilters({ category: '', division: '' });
      setAttendance(prev => prev.map(student => ({ ...student, status: 'absent' })));
    })
    .catch(error => {
      console.error("Error updating attendance:", error);
    });
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center">Take Attendance</h1>
      
      {/* Date Selector */}
      <div className="form-group mb-4">
        <label htmlFor="attendanceDate">Select Date:</label>
        <input
          type="date"
          className="form-control"
          id="attendanceDate"
          value={date}
          onChange={handleDateChange}
        />
      </div>
      
      {/* Filters */}
      <div className="form-group mb-4">
        <label>Category:</label>
        <select
          className="form-control"
          name="category"
          value={filters.category}
          onChange={handleFilterChange}
        >
          <option value="">All</option>
          <option value="B1">B1</option>
          <option value="B2">B2</option>
          <option value="C">C</option>
        </select>
      </div>
      
      <div className="form-group mb-4">
        <label>Division:</label>
        <select
          className="form-control"
          name="division"
          value={filters.division}
          onChange={handleFilterChange}
        >
          <option value="">All</option>
          <option value="SD">SD</option>
          <option value="SW">SW</option>
        </select>
      </div>

      {!showAbsentList ? (
        <>
          {/* Attendance List */}
          <div className="list-group">
            {filteredStudents.map(student => (
              <div key={student._id} className="list-group-item d-flex justify-content-between align-items-center">
                <div>
                  <h5>{student.name}</h5>
                  <small>Regimental Number: {student.regimentalNumber}</small>
                </div>

                {/* Attendance Buttons */}
                <div className="d-flex gap-2">
                  <button
                    className={`btn ${student.status === 'present' ? 'btn-success' : 'btn-secondary'} mr-2 `}
                    onClick={() => handleAttendanceChange(student._id, 'present')}
                  >
                    Mark Present
                  </button>
                  <button
                    className={`btn ${student.status === 'absent' ? 'btn-danger' : 'btn-secondary'}`}
                    onClick={() => handleAttendanceChange(student._id, 'absent')}
                  >
                    Mark Absent
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          {/* Submit Button */}
          <button className="btn btn-primary mt-4" onClick={handleSubmit}>Submit Attendance</button>
        </>
      ) : (
        <>
          {/* Absent Students Confirmation */}
          <h2 className="mt-4 text-danger">Confirm Absent Students</h2>
          <div className="list-group">
            {absentStudents.map(student => (
              <div key={student._id} className="list-group-item d-flex justify-content-between align-items-center">
                <div>
                  <h5>{student.name}</h5>
                  <small>Regimental Number: {student.regimentalNumber}</small>
                </div>

                {/* Mark as Present Button */}
                <button
                  className={`btn ${student.status === 'present' ? 'btn-success' : 'btn-secondary'} mr-2`}
                  onClick={() => markAbsentAsPresent(student._id)}
                >
                  Mark Present
                </button>
              </div>
            ))}
          </div>

          {/* Proceed Button */}
          <button className="btn btn-success mt-4" onClick={handleProceed}>Proceed</button>
        </>
      )}
    </div>
  );
};

export default TakeAttendance;
