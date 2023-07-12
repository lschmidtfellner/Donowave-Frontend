import React, { useContext } from "react";
import { AuthContext } from "../context/authContextComponent";
import { CampaignContext } from "../context/campaignContextComponent";

function MyAccount() {
  const { user } = useContext(AuthContext);
  const { campaigns, donations } = useContext(CampaignContext);

  // Filter campaigns created by the logged-in user
  const userCampaigns = campaigns.filter(
    (campaign) => campaign.created_by === user.id
  );

  // Filter donations made by the logged-in user
  const userDonations = donations.filter(
    (donation) => donation.donor === user.id
  );

  return (
    <div>
      <h2>My Campaigns</h2>
      {userCampaigns.map((campaign) => (
        <div key={campaign.id}>
          <h3>{campaign.title}</h3>
          {/* Display other campaign details... */}
        </div>
      ))}

      <h2>My Donations</h2>
      {userDonations.map((donation) => (
        <div key={donation.id}>
          <h3>{donation.amount}</h3>
          {/* Display other donation details... */}
        </div>
      ))}
    </div>
  );
}

export default MyAccount;
