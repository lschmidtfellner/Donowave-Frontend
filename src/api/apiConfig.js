import axios from 'axios'

//Create Axios connection to our Heroku deployed API
const api = axios.create({
  baseURL: 'https://project4-fundraiser-52c48ba180da.herokuapp.com'
});

// Add a request interceptor to add the token to the header of every request
api.interceptors.request.use(config => {
  const token = localStorage.getItem('authToken');
  config.headers['Authorization'] = token ? `Token ${token}` : '';
  return config;
});

export default api;