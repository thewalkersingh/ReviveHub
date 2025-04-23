// src/components/Navbar.jsx
import {useContext, useState} from 'react';
import {AppBar, Box, Button, IconButton, Menu, MenuItem, Toolbar, Typography} from '@mui/material';
import {Link as RouterLink, useNavigate} from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import {jwtDecode} from 'jwt-decode';
import {AuthContext} from "../features/auth/AuthContext.jsx";

const Navbar = () => {
  const {auth, logout} = useContext(AuthContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  
  const handleMenuOpen = (e) => {
    setAnchorEl(e.currentTarget);
  };
  
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  
  // Determine user role from token
  let isAdmin = true;
  if (auth.token) {
    try {
      const decoded = jwtDecode(auth.token);
      // Example: token subject 'admin' means admin; adjust as needed
      if (decoded.roles && Array.isArray(decoded.roles)) {
        isAdmin = decoded.roles.includes('ADMIN');
      }
      // Fallback: check if the subject equals 'admin'
      else if (decoded.sub && decoded.sub.toLowerCase() === 'admin') {
        isAdmin = true;
      }
    } catch (error) {
      console.error('Error decoding token:', error);
    }
  }
  
  const handleDashboard = () => {
    handleMenuClose();
    if (isAdmin) {
      navigate('/admin/dashboard');
    } else {
      navigate('/user/dashboard');
    }
  };
  
  return (
    <AppBar position="static" sx={{width: '100%'}}>
      <Toolbar>
        {/* Logo on the Left */}
        <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
          <RouterLink to="/" style={{textDecoration: 'none', color: 'inherit'}}>
            ReviveHub
          </RouterLink>
        </Typography>
        {/* Center Links */}
        <Box sx={{flexGrow: 2, display: 'flex', justifyContent: 'center'}}>
          <Button color="inherit" component={RouterLink} to="/">
            Home
          </Button>
          <Button color="inherit" component={RouterLink} to="/vehicles">
            Vehicles
          </Button>
          <Button color="inherit" component={RouterLink} to="/services">
            Services
          </Button>
          <Button color="inherit" component={RouterLink} to="/about">
            About
          </Button>
          <Button color="inherit" component={RouterLink} to="/contact">
            Contact
          </Button>
        </Box>
        {/* Right Side: User Icon or Login/Signup */}
        <Box sx={{flexGrow: 0}}>
          {auth.token ? (
            <>
              <IconButton color="inherit" onClick={handleMenuOpen}>
                <AccountCircleIcon/>
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleMenuClose}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
              >
                <MenuItem onClick={handleDashboard}>Dashboard</MenuItem>
                <MenuItem onClick={() => {
                  handleMenuClose();
                  navigate('/settings');
                }}>
                  Settings
                </MenuItem>
                <MenuItem onClick={() => {
                  handleMenuClose();
                  logout();
                }}>
                  Logout
                </MenuItem>
              </Menu>
            </>
          ) : (
            <>
              <Button color="inherit" component={RouterLink} to="/login">
                Login
              </Button>
              <Button color="inherit" component={RouterLink} to="/signup">
                Signup
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
