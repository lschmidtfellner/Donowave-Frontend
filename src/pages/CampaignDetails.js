import React, { useContext, useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
  campaignContextComponent,
  CampaignContext
} from '../context/campaignContextComponent'
import Swal from 'sweetalert2'
import categoryURLs from '../data/categoryURLs'
import { getCampaign } from '../api/campaignService'
import dateInterpreter from '../data/dateInterpreter'

const CampaignDetails = () => {
  const { campaigns } = useContext(CampaignContext)
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const selectedCampaignId = queryParams.get('id')
  const [selectedCampaign, setSelectedCampaign] = useState({})

  useEffect(() => {
    console.log('Running useEffect', { campaigns, selectedCampaignId })
    if (selectedCampaignId) {
      const fetchCampaign = async () => {
        const campaign = await getCampaign(selectedCampaignId)
        setSelectedCampaign(campaign)
      }
      fetchCampaign()
    }
  }, [selectedCampaignId])

  // Check if the selectedCampaign object is empty
  if (Object.keys(selectedCampaign).length === 0) {
    return <p>Loading...</p>
  }

  return (
    <div>
      <img
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
      <Link to={`/donationForm?id=${selectedCampaignId}`}><button>Donate Now</button></Link>
    </div>
  )
}

export default CampaignDetails