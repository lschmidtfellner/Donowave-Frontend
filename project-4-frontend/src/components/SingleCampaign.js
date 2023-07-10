import React from 'react'

const SingleCampaign = ({ campaign }) => (
  <div>
    <h2>{campaign.title}</h2>
    <p>{campaign.deadline}</p>
    <p>
      ${campaign.raised_amount} of ${campaign.goal_amount}
    </p>
  </div>
)

export default SingleCampaign
