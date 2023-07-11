import React, { useContext, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom'
import { campaignContextComponent, CampaignContext } from '../context/campaignContextComponent'
import Swal from 'sweetalert2'
import categoryURLs from '../data/categoryURLs'

const CampaignDetails = () => {
  const { campaigns } = useContext(CampaignContext);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const selectedCampaignId = queryParams.get('id');
  const [selectedCampaign, setSelectedCampaign] = useState(null);

  useEffect(() => {
    if (selectedCampaignId) {
      const campaign = campaigns.find((campaign) => campaign._id === selectedCampaignId);
      setSelectedCampaign(campaign);
    }
  }, [campaigns, selectedCampaignId]);

  if (!selectedCampaign) {
    return <span>Loading...</span>;
  }

  return (
    <div>
      <img src={categoryURLs.find(catObj => catObj.category === selectedCampaign.category).url}></img>
      <h2>{selectedCampaign.title}</h2>
      <p>{selectedCampaign.deadline}</p>
      <p>${selectedCampaign.raised_amount} of ${selectedCampaign.goal_amount}</p>
      <p>{selectedCampaign.description}</p>
      <button>Donate Now</button>
    </div>
  )
}

export default CampaignDetails