import axios from 'axios'

const token = localStorage.getItem('authToken');
const api = axios.create({
  baseURL: 'https://project4-fundraiser-52c48ba180da.herokuapp.com',
  headers: { 'Authorization': `Token ${token}` }
});


// api.interceptors.request.use(config => {
//   config.headers['X-CSRFToken'] = Cookies.get('csrftoken');
//   return config;
// })

export default api
