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
  const response = await api.post('/api/campaigns/', { campaign: campaignData })
  return response.data
}

export const updateCampaign = async (id, campaignData) => {
  const response = await api.put(`/api/campaigns/${id}/`, { campaign: campaignData })
  return response.data
}

export const deleteCampaign = async (id) => {
  const response = await api.delete(`/api/campaigns/${id}/`)
  return response.data
}
