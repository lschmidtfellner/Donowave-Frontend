import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/authContextComponent";
import { getUserCampaigns, getUserDonations } from "../api/userService";
import SingleCampaign from "../components/SingleCampaign";

function MyAccount() {
  const { user } = useContext(AuthContext);
  const [userCampaigns, setUserCampaigns] = useState([]);
  const [userDonations, setUserDonations] = useState([]);

  useEffect(() => {
    const fetchUserCampaignsAndDonations = async () => {
      try {
        const campaigns = await getUserCampaigns(user.user_id);
        const donations = await getUserDonations(user.user_id);
        setUserCampaigns(campaigns);
        setUserDonations(donations);
      } catch (error) {
        console.error("Error fetching user campaigns and donations:", error);
      }
    };

    fetchUserCampaignsAndDonations();
  }, [user.user_id]);

  return (
    <div>
      <h2>My Campaigns</h2>
      {userCampaigns.length === 0 ? (
        <p>No campaigns found.</p>
      ) : (
        userCampaigns.map((campaign) => (
          <SingleCampaign key={campaign.id} campaign={campaign} />
        ))
      )}

      <h2>My Donations</h2>
      {userDonations.length === 0 ? (
        <p>No donations found.</p>
      ) : (
        userDonations.map((donation) => (
          <div key={donation.id}>
            <h3>{donation.amount}</h3>
          </div>
        ))
      )}
    </div>
  );
}

export default MyAccount;
