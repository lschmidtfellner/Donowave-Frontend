import axios from 'axios'

// export const LOCALSTORAGE_KEY = 'token'

// Create a re-useable axios object, with our API as the baseURL
const api = axios.create({
  baseURL: 'https://project4-fundraiser-52c48ba180da.herokuapp.com/',
})

// Interceptors are axios functionality, that allows you to intercept requests and responses
// Here we're setting the token in localstorage to the Authorization header
// api.interceptors.request.use(config => {
//   const token = localStorage.getItem(LOCALSTORAGE_KEY)
//   config.headers.Authorization = token
//   return config
// })

export default api