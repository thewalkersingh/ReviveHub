import {useState} from 'react';
import api from '../../api/axios.js';
import {useNavigate} from 'react-router-dom';
import style from "./authStyles.module.css";

const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/auth/signup', {username, password});
      setMessage(response.data.message);
      setError(null);
      // Optionally navigate to login page
      navigate('/login');
    } catch (err) {
      setError('Signup failed.');
      console.error(err);
    }
  };
  
  return (
    <div className={style.form_container}>
      <div className={style.form_label}>
        <h2>Signup</h2>
        {message && <p style={{color: 'green'}}>{message}</p>}
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
          <button type="submit">Signup</button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
