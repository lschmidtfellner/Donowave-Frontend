import React, { useContext, useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import {
  CampaignContext
} from '../context/campaignContextComponent'
import categoryURLs from '../data/categoryURLs'
import { getCampaign, getCampaignDonations } from '../api/campaignService'
import DonationForm from '../components/DonationForm'
import { Web3Context } from '../context/web3Context'
import dateInterpreter from '../data/dateInterpreter'

const CampaignDetails = () => {
  const { campaigns } = useContext(CampaignContext);
  const { web3, accounts } = useContext(Web3Context);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const selectedCampaignId = queryParams.get('id');
  const [selectedCampaign, setSelectedCampaign] = useState({});
  const [openDonate, setOpenDonate] = useState(false);
  const [donations, setDonations] = useState([]);

  const fetchCampaign = async () => {
    const campaign = await getCampaign(selectedCampaignId);
    setSelectedCampaign(campaign);
  }

  const fetchDonations = async () => {
    const donationsData = await getCampaignDonations(selectedCampaignId);
    setDonations(donationsData);
  }

  const progress = Math.min(
    (parseInt(selectedCampaign.raised_amount) /
      parseInt(selectedCampaign.goal_amount)) *
    100,
    100
  );

  useEffect(() => {
    if (selectedCampaignId) {
      fetchCampaign();
      fetchDonations();
    }
  }, [selectedCampaignId]);

  if (Object.keys(selectedCampaign).length === 0) {
    return <p>Loading...</p>
  }

  const handleDonateClick = async () => {
    if (!web3 || accounts.length === 0) {
      if (window.ethereum) {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
      }
    }
    setOpenDonate(true);
  }

  const btnColor = categoryURLs.find(
    (catObj) => catObj.category === selectedCampaign.category
  ).hex;

  return (
    <div className="campaignFeed w-10/12 mt-8 mx-auto">
      <div className="bg-white rounded-md mb-8 p-4 shadow">
        <div className="flex flex-col p-4">
          <div className="flex justify-center items-center">
            <img
              src={
                categoryURLs.find(
                  (catObj) => catObj.category === selectedCampaign.category
                ).url
              }
              className="object-contain w-full h-full max-w-20 max-h-20 mr-2"
            ></img>
            <h2 className="font-bold text-black ml-4">
              {selectedCampaign.title}
            </h2>
          </div>
          <div className="text-left mt-4 text-base">
            <p>{selectedCampaign.description}</p>
          </div>
          <div className="text-left mt-4">
            <label className="font-bold text-xs">RAISED AMOUNT:</label>
            <p>
              {Number(selectedCampaign.raised_amount).toLocaleString()} DC of{' '}
              {Number(selectedCampaign.goal_amount).toLocaleString()} DC
            </p>
          </div>
          <div className="text-left mt-4">
            <label className="font-bold text-xs">DEADLINE:</label>
            <p>{dateInterpreter(selectedCampaign.deadline)}</p>
          </div>
          <div
            className="prog-bar-container"
            style={{
              height: '10px',
              width: '100%',
              backgroundColor: '#EBE8F7',
              borderRadius: '5px',
              margin: '20px 0 20px 0'
            }}
          >
            <div
              className="prog-bar-completion"
              style={{
                width: `${progress}%`,
                height: '10px',
                backgroundColor: '#8FEFB6',
                alignItems: 'left',
                borderRadius: '5px',
                boxShadow: progress === 100 ? '0px 0px 10px 5px #C2F9C6' : ''
              }}
            ></div>
          </div>
          <div>
          <h3>Latest Donations</h3>
          {donations.slice(-3).reverse().map((donation, index) => (
            <div key={index}>
              <p>Amount: {donation.amount}</p>
              <p>On: {dateInterpreter(donation.created_at)}</p>
            </div>
          ))}
        </div>
          <button
            style={{ backgroundColor: btnColor }}
            onClick={handleDonateClick}
            className="rounded-full lg:w-1/6 md:w-1/6 py-2 w-1/2 text-white font-bold hover:text-black mt-4 text-xs"
          >
            Donate Now
          </button>
          {openDonate && (
            <DonationForm
              setOpen={setOpenDonate}
              refreshCampaign={fetchCampaign}
              fetchDonations={fetchDonations}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default CampaignDetails;
