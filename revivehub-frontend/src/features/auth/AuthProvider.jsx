// AuthProvider.jsx
import  { useState } from 'react';
import PropTypes from 'prop-types';
import { AuthContext } from './AuthContext.jsx';

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    token: localStorage.getItem('token') || null,
  });
  
  const login = (token) => {
    localStorage.setItem('token', token);
    setAuth({ token });
  };
  
  const logout = () => {
    localStorage.removeItem('token');
    setAuth({ token: null });
  };
  
  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
