import {useContext, useEffect, useState} from 'react';
import {Box, Button, Container, TextField, Typography} from '@mui/material';

import {useNavigate} from 'react-router-dom';
import {AuthContext} from "../features/auth/AuthContext.jsx";

const Settings = () => {
  const {auth} = useContext(AuthContext);
  const navigate = useNavigate();
  
  // For demo purposes, we'll assume that the current user info can be fetched.
  // In a real application, you might call an API to get the current user's details.
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  
  useEffect(() => {
    // If you have an endpoint to fetch user settings, call it here.
    // For now, we'll simulate by extracting username from token if available.
    if (auth.token) {
      // For demonstration, we're just decoding the token's subject.
      // In a real app, the token should include more user details or fetch them from an endpoint.
      try {
        const decoded = require('jwt-decode')(auth.token);
        setUsername(decoded.sub || '');
      } catch (err) {
        console.error('Error decoding token:', err);
      }
    }
  }, [auth.token]);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Here, call your API to update settings.
      // For demo, we'll just simulate a success response.
      // Example: await api.put('/api/users/settings', { username, email, password });
      setMessage('Settings updated successfully!');
    } catch (err) {
      console.error(err);
      setMessage('Failed to update settings.');
    }
  };
  
  return (
    <Container sx={{marginTop: 4}}>
      <Typography variant="h4" gutterBottom>
        Settings
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{mt: 2}}>
        <TextField
          label="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary" sx={{mt: 2}}>
          Save Changes
        </Button>
        {message && (
          <Typography variant="body1" color="primary" sx={{mt: 2}}>
            {message}
          </Typography>
        )}
      </Box>
    </Container>
  );
};

export default Settings;
