import axios from 'axios'

//Create Axios connection to our Heroku deployed API
const api = axios.create({
  baseURL: 'https://sei-p4-fundwave-backend-auth-1f25cf0c4c2f.herokuapp.com'
});

// Add a request interceptor to add the token to the header of every request
api.interceptors.request.use(config => {
  const token = localStorage.getItem('authToken');
  config.headers['Authorization'] = token ? `Token ${token}` : '';
  return config;
});

export default api;