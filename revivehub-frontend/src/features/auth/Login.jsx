import {useContext, useState} from 'react';
import api from '../../api/axios.js';
import {jwtDecode} from "jwt-decode";
import {AuthContext} from './AuthContext.jsx';
import {useNavigate} from 'react-router-dom';
import style from "./authStyles.module.css";

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const {login} = useContext(AuthContext);
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/auth/login', {username, password});
      // Assuming token is in response.data.data
      const token = response.data.data;
      login(token);
      
      // Decode the token to check the user role (using the subject field)
      const decoded = jwtDecode(token);
      if (decoded.sub === 'admin') {
        navigate('/dashboard');
      } else {
        navigate('/');
      }
    } catch (err) {
      setError('Login failed. Please check your credentials.');
      console.error(err);
    }
  };
  
  return (
    <div className={style.form_container}>
      <div className={style.form_label}>
        <h2>Login</h2>
        {error && <p style={{color: 'red'}}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <div>
            <label>Username:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
