import api from './apiConfig';

export async function register(username, password, email) {
  try {
    const response = await api.post('/register', {
      username, password, email
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function signin(username, password) {
  try {
    const response = await api.post('/signin', {
      username, password
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function signout() {
  try {
    const response = await api.post('/signout');
    return response.data;
  } catch (error) {
    throw error;
  }
}
