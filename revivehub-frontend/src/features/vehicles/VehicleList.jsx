// src/pages/VehicleList.jsx
import {useEffect, useState} from 'react';
import api from '../../api/axios.js';
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Container,
  FormControl,
  Grid2,
  InputLabel,
  MenuItem,
  Select,
  Typography
} from '@mui/material';
import {formatCurrency} from "../../utils/formatCurrency.js";


const VehicleList = () => {
  const [vehicles, setVehicles] = useState([]);
  const [filteredVehicles, setFilteredVehicles] = useState([]);
  const [filterType, setFilterType] = useState('All');
  const [sortOrder, setSortOrder] = useState('name-asc');
  
  useEffect(() => {
    api.get('/vehicles')
      .then(response => {
        setVehicles(response.data);
      })
      .catch(error => {
        console.error("Error fetching vehicles:", error);
      });
  }, []);
  
  useEffect(() => {
    let updatedList = [...vehicles];
    
    // Filtering
    if (filterType !== 'All') {
      updatedList = updatedList.filter(vehicle => vehicle.type === filterType);
    }
    
    // Sorting
    updatedList.sort((a, b) => {
      if (sortOrder === 'price-asc') {
        return a.price - b.price;
      } else if (sortOrder === 'price-desc') {
        return b.price - a.price;
      } else if (sortOrder === 'name-asc') {
        return a.name.localeCompare(b.name);
      } else if (sortOrder === 'name-desc') {
        return b.name.localeCompare(a.name);
      }
      return 0;
    });
    
    setFilteredVehicles(updatedList);
  }, [vehicles, filterType, sortOrder]);
  
  return (<Container sx={{marginTop: 4}}>
    <Typography variant="h4" component="h1" gutterBottom>
      Vehicle Listings
    </Typography>
    
    {/* Filtering and Sorting Controls */}
    <Box sx={{display: 'flex', justifyContent: 'space-between', marginBottom: 2}}>
      <FormControl sx={{minWidth: 150}}>
        <InputLabel id="filter-type-label">Filter By Type</InputLabel>
        <Select
          labelId="filter-type-label"
          value={filterType}
          label="Filter By Type"
          onChange={(e) => setFilterType(e.target.value)}
        >
          <MenuItem value="All">All</MenuItem>
          <MenuItem value="Two-Wheeler">Two-Wheeler</MenuItem>
          <MenuItem value="Four-Wheeler">Four-Wheeler</MenuItem>
        </Select>
      </FormControl>
      <FormControl sx={{minWidth: 150}}>
        <InputLabel id="sort-order-label">Sort By</InputLabel>
        <Select
          labelId="sort-order-label"
          value={sortOrder}
          label="Sort By"
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <MenuItem value="name-asc">Name (A-Z)</MenuItem>
          <MenuItem value="name-desc">Name (Z-A)</MenuItem>
          <MenuItem value="price-asc">Price (Low to High)</MenuItem>
          <MenuItem value="price-desc">Price (High to Low)</MenuItem>
        </Select>
      </FormControl>
    </Box>
    
    <Grid2 container spacing={4}>
      {filteredVehicles.map(vehicle => (<Grid2 item xs={12} sm={6} md={4} key={vehicle.id}>
        <Card>
          <CardActionArea>
            <CardMedia
              component="img"
              height="140"
              image={`https://via.placeholder.com/300x140?text=${encodeURIComponent(vehicle.name)}`}
              alt={vehicle.name}
            />
            <CardContent>
              <Typography variant="h6" component="div">
                {vehicle.name}
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
                {vehicle.description}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid2>))}
    </Grid2>
  </Container>);
};

export default VehicleList;
