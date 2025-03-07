import {Box, Card, CardActionArea, CardContent, CardMedia, Typography} from '@mui/material';
import {useNavigate} from 'react-router-dom';
import PropTypes from "prop-types";
import {formatCurrency} from "../../utils/formatCurrency.js";

const VehicleCard = ({vehicle}) => {
  const navigate = useNavigate();
  
  const handleClick = () => {
    // Navigate to the detailed view for the vehicle
    navigate(`/vehicles/${vehicle.id}`);
  };
  
  return (
    <Card>
      <CardActionArea onClick={handleClick}>
        {/* Display a placeholder image. Replace with your actual image URL if available */}
        <CardMedia
          component="img"
          height="140"
          image={`https://via.placeholder.com/300x140?text=${encodeURIComponent(vehicle.name)}`}
          alt={vehicle.name}
        />
        <CardContent>
          <Typography variant="h6">
            {vehicle.manufacturer} {vehicle.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Type: {vehicle.type}
          </Typography>
          <Box sx={{marginTop: 1}}>
            <Typography variant="subtitle1" color="primary">
              {formatCurrency(vehicle.price)}
            </Typography>
          </Box>
          <Typography variant="body2" color="text.secondary" sx={{marginTop: 1}}>
            {vehicle.description.substring(0, 100)}...
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
VehicleCard.propTypes = {
  vehicle: PropTypes.shape({
    id: PropTypes.number.isRequired,
    manufacturer: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    description: PropTypes.string,
    images: PropTypes.arrayOf(PropTypes.string)
  }).isRequired,
};
export default VehicleCard;
