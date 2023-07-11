import api from './apiConfig';

export async function getDonations() {
  try {
    const response = await api.get('/donations');
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function getDonationById(id) {
  try {
    const response = await api.get(`/donations/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function createDonation(donationData) {
  try {
    const response = await api.post('/donations', donationData);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function updateDonation(id, donationData) {
  try {
    const response = await api.put(`/donations/${id}`, donationData);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function deleteDonation(id) {
  try {
    const response = await api.delete(`/donations/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}
