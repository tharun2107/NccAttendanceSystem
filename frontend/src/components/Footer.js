import React from 'react';
import { Box, Typography, Link } from '@mui/material';

const Footer = () => {
  return (
    <Box sx={{ backgroundColor: '#2c3e50', padding: '20px', color: 'white', textAlign: 'center' }}>
      <Typography variant="body1">
        &copy; {new Date().getFullYear()} NCC Management System
      </Typography>
      <Link
        href="https://www.kitsw.ac.in/sac/NCC/activities.html"
        target="_blank"
        rel="noopener noreferrer"
        sx={{ color: 'white', textDecoration: 'none', marginTop: '10px', display: 'inline-block' }}
      >
        NCC Activities at KITSW
      </Link>
    </Box>
  );
};

export default Footer;
