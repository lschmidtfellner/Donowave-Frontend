import api from './apiConfig'

export const getCampaigns = async () => {
  const response = await api.get('/api/campaigns/')
  return response.data
}

export const getCampaign = async (id) => {
  const response = await api.get(`/api/campaigns/${id}/`)
  return response.data
}

export const createCampaign = async (campaignData) => {
  const response = await api.post('/api/campaigns/', campaignData)
  return response.data
}

export const updateCampaign = async (id, campaignData) => {
  const response = await api.put(`/api/campaigns/${id}/`, campaignData)
  return response.data
}

export const deleteCampaign = async (id) => {
  const response = await api.delete(`/api/campaigns/${id}/`)
  return response.data
}

export const getCampaignDonations = async (id) => {
  const response = await api.get(`/api/campaigns/${id}/donations/`)
  return response.data
}
