import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Box, Container, TextField, Button, Typography, Grid } from "@mui/material";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post("https://nccattendancesystem.onrender.com/api/auth/login", {
        username,
        password,
      });

      // Save the JWT token in localStorage or cookies
      const { token } = response.data;
      localStorage.setItem("token", token);

      // Redirect to the dashboard
      navigate("/");
    } catch (error) {
      // Handle error, display message to user
      setErrorMessage("Invalid credentials!");
    }
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 5 }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: 3,
          borderRadius: 2,
          boxShadow: 3,
          backgroundColor: '#ffffff',
        }}
      >
        <Typography variant="h5" sx={{ mb: 2, textAlign: 'center', fontWeight: 'bold' }}>
          Login to NCC Attendance System
        </Typography>

        {/* Username Input */}
        <TextField
          label="Username"
          variant="outlined"
          fullWidth
          margin="normal"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          sx={{ input: { fontSize: '14px' } }}
        />

        {/* Password Input */}
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={{ input: { fontSize: '14px' } }}
        />

        {/* Login Button */}
        <Button
          variant="contained"
          fullWidth
          color="primary"
          onClick={handleLogin}
          sx={{
            mt: 2,
            padding: 1.5,
            fontWeight: 'bold',
            fontSize: '16px',
          }}
        >
          Login
        </Button>

        {/* Error message */}
        {errorMessage && (
          <Typography variant="body2" sx={{ color: 'red', mt: 2, textAlign: 'center' }}>
            {errorMessage}
          </Typography>
        )}
      </Box>
    </Container>
  );
}

export default LoginPage;
