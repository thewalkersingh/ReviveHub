import {Card, CardActionArea, CardContent, Container, Grid2, Typography} from '@mui/material';
import {useNavigate} from 'react-router-dom';

const Vehicles = () => {
  const navigate = useNavigate();
  
  const handleCardClick = (vehicleType) => {
    // Navigate to a detailed page for the selected type if needed,
    // for now, we'll simply log the selection or redirect accordingly.
    navigate(`/vehicles/${vehicleType}`);
  };
  
  return (
    <Container sx={{marginTop: 4}}>
      <Typography variant="h4" gutterBottom>
        Vehicles
      </Typography>
      <Grid2 container spacing={4}>
        {/* Two-wheeler Card */}
        <Grid2 item xs={12} sm={6}>
          <Card>
            <CardActionArea onClick={() => handleCardClick('two-wheeler')}>
              <CardContent>
                <Typography variant="h5">Two-Wheeler</Typography>
                <Typography variant="body2">
                  Browse our range of bikes, scooters, and mopeds.
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid2>
        {/* Four-wheeler Card */}
        <Grid2 item xs={12} sm={6}>
          <Card>
            <CardActionArea onClick={() => handleCardClick('four-wheeler')}>
              <CardContent>
                <Typography variant="h5">Four-Wheeler</Typography>
                <Typography variant="body2">
                  Explore our collection of cars.
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid2>
      </Grid2>
    </Container>
  );
};

export default Vehicles;
