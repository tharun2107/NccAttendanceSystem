import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AppBar, Toolbar, Button, Box, Drawer, List, ListItem, IconButton, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import img1 from "../images/ncclogo.jpg";

const Header = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Check authentication status
  const checkAuth = () => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token); // Convert token presence to boolean
  };

  // Run on mount and when location changes
  useEffect(() => {
    checkAuth();
  }, [location]); // Updates UI whenever the route changes

  const handleDrawerToggle = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    navigate("/");
  };

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

            {/* Navigation Links */}
            <Box sx={{ display: { xs: "none", sm: "flex" } }}>
              {isAuthenticated ? (
                <>
                  <Button component={Link} to="/" sx={{ color: "white" }}>
                    Home
                  </Button>
                  <Button component={Link} to="/take-attendance" sx={{ color: "white" }}>
                    Take Attendance
                  </Button>
                  <Button component={Link} to="/add-cadet" sx={{ color: "white" }}>
                    Add Cadet
                  </Button>
                  <Button component={Link} to="/view-attendance" sx={{ color: "white" }}>
                    View Attendance
                  </Button>
                  <Button component={Link} to="/batch" sx={{ color: "white" }}>
                    Batch Promotion
                  </Button>
                  <Button component={Link} to="/edit-cadet" sx={{ color: "white" }}>
                  Edit Cadet Details
                  </Button>
                  <Button onClick={handleLogout} sx={{ color: "white" }}>
                    Logout
                  </Button>
                </>
              ) : (
                  <>
                <Button component={Link} to="/login" sx={{ color: "white" }}>
                  Login
                    </Button>
                    <Button component={Link} to="/" sx={{ color: "white" }}>
                  Home
                </Button>
                    </>
                  
              )}
            </Box>

            {/* Mobile Menu */}
            <Box sx={{ display: { xs: "block", sm: "none" } }}>
              <IconButton color="inherit" onClick={handleDrawerToggle}>
                <MenuIcon />
              </IconButton>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Drawer for Mobile */}
      <Drawer anchor="right" open={isDrawerOpen} onClose={handleDrawerToggle}>
        <Box sx={{ width: 250 }} role="presentation" onClick={handleDrawerToggle} onKeyDown={handleDrawerToggle}>
          <List>
            {isAuthenticated ? (
              <>
                <ListItem button component={Link} to="/">
                  <Typography>Home</Typography>
                </ListItem>
                <ListItem button component={Link} to="/take-attendance">
                  <Typography>Take Attendance</Typography>
                </ListItem>
                <ListItem button component={Link} to="/add-cadet">
                  <Typography>Add Cadet</Typography>
                </ListItem>
                <ListItem button component={Link} to="/view-attendance">
                  <Typography>View Attendance</Typography>
                </ListItem>
                <ListItem button component={Link} to="/batch">
                  <Typography>Batch Promotion</Typography>
                </ListItem>
                <ListItem button component={Link} to="/edit-cadet">
                  <Typography>Edit Cadet Details</Typography>
                </ListItem>
                <ListItem button onClick={handleLogout}>
                  <Typography>Logout</Typography>
                </ListItem>
              </>
            ) : (
                <>
              <ListItem button component={Link} to="/login">
                <Typography>Login</Typography>
                  </ListItem>
                  <ListItem button component={Link} to="/">
                    <Typography>Home</Typography>
                  </ListItem>
                  </>
            )}
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default Header;
