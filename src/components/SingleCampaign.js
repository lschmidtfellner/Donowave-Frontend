import React from 'react'
import categoryURLs from '../data/categoryURLs'
import { Link } from 'react-router-dom'

const SingleCampaign = ({ campaign }) => (
  <Link to={`/campaigns/details?id=${campaign.id}`}>
    <div>
      <img
        src={
          categoryURLs.find((catObj) => catObj.category === campaign.category)
            .url
        }
      ></img>
      <h2>{campaign.title}</h2>
      <p>{campaign.deadline}</p>
      <p>
        ${campaign.raised_amount} of ${campaign.goal_amount}
      </p>
    </div>
  </Link>
)

export default SingleCampaign