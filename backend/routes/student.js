const express = require("express");
const Student = require("../models/Student");
const verifyToken = require("../middleware/auth"); // Import the middleware
const mongoose = require("mongoose");
const router = express.Router();

// Add a new student (protected route)
router.post("/add", verifyToken, async (req, res) => {
  const { name, regimentalNumber ,category,division} = req.body;

  try {
    if (!name || !regimentalNumber || !category || !division) {
      return res.status(400).json({ message: "Please fill all fields" });
    }
     // Properly await the database query
     const existingStudent = await Student.findOne({ regimentalNumber });

     if (existingStudent) {
       return res.status(400).json({ message: "Student already exists" });
     }
    const newStudent = new Student({ name, regimentalNumber,category,division });
    await newStudent.save();
    res.status(201).json({ message: "Student added successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error adding student", error });
  }
});


// Bulk attendance update (protected route)
router.post("/attendance/bulk", verifyToken, async (req, res) => {
    const attendanceData = req.body;
  
    // Log the attendance data for debugging
    console.log("Attendance Data Received:", attendanceData);
  
    try {
      // Loop through each attendance record and update each student
      for (const attendance of attendanceData) {
        const { studentId, status, date } = attendance;
  
        // Check if the student ID is valid
        if (!mongoose.Types.ObjectId.isValid(studentId)) {
          console.log(`Invalid student ID: ${studentId}`);
          return res.status(400).json({ message: `Invalid student ID: ${studentId}` });
        }
        
        console.log(`Processing Student ID: ${studentId}`);
  
        // Find student by ID
        const student = await Student.findById(studentId);
        
        if (!student) {
          console.log(`Student with ID ${studentId} not found`);
          return res.status(404).json({ message: `Student with ID ${studentId} not found` });
        }
  
        // Add attendance record
        student.attendanceRecords.push({ status, date });
  
        // Recalculate attendance percentage
        const totalDays = student.attendanceRecords.length;
        const presentDays = student.attendanceRecords.filter(record => record.status === 'present').length;
        const attendancePercentage = (presentDays / totalDays) * 100;
  
        // Update the attendance percentage field
        student.attendancePercentage = attendancePercentage;
  
        // Save the student document with the updated attendance
        await student.save();
  
        console.log(`Attendance updated for student ${studentId}`);
      }
  
      res.status(200).json({ message: "Attendance updated successfully" });
    } catch (error) {
      console.log("Error during attendance update:", error);
      res.status(500).json({ message: "Error updating attendance", error });
    }
  });
  
  

// Get all students (protected route)
router.get("/", verifyToken, async (req, res) => {
  try {
    const students = await Student.find({ isActive: true });
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ message: "Error fetching students", error });
  }
});
//batch promotion route
router.post("/promote", verifyToken, async (req, res) => {
  const { type } = req.body;

  try {
    if (type === "B1toB2") {
      const result = await Student.updateMany(
        { category: "B1", isActive: true },
        { $set: { category: "B2" } }
      );
      return res.status(200).json({ message: `Promoted ${result.modifiedCount} students from B1 to B2.` });
    }

    if (type === "B2toC") {
      const result = await Student.updateMany(
        { category: "B2", isActive: true },
        { $set: { category: "C" } }
      );
      return res.status(200).json({ message: `Promoted ${result.modifiedCount} students from B2 to C.` });
    }

    if (type === "CtoOld") {
      const result = await Student.updateMany(
        { category: "C", isActive: true },
        { $set: { isActive: false } }
      );
      return res.status(200).json({ message: `Marked ${result.modifiedCount} C category students as old students.` });
    }

    return res.status(400).json({ message: "Invalid promotion type." });
  } catch (error) {
    res.status(500).json({ message: "Error during batch promotion.", error });
  }
});

router.get("/oldbatchstudents", verifyToken, async (req, res) => {
  try {
    const students = await Student.find({ isActive: false });
    res.status(200).json(students);
  }
  catch (error) {
    res.status(500).json({ message: "Error fetching students", error });
  }

});

// edit student details
router.put("/editstudent/:id", verifyToken, async (req, res) => {
  try {
    const updatedStudent = await Student.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          name: req.body.name,
          regimentalNumber: req.body.regimentalNumber,
          category: req.body.category,
          division: req.body.division,
        },
      },
      { new: true }
    );
    res.status(200).json(updatedStudent);
  } catch (error) {
    res.status(500).json({ message: "Error updating student", error });
  }
});


// Delete student
router.delete("/deletestudent/:id", verifyToken, async (req, res) => {
  try {
    const deletedStudent = await Student.findByIdAndDelete(req.params.id);

    if (!deletedStudent) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.status(200).json({ message: "Student deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting student", error });
  }
});


module.exports = router;

