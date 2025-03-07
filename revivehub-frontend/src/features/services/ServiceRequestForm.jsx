// src/components/ServiceRequestForm.jsx
import {useState} from 'react';
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField} from '@mui/material';
import api from '../../api/axios.js';

const ServiceRequestForm = ({open, handleClose}) => {
  const [requestData, setRequestData] = useState({
    name: '',
    email: '',
    phone: '',
    vehicleDetails: '',
    message: ''
  });
  const [responseMsg, setResponseMsg] = useState(null);
  
  const handleChange = (e) => {
    setRequestData({
      ...requestData,
      [e.target.name]: e.target.value
    });
  };
  
  const handleSubmit = async () => {
    try {
      // For demonstration, we'll assume an endpoint /api/services/request exists.
      const response = await api.post('/services/request', requestData);
      setResponseMsg("Request submitted successfully!");
    } catch (error) {
      console.error("Error submitting service request:", error);
      setResponseMsg("Failed to submit request.");
    }
  };
  
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Request Vehicle</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          label="Name"
          name="name"
          fullWidth
          variant="outlined"
          value={requestData.name}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          label="Email"
          name="email"
          fullWidth
          variant="outlined"
          value={requestData.email}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          label="Phone"
          name="phone"
          fullWidth
          variant="outlined"
          value={requestData.phone}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          label="Vehicle Details"
          name="vehicleDetails"
          fullWidth
          variant="outlined"
          value={requestData.vehicleDetails}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          label="Message"
          name="message"
          fullWidth
          multiline
          rows={3}
          variant="outlined"
          value={requestData.message}
          onChange={handleChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained">
          Submit Request
        </Button>
      </DialogActions>
      {responseMsg && (
        <p style={{padding: '0 16px', color: 'green'}}>{responseMsg}</p>
      )}
    </Dialog>
  );
};

export default ServiceRequestForm;
