import api from './apiConfig'

export const registerUser = async (registerData) => {
    const resp = await api.post('/api/register/', registerData);
    return resp;
  }
  
  export const loginUser = async (loginData) => {
    const resp = await api.post('/api/login/', loginData);
    if (resp.status === 200) {
      localStorage.setItem('authToken', resp.data.token);
      api.defaults.headers.common.authorization = `Token ${resp.data.token}`;
      return resp.data;
    }
    throw new Error('Invalid login credentials');
  }
  
  export const removeToken = () => {
    localStorage.removeItem('authToken');
    api.defaults.headers.common.authorization = null;
  }
  