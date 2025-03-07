import {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {Box, CircularProgress, Container, Typography} from '@mui/material';
import api from "../../api/axios.js";
import {formatCurrency} from "../../utils/formatCurrency.js";
import VehicleImageGallery from "./VehicleImageGallery.jsx";


const VehicleDetails = () => {
  const {id} = useParams();
  const [vehicle, setVehicle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    api.get(`/vehicles/${id}`)
      .then((response) => {
        setVehicle(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching vehicle details:", err);
        setError("Failed to fetch vehicle details");
        setLoading(false);
      });
  }, [id]);
  
  if (loading) {
    return (
      <Container>
        <CircularProgress/>
      </Container>
    );
  }
  
  if (error) {
    return (
      <Container>
        <Typography color="error">{error}</Typography>
      </Container>
    );
  }
  
  if (!vehicle) {
    return (
      <Container>
        <Typography>No vehicle found.</Typography>
      </Container>
    );
  }
  
  return (
    <Container sx={{marginTop: 4}}>
      <Typography variant="h4" gutterBottom>
        {vehicle.manufacturer} {vehicle.name}
      </Typography>
      <Typography variant="h6" color="primary">
        {formatCurrency(vehicle.price)}
      </Typography>
      <Typography variant="body1" gutterBottom>
        {vehicle.description}
      </Typography>
      <Box sx={{marginTop: 2}}>
        <Typography variant="subtitle1">Details:</Typography>
        <Typography variant="body2">Type: {vehicle.type}</Typography>
        <Typography variant="body2">Color: {vehicle.color}</Typography>
        <Typography variant="body2">Manufactured: {vehicle.manufactureYear}</Typography>
        <Typography variant="body2">
          Registration: {vehicle.registration} (Month: {vehicle.registrationMonth}, Year: {vehicle.registrationYear})
        </Typography>
        <Typography variant="body2">
          Engine: {vehicle.engine} cc, Fuel Type: {vehicle.fuelType}
        </Typography>
      </Box>
      <Box sx={{marginTop: 4}}>
        <Typography variant="h6" gutterBottom>
          Vehicle Images
        </Typography>
        <VehicleImageGallery images={vehicle.images}/>
      </Box>
    </Container>
  );
};

export default VehicleDetails;
