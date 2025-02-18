import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppBar, Toolbar, Button, Box, IconButton, Typography } from "@mui/material";
import { AuthContext } from "../context/AuthContext";

const AuthNavbar = () => {
  const { logout } = useContext(AuthContext); // Get logout function
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // Call logout function → triggers UI update
    navigate("/login"); // Redirect to login page
  };

  return (
    <AppBar position="sticky">
      <Toolbar>
        <Box sx={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
          <Typography variant="h6">NCC Attendance</Typography>
          <Box>
            <Button component={Link} to="/" sx={{ color: "white" }}>Home</Button>
            <Button onClick={handleLogout} sx={{ color: "white" }}>Logout</Button>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default AuthNavbar;
