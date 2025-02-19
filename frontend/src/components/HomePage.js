import React from "react";
import { Box, Container, Typography, Grid, Card, CardMedia, CardContent } from "@mui/material";
import img1 from '../images/aa1.jpg'; // Import the image
import img2 from '../images/achivement1.jpg'; // Import the image
import img3 from '../images/ach2.jpg'; // Import the image
import Footer from "./Footer";
const HomePage = () => {
  return (
    <div>
     
      {/* Hero Section */}
      <Box
        sx={{
          backgroundImage: 'url(https://www.shobhituniversity.ac.in/images/ncc-su-img-01.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '500px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
        }}
      >
        {/* You can uncomment this for a welcome message */}
        {/* <Typography variant="h2" sx={{ fontWeight: 'bold' }}> */}
        {/*   Welcome to NCC Management System */}
        {/* </Typography> */}
      </Box>

      {/* Achievements Section */}
      <Container sx={{ py: 5 }}>
        <Typography variant="h4" sx={{ mb: 4, textAlign: 'center' }}>
          NCC Achievements
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <CardMedia
                component="img"
                height="200"
                image={img1} // Use the imported image
                alt="Achievement 1"
              />
              <CardContent>
                {/* <Typography variant="h6">Achievement 1</Typography> */}
                <Typography variant="body2">EBSB 2024-25</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <CardMedia
                component="img"
                height="200"
                image={img2} // Use the imported image
                alt="Achievement 2"
              />
              <CardContent>
                {/* <Typography variant="h6">Achievement 2</Typography> */}
                <Typography variant="body2">Andhra Pradesh Trek-III</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <CardMedia
                component="img"
                height="200"
                image={img3} // Use the imported image
                alt="Achievement 3"
              />
              <CardContent>
                {/* <Typography variant="h6">Achievement 3</Typography> */}
                <Typography variant="body2">RDC-2025</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>

      {/* About NCC KITSW Section */}
      <Box sx={{ py: 5, backgroundColor: '#f4f4f4' }}>
        <Container>
          <Typography variant="h4" sx={{ mb: 2, textAlign: 'center' }}>
            About NCC KITSW
          </Typography>
          <Typography variant="body1">
            The National Cadet Corps (NCC) at KITSW provides an opportunity for students to develop leadership
            skills, discipline, and a sense of responsibility. It has a rich history of contributing to the growth
            of the nation by training young cadets to serve in times of need.
          </Typography>
          
        </Container>
      </Box>
      <Footer />
    </div>
  );
};

export default HomePage;
