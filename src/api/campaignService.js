import api from './apiConfig';

export async function getCampaigns() {
  try {
    const response = await api.get('/campaigns');
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function getCampaignById(id) {
  try {
    const response = await api.get(`/campaigns/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function createCampaign(campaignData) {
  try {
    const response = await api.post('/campaigns', campaignData);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function updateCampaign(id, campaignData) {
  try {
    const response = await api.put(`/campaigns/${id}`, campaignData);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function deleteCampaign(id) {
  try {
    const response = await api.delete(`/campaigns/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}
