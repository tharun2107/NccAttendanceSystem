import { useState, useEffect } from "react";
import axios from "axios";
import { Card, CardContent, Typography, FormControl, InputLabel, MenuItem, Select, Button, Table, TableHead, TableRow, TableCell, TableBody, Grid, Box } from "@mui/material";
import { DatePicker } from "@mui/lab";

export default function AttendanceReport() {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [lowAttendance, setLowAttendance] = useState([]);
  const [category, setCategory] = useState("all");
  const [division, setDivision] = useState("all");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      axios.get('https://nccattendancesystem.onrender.com/api/students', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then(response => {
          const fetchedStudents = response.data;
          setStudents(fetchedStudents);
          if (fetchedStudents && fetchedStudents.length > 0) {
            filterData(fetchedStudents);
          } else {
            console.error("No students found in the response.");
          }
        })
        .catch(error => {
          console.error("Error fetching students:", error);
        });
    } else {
      console.log("No token found, please login first.");
    }
  }, []);

  const filterData = (data) => {
    let filtered = data;
    if (category !== "all") {
      filtered = filtered.filter((s) => s.category === category);
    }
    if (division !== "all") {
      filtered = filtered.filter((s) => s.division === division);
    }
    setFilteredStudents(filtered);
    setLowAttendance(filtered.filter((s) => s.attendancePercentage < 75));
  };

  useEffect(() => {
    filterData(students);
  }, [category, division]);

  return (
    <Box sx={{ p: 3 }}>
      {/* Filters Section */}
      <Card sx={{ mb: 3, p: 2 }}>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={3}>
              <FormControl fullWidth>
                <InputLabel>Category</InputLabel>
                <Select value={category} onChange={(e) => setCategory(e.target.value)}>
                  <MenuItem value="all">All Categories</MenuItem>
                  <MenuItem value="B1">B1</MenuItem>
                  <MenuItem value="B2">B2</MenuItem>
                  <MenuItem value="C">C</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <FormControl fullWidth>
                <InputLabel>Division</InputLabel>
                <Select value={division} onChange={(e) => setDivision(e.target.value)}>
                  <MenuItem value="all">All Divisions</MenuItem>
                  <MenuItem value="SD">SD</MenuItem>
                  <MenuItem value="SW">SW</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <DatePicker label="Start Date" value={startDate} onChange={(date) => setStartDate(date)} />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <DatePicker label="End Date" value={endDate} onChange={(date) => setEndDate(date)} />
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" fullWidth onClick={() => filterData(students)}>Apply Filters</Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Students Attendance Table */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>Student Attendance</Typography>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><strong>Name</strong></TableCell>
                <TableCell><strong>Regimental Number</strong></TableCell>
                <TableCell><strong>Attendance %</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredStudents.map((student) => (
                <TableRow key={student._id}>
                  <TableCell>{student.name}</TableCell>
                  <TableCell>{student.regimentalNumber}</TableCell>
                  <TableCell>{student.attendancePercentage.toFixed(2)}%</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Students Below 75% Attendance */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" color="error" gutterBottom>Students with &lt; 75% Attendance</Typography>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><strong>Name</strong></TableCell>
                <TableCell><strong>Regimental Number</strong></TableCell>
                <TableCell><strong>Attendance %</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {lowAttendance.map((student) => (
                <TableRow key={student._id}>
                  <TableCell>{student.name}</TableCell>
                  <TableCell>{student.regimentalNumber}</TableCell>
                  <TableCell>{student.attendancePercentage.toFixed(2)}%</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </Box>
  );
}
