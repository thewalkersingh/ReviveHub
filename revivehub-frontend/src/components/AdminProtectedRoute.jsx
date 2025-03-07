import {Navigate, Outlet} from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';
import {AuthContext} from '../features/auth/AuthContext.jsx';
import {useContext} from "react";

const AdminProtectedRoute = () => {
  const {auth} = useContext(AuthContext);
  
  if (!auth.token) {
    // Not logged in; redirect to log in
    return <Navigate to="/login" replace/>;
  }
  
  // Decode the token to get the username
  let decoded;
  try {
    decoded = jwtDecode(auth.token);
  } catch (error) {
    // If token is invalid, redirect to log in
    console.log(error);
    return <Navigate to="/login" replace/>;
  }
  
  // Check if the username is "admin"
  if (decoded.sub !== 'admin') {
    // Not an admin, redirect to home or show an unauthorized message
    return <Navigate to="/" replace/>;
  }
  
  return <Outlet/>;
};

export default AdminProtectedRoute;
