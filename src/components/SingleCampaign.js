import React from 'react'
import categoryURLs from './data/categoryURLs'

const SingleCampaign = ({ campaign }) => (
  <div>
    <img src={categoryURLs.find(catObj => catObj.category === campaign.category).url}></img>
    <h2>{campaign.title}</h2>
    <p>{campaign.deadline}</p>
    <p>
      ${campaign.raised_amount} of ${campaign.goal_amount}
    </p>
  </div>
)

export default SingleCampaign
