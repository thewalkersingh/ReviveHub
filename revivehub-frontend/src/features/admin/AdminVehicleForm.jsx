import {useState} from 'react';
import {Button, Container, TextField, Typography} from '@mui/material';
import api from '../../api/axios';
import {useNavigate} from 'react-router-dom';

const AdminVehicleForm = () => {
  const [manufacturer, setManufacturer] = useState('');
  const [name, setName] = useState('');
  const [color, setColor] = useState('');
  const [manufactureYear, setManufactureYear] = useState('');
  const [registration, setRegistration] = useState('');
  const [registrationYear, setRegistrationYear] = useState('');
  const [registrationMonth, setRegistrationMonth] = useState('');
  const [engine, setEngine] = useState('');
  const [fuelType, setFuelType] = useState('');
  const [type, setType] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [images, setImages] = useState([]);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  
  const handleFileChange = (e) => {
    setImages(e.target.files);
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Create vehicle (without images)
      const vehicleData = {
        manufacturer,
        name,
        color,
        manufactureYear: Number(manufactureYear),
        registration: Number(registration),
        registrationYear: Number(registrationYear),
        registrationMonth: Number(registrationMonth),
        engine: Number(engine),
        fuelType,
        type,
        price: Number(price),
        description,
      };
      const response = await api.post('/vehicles', vehicleData);
      const vehicleId = response.data.id;
      
      // If images are selected, upload them
      if (images.length > 0) {
        const formData = new FormData();
        for (let i = 0; i < images.length; i++) {
          formData.append('files', images[i]);
        }
        await api.post(`/vehicles/${vehicleId}/upload-images`, formData, {
          headers: {'Content-Type': 'multipart/form-data'},
        });
      }
      setMessage('Vehicle created successfully!');
      navigate('/dashboard');
    } catch (error) {
      console.error(error);
      setMessage('Error creating vehicle.');
    }
  };
  
  return (
    <Container>
      <Typography variant="h4">Add Vehicle</Typography>
      {message && <Typography color="primary">{message}</Typography>}
      <form onSubmit={handleSubmit}>
        <TextField label="Manufacturer" value={manufacturer} onChange={(e) => setManufacturer(e.target.value)} fullWidth
                   required margin="normal"/>
        <TextField label="Name" value={name} onChange={(e) => setName(e.target.value)} fullWidth required
                   margin="normal"/>
        <TextField label="Color" value={color} onChange={(e) => setColor(e.target.value)} fullWidth margin="normal"/>
        <TextField label="Manufacture Year" value={manufactureYear} onChange={(e) => setManufactureYear(e.target.value)}
                   fullWidth type="number" required margin="normal"/>
        <TextField label="Registration" value={registration} onChange={(e) => setRegistration(e.target.value)} fullWidth
                   type="number" margin="normal"/>
        <TextField label="Registration Year" value={registrationYear}
                   onChange={(e) => setRegistrationYear(e.target.value)} fullWidth type="number" margin="normal"/>
        <TextField label="Registration Month" value={registrationMonth}
                   onChange={(e) => setRegistrationMonth(e.target.value)} fullWidth type="number" margin="normal"/>
        <TextField label="Engine" value={engine} onChange={(e) => setEngine(e.target.value)} fullWidth type="number"
                   margin="normal"/>
        <TextField label="Fuel Type" value={fuelType} onChange={(e) => setFuelType(e.target.value)} fullWidth
                   margin="normal"/>
        <TextField label="Type" value={type} onChange={(e) => setType(e.target.value)} fullWidth required
                   margin="normal"/>
        <TextField label="Price" value={price} onChange={(e) => setPrice(e.target.value)} fullWidth type="number"
                   required margin="normal"/>
        <TextField label="Description" value={description} onChange={(e) => setDescription(e.target.value)} fullWidth
                   multiline rows={4} margin="normal"/>
        <input type="file" multiple onChange={handleFileChange} style={{marginTop: '16px'}}/>
        <Button type="submit" variant="contained" color="primary" sx={{marginTop: 2}}>
          Add Vehicle
        </Button>
      </form>
    </Container>
  );
};

export default AdminVehicleForm;
