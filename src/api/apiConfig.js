import axios from 'axios'
import Cookies from 'js-cookie'

const api = axios.create({
  baseURL: 'https://project4-fundraiser-52c48ba180da.herokuapp.com',
})

// api.interceptors.request.use(config => {
//   config.headers['X-CSRFToken'] = Cookies.get('csrftoken');
//   return config;
// })

export default api
