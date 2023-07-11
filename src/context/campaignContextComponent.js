import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'

export const CampaignContext = React.createContext()

export const CampaignContextProvider = (props) => {
  const [campaigns, setCampaigns] = useState([])
  const [donations, setDonations] = useState([])

  useEffect(() => {
    api
      .get('api/campaigns/')
      .then((response) => {
        console.log('Response from server:', response.data)
        setCampaigns(response.data)
      })
      .catch((error) => console.log(error))
  }, [])

  useEffect(() => {
    api
      .get('api/donations/')
      .then((response) => {
        console.log('Response from server: ', response.data)
        setDonations(response.data)
      })
      .catch((error) => console.log(error))
  }, [])

  return (
    <CampaignContext.Provider value={{ campaigns, setCampaigns, donations, setDonations }}>
      {props.children}
    </CampaignContext.Provider>
  )
}
