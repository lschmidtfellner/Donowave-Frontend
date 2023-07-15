import React, { useState, useEffect } from 'react'
import { getCampaigns } from '../api/campaignService'

export const CampaignContext = React.createContext()

export const CampaignContextProvider = (props) => {
  const [campaigns, setCampaigns] = useState([])

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const data = await getCampaigns()
        console.log('Response from server:', data)
        setCampaigns(data)
        console.log('Campaigns set:', campaigns)
      } catch (error) {
        console.log(error)
      }
    }
    
    fetchCampaigns()
  }, [campaigns])

  return (
    <CampaignContext.Provider value={{ campaigns, setCampaigns}}>
      {props.children}
    </CampaignContext.Provider>
  )
}
