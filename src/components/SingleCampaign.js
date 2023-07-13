import React from 'react'
import categoryURLs from '../data/categoryURLs'
import { Link } from 'react-router-dom'
import dateInterpreter from '../data/dateInterpreter'

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
      <p>{dateInterpreter(campaign.deadline)}</p>
      <p>
        {Number(campaign.raised_amount).toLocaleString()}DC of {Number(campaign.goal_amount).toLocaleString()}DC
      </p>
    </div>
  </Link>
)

export default SingleCampaign