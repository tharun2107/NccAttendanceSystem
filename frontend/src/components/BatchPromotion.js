import { useState } from "react";
import axios from "axios";
import { Card, CardContent, Button, Typography, Box, CircularProgress, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";

export default function BatchPromotion() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [oldStudents, setOldStudents] = useState([]);

  const handlePromotion = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setMessage("Please login first.");
        setLoading(false);
        return;
      }

      const response = await axios.post(
        "https://nccattendancesystem.onrender.com/api/students/promote",
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setMessage(response.data.message);
    } catch (error) {
      setMessage("Error during batch promotion.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchOldStudents = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setMessage("Please login first.");
        setLoading(false);
        return;
      }

      const response = await axios.get("https://nccattendancesystem.onrender.com/api/students/oldbatchstudents", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setOldStudents(response.data);
      setMessage(""); // Clear previous messages
    } catch (error) {
      setMessage("Error fetching old batch students.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Batch Promotion
          </Typography>
          <Typography variant="body1" gutterBottom>
            This will automatically move students from B1 → B2 → C at year-end. Old students will be marked inactive.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={handlePromotion}
            fullWidth
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : "Promote Students"}
          </Button>
          {message && (
            <Typography variant="body2" color={message.includes("Error") ? "error" : "success"} sx={{ mt: 2 }}>
              {message}
            </Typography>
          )}
        </CardContent>
      </Card>

      {/* Button to fetch old students */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Old Batch Students
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            onClick={fetchOldStudents}
            fullWidth
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : "Fetch Old Students"}
          </Button>

          {/* Display old students in a table */}
          {oldStudents.length > 0 && (
            <Table sx={{ mt: 2 }}>
              <TableHead>
                <TableRow>
                  <TableCell><strong>Name</strong></TableCell>
                  <TableCell><strong>Regimental Number</strong></TableCell>
                  <TableCell><strong>Category</strong></TableCell>
                  <TableCell><strong>Division</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {oldStudents.map((student) => (
                  <TableRow key={student._id}>
                    <TableCell>{student.name}</TableCell>
                    <TableCell>{student.regimentalNumber}</TableCell>
                    <TableCell>{student.category}</TableCell>
                    <TableCell>{student.division}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}

          {message && (
            <Typography variant="body2" color={message.includes("Error") ? "error" : "success"} sx={{ mt: 2 }}>
              {message}
            </Typography>
          )}
        </CardContent>
      </Card>
    </Box>
  );
}
