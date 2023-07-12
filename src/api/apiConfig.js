import axios from 'axios'

const api = axios.create({
  baseURL: 'https://project4-fundraiser-52c48ba180da.herokuapp.com'
});

api.interceptors.request.use(config => {
  const token = localStorage.getItem('authToken');
  config.headers['Authorization'] = token ? `Token ${token}` : '';
  return config;
});

export default api;
