
import React, { useContext, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {
  CampaignContext
} from '../context/campaignContextComponent';
// import Swal from 'sweetalert2';
import categoryURLs from '../data/categoryURLs';
import { getCampaign } from '../api/campaignService';
import DonationForm from '../components/DonationForm'; // import the DonationForm component
import { Web3Context } from '../context/web3Context'; // import the Web3Context
import dateInterpreter from '../data/dateInterpreter'


const CampaignDetails = () => {
  const { campaigns } = useContext(CampaignContext);
  const { web3, accounts } = useContext(Web3Context); // get web3 and accounts from context
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const selectedCampaignId = queryParams.get('id');
  const [selectedCampaign, setSelectedCampaign] = useState({});
  const [openDonate, setOpenDonate] = useState(false); // Add this line

  useEffect(() => {
    console.log('Running useEffect', { campaigns, selectedCampaignId });
    if (selectedCampaignId) {
      const fetchCampaign = async () => {
        const campaign = await getCampaign(selectedCampaignId);
        setSelectedCampaign(campaign);
      };
      fetchCampaign();
    }
  }, [selectedCampaignId, campaigns]);

  // Check if the selectedCampaign object is empty
  if (Object.keys(selectedCampaign).length === 0) {
    return <p>Loading...</p>;
  }

  const handleDonateClick = async () => {
    if (!web3 || accounts.length === 0) {
      if (window.ethereum) {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
      }
    }
    setOpenDonate(true);
};

  return (
    <div>
      <img
        alt='whatever'
        src={
          categoryURLs.find((catObj) => catObj.category === selectedCampaign.category)
            .url
        }
      ></img>
      <h2>{selectedCampaign.title}</h2>
      <p>{dateInterpreter(selectedCampaign.deadline)}</p>
      <p>
        {Number(selectedCampaign.raised_amount).toLocaleString()}DC of {Number(selectedCampaign.goal_amount).toLocaleString()}DC
      </p>
      <p>{selectedCampaign.description}</p>

      <button onClick={handleDonateClick}>Donate Now</button>
      {openDonate && <DonationForm setOpen={setOpenDonate} />}
    </div>
  );
};

export default CampaignDetails;
