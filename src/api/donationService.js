import api from './apiConfig'

export const getDonations = async () => {
  const response = await api.get('/api/donations/')
  return response.data
}

export const getDonation = async (id) => {
  const response = await api.get(`/api/donations/${id}/`)
  return response.data
}

export const createDonation = async (donationData) => {
  const response = await api.post('/api/donations/', donationData)
  return response.data
}

export const updateDonation = async (id, donationData) => {
  const response = await api.put(`/api/donations/${id}/`, donationData)
  return response.data
}

export const deleteDonation = async (id) => {
  const response = await api.delete(`/api/donations/${id}/`)
  return response.data
}
