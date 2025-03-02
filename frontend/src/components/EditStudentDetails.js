import { useState, useEffect } from "react";
import axios from "axios";
import "../App.css";

export default function EditStudentDetails() {
  const [students, setStudents] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({
    name: "",
    regimentalNumber: "",
    category: "",
    division: "",
  });

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
        const res = await axios.get("https://nccattendancesystem.onrender.com/api/students", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setStudents(res.data);
    } catch (error) {
      alert("Failed to fetch students.");
    }
  };

  const handleEditClick = (student) => {
    setEditingId(student._id);
    setEditForm({
      name: student.name,
      regimentalNumber: student.regimentalNumber,
      category: student.category,
      division: student.division,
    });
  };

  const handleEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleEditSave = async (id) => {
    try {
      await axios.put(
          `https://nccattendancesystem.onrender.com/api/students/editstudent/${id}`,
        editForm,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setEditingId(null);
      fetchStudents();
      alert("Student updated successfully!");
    } catch (error) {
      alert("Failed to edit student.");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      if (window.confirm("Are you really sure? This cannot be undone!")) {
        try {
          await axios.delete(
              `https://nccattendancesystem.onrender.com/api/students/deletestudent/${id}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          fetchStudents();
          alert("Student deleted successfully!");
        } catch (error) {
          alert("Failed to delete student.");
        }
      }
    }
  };

  return (
    <div className="container">
      <h1>Edit & Delete Students</h1>
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Regimental Number</th>
              <th>Category</th>
              <th>Division</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student._id}>
                {editingId === student._id ? (
                  <>
                    <td>
                      <input
                        type="text"
                        name="name"
                        value={editForm.name}
                        onChange={handleEditChange}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        name="regimentalNumber"
                        value={editForm.regimentalNumber}
                        onChange={handleEditChange}
                      />
                    </td>
                    <td>
                      <select
                        name="category"
                        value={editForm.category}
                        onChange={handleEditChange}
                      >
                        <option value="B1">B1</option>
                        <option value="B2">B2</option>
                        <option value="C">C</option>
                      </select>
                    </td>
                    <td>
                      <select
                        name="division"
                        value={editForm.division}
                        onChange={handleEditChange}
                      >
                        <option value="SD">SD (Boys)</option>
                        <option value="SW">SW (Girls)</option>
                      </select>
                    </td>
                    <td>
                      <button onClick={() => handleEditSave(student._id)}>
                        💾 Save
                      </button>
                      <button onClick={() => setEditingId(null)}>
                        ❌ Cancel
                      </button>
                    </td>
                  </>
                ) : (
                  <>
                    <td>{student.name}</td>
                    <td>{student.regimentalNumber}</td>
                    <td>{student.category}</td>
                    <td>{student.division}</td>
                    <td>
                      <button onClick={() => handleEditClick(student)}>
                        ✏️ Edit
                      </button>
                      <button onClick={() => handleDelete(student._id)}>
                        🗑️ Delete
                      </button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
  
}
