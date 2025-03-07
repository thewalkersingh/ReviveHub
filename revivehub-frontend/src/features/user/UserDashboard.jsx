import {Card, CardActionArea, CardContent, Container, Grid, Typography} from '@mui/material';
import {useNavigate} from 'react-router-dom';

const UserDashboard = () => {
  const navigate = useNavigate();
  
  // Define the user-specific management options
  const userOptions = [
    {
      title: "Vehicle Requests",
      description: "View and track your vehicle requests.",
      route: "/user/vehicle-requests",
    },
    {
      title: "Insurance Bought",
      description: "Review your insurance policies and details.",
      route: "/user/insurance",
    },
    {
      title: "Test Rides Booked",
      description: "Check your upcoming and past test rides.",
      route: "/user/test-rides",
    },
    // Add more options as needed
  ];
  
  const handleCardClick = (route) => {
    navigate(route);
  };
  
  return (
    <Container sx={{marginTop: 4}}>
      <Typography variant="h4" gutterBottom>
        User Dashboard
      </Typography>
      <Grid container spacing={4}>
        {userOptions.map((option, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card>
              <CardActionArea onClick={() => handleCardClick(option.route)}>
                <CardContent>
                  <Typography variant="h6" component="div">
                    {option.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {option.description}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default UserDashboard;
