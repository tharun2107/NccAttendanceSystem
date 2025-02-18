import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AppBar, Toolbar, Button, Box, IconButton, Typography, Drawer, List, ListItem } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import img1 from "../images/ncclogo.jpg"; // NCC Logo

const GuestNavbar = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <>
      <AppBar position="sticky" sx={{ backgroundColor: "#2c3e50" }}>
        <Toolbar>
          <Box sx={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
            {/* Logo */}
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Link to="/" style={{ textDecoration: "none" }}>
                <img src={img1} alt="NCC Logo" style={{ height: "40px", width: "auto" }} />
              </Link>
            </Box>
            <Typography sx={{ margin: "2px", fontWeight: "bold" }}>NCC Attendance Portal</Typography>

            {/* Desktop Menu */}
            <Box sx={{ display: { xs: "none", sm: "flex" } }}>
              <Button component={Link} to="/" sx={{ color: "white" }}>Home</Button>
              <Button component={Link} to="/login" sx={{ color: "white" }}>Login</Button>
            </Box>

            {/* Mobile Menu */}
            <Box sx={{ display: { xs: "block", sm: "none" } }}>
              <IconButton color="inherit" onClick={() => setIsDrawerOpen(true)}>
                <MenuIcon />
              </IconButton>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Drawer for Mobile Menu */}
      <Drawer anchor="right" open={isDrawerOpen} onClose={() => setIsDrawerOpen(false)}>
        <Box sx={{ width: 250 }} role="presentation" onClick={() => setIsDrawerOpen(false)}>
          <List>
            <ListItem button component={Link} to="/">Home</ListItem>
            <ListItem button component={Link} to="/login">Login</ListItem>
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default GuestNavbar;
