import {useContext} from 'react';
import {Navigate, Outlet} from 'react-router-dom';
import {AuthContext} from '../features/auth/AuthContext.jsx';

const ProtectedRoute = () => {
  const {auth} = useContext(AuthContext);
  return auth.token ? <Outlet/> : <Navigate to="/login" replace/>;
};

export default ProtectedRoute;
