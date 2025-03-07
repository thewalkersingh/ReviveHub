import {Card, CardActionArea, CardContent, Container, Grid2, Typography} from '@mui/material';
import {useNavigate} from 'react-router-dom';

const AdminDashboard = () => {
  const navigate = useNavigate();
  
  // Define management options with title, description, and route
  const managementOptions = [
    {
      title: "Add Vehicle",
      description: "Add a new vehicle to the inventory.",
      route: "/admin/vehicle-form",
    },
    {
      title: "Manage Vehicles",
      description: "Update or delete vehicles from the inventory.",
      route: "/admin/manage-vehicles",
    },
    {
      title: "Manage Users",
      description: "View and manage registered users.",
      route: "/admin/manage-users",
    },
    {
      title: "Manage Garages",
      description: "Add or update garage information.",
      route: "/admin/manage-garages",
    },
    // Add more options as needed
  ];
  
  const handleCardClick = (route) => {
    navigate(route);
  };
  
  return (
    <Container sx={{marginTop: 4}}>
      <Typography variant="h4" gutterBottom>
        Admin Dashboard
      </Typography>
      <Grid2 container spacing={4}>
        {managementOptions.map((option, index) => (
          <Grid2 item xs={12} sm={6} md={4} key={index}>
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
          </Grid2>
        ))}
      </Grid2>
    </Container>
  );
};
export default AdminDashboard;
