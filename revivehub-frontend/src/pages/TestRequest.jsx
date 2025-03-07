import {useEffect} from 'react';
import api from '../api/axios.js';

const TestRequest = () => {
  useEffect(() => {
    // This should trigger the interceptor and include the token
    api.get('/test')
      .then(response => {
        console.log('Response:', response.data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, []);
  
  return <div>Testing API request... Check your console.</div>;
};

export default TestRequest;
