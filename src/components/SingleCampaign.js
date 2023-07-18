import React from 'react'
import categoryURLs from '../data/categoryURLs'
import { Link } from 'react-router-dom'
import dateInterpreter from '../data/dateInterpreter'

const SingleCampaign = ({ campaign }) => {
  const progress = Math.min(
    (parseInt(campaign.raised_amount) / parseInt(campaign.goal_amount)) * 100,
    100
  )

  console.log(`Progress for campaign ${campaign.id}:`, progress)
  return (
    <Link to={`/campaigns/details?id=${campaign.id}`}>
      <div className="flex flex-col p-4 mb-8">
        <div className="flex justify-start items-center">
          <img
            className="w-16 h-16 object-cover rounded-full mr-4"
            src={
              categoryURLs.find(
                (catObj) => catObj.category === campaign.category
              ).url
            }
          ></img>
          <h2 className="font-bold text-black ml-1">{campaign.title}</h2>
        </div>
        <div className="text-left mt-4">
          <label className="font-bold text-xs">RAISED AMOUNT:</label>
          <p className="text-sm">
            {Number(campaign.raised_amount).toLocaleString()} DC of{' '}
            {Number(campaign.goal_amount).toLocaleString()} DC
          </p>
        </div>
        <div className="text-left mt-4">
          <label className="font-bold text-xs">DEADLINE:</label>
          <p className="text-sm">{dateInterpreter(campaign.deadline)}</p>
        </div>
        <div
          className="prog-bar-container"
          style={{
            height: '10px',
            width: '100%',
            backgroundColor: '#EBE8F7',
            borderRadius: '5px',
            margin: '20px 0 0 0'
          }}
        >
          <div
            className="prog-bar-completion"
            style={{
              width: `${progress}%`,
              height: '10px',
              backgroundColor: '#8FEFB6',
              alignItems: 'left',
              borderRadius: '5px'
            }}
          ></div>
        </div>
      </div>
    </Link>
  )
}

export default SingleCampaign
