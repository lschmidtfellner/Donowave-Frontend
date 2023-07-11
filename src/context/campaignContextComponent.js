import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'

export const CampaignContext = React.createContext()

export const CampaignContextProvider = (props) => {
  const [campaigns, setCampaigns] = useState([])

  useEffect(() => {
      axios.get('https://project4-fundraiser-52c48ba180da.herokuapp.com/api/campaigns/')
        .then(response => {
          console.log('Response from server:', response.data); // Console log to check server response
          setCampaigns(response.data);
        })
        .catch((error) => console.log(error))
    }
  , [])

  return (
    <CampaignContext.Provider value={{ campaigns, setCampaigns }}>{props.children}</CampaignContext.Provider>
  )
}
