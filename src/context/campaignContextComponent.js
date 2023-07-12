import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import api from '../api/apiConfig'
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
      } catch (error) {
        console.log(error)
      }
    }
    
    fetchCampaigns()
  }, [])


  return (
    <CampaignContext.Provider value={{ campaigns, setCampaigns}}>
      {props.children}
    </CampaignContext.Provider>
  )
}
