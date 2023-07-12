import api from './apiConfig'

export const registerUser = async (registerData) => {
    console.log('Register Data:', registerData); // Log the registerData object
  
    try {
      const resp = await api.post('/api/register/', registerData);
      console.log('Registration Response:', resp.data); // Log the registration response data
      return resp;
    } catch (error) {
      console.error('Registration Failed:', error); // Log the registration error
      throw error; // Rethrow the error to handle it in the component
    }
  };
  
  
export const loginUser = async (loginData) => {
    const resp = await api.post('/api/login/', loginData);
    if (resp.status === 200) {
      localStorage.setItem('authToken', resp.data.token);
      return resp.data;
    }
    throw new Error('Invalid login credentials');
}

export const isTokenValid = async () => {
    try {
      const response = await api.get('/api/is_token_valid/');
      return response.data.valid;
    } catch (error) {
      throw new Error('Error checking token validity');
    }
  };

export const removeToken = () => {
    localStorage.removeItem('authToken');
}
