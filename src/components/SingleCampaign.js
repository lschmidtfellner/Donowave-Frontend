import React from "react";
import categoryURLs from "../data/categoryURLs";
import { Link } from "react-router-dom";
import dateInterpreter from "../data/dateInterpreter";

const SingleCampaign = ({ campaign }) => (
  <Link to={`/campaigns/details?id=${campaign.id}`}>
    <div className="flex flex-col p-4 mb-8">
      <div className="flex justify-start items-center">
        <img
          className="w-16 h-16 object-cover rounded-full mr-4"
          src={
            categoryURLs.find((catObj) => catObj.category === campaign.category)
              .url
          }
        ></img>
        <h2 className="font-bold text-black ml-1">{campaign.title}</h2>
      </div>
      <div className="text-left mt-4">
      <label className="font-bold text-xs">RAISED AMOUNT:</label>
      <p className="text-sm">
        {Number(campaign.raised_amount).toLocaleString()} DC of{" "}
        {Number(campaign.goal_amount).toLocaleString()} DC
      </p>
      </div>
      <div className="text-left mt-4">
      <label className="font-bold text-xs">DEADLINE:</label>
      <p className="text-sm">{dateInterpreter(campaign.deadline)}</p>
      </div>
    </div>
  </Link>
);

export default SingleCampaign;
