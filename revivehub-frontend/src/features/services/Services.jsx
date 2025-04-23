// src/pages/Services.jsx
import {useState} from 'react';
import {Card, CardActionArea, CardContent, Container, Grid, Typography} from '@mui/material';
import ServiceRequestForm from './ServiceRequestForm.jsx';

const services = [
  {title: 'Book Test Ride', description: 'Schedule a test ride for your favorite vehicle.'},
  {title: 'Vehicle Service', description: 'Get your vehicle serviced by professionals.'},
  {title: 'Insurance', description: 'Find the best insurance plans for your vehicle.'},
  {title: 'RTO', description: 'Assistance with RTO related processes.'},
  {title: 'Documents', description: 'Get help with all necessary vehicle documentation.'},
  {title: 'Request Vehicle', description: 'Request a vehicle you desire.'},
];

const Services = () => {
  const [openRequestForm, setOpenRequestForm] = useState(false);
  
  const handleServiceClick = (serviceTitle) => {
    if (serviceTitle === 'Request Vehicle') {
      setOpenRequestForm(true);
    } else {
      // Handle other service clicks
      console.log(`Service clicked: ${serviceTitle}`);
    }
  };
  
  const handleCloseForm = () => {
    setOpenRequestForm(false);
  };
  
  return (
    <Container sx={{marginTop: 4}}>
      <Typography variant="h4" gutterBottom>
        Our Services
      </Typography>
      <Grid container spacing={4}>
        {services.map((service, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card>
              <CardActionArea onClick={() => handleServiceClick(service.title)}>
                <CardContent>
                  <Typography variant="h6">{service.title}</Typography>
                  <Typography variant="body2">{service.description}</Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
      <ServiceRequestForm open={openRequestForm} handleClose={handleCloseForm}/>
    </Container>
  );
};

export default Services;
