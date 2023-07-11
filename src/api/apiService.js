import api from './apiConfig'

export const registerUser = async (registerData) => {
  const resp = await api.post('/api/users/', { user: registerData })
  return resp
}

export const loginUser = async (loginData) => {
  const resp = await api.post('/api-auth/', { user: loginData })
  return resp
}

export const verifyUser = async () => {
  const token = localStorage.getItem('authToken')
  if (token) {
    api.defaults.headers.common.authorization = `Bearer ${token}`
    const resp = await api.get('/verify')
    return resp.data
  }
  return false
}

export const removeToken = () => {
  api.defaults.headers.common.authorization = null
}
