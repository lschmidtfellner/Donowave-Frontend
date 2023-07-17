import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/authContextComponent";
import { getUserCampaigns, getUserDonations } from "../api/userService";
import SingleCampaign from "../components/SingleCampaign";
import { Link } from "react-router-dom";

function MyAccount() {
  const { user } = useContext(AuthContext);
  const [userCampaigns, setUserCampaigns] = useState([]);
  const [userDonations, setUserDonations] = useState([]);
  const [password, setPassword] = useState('');

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
    <div className="flex flex-col items-center mt-8 w-full mx-auto max-w-screen-lg z-50">
      <div className="w-10/12 mt-4 rounded-md py-2">
        <div className="w-full text-center">
        <h2 className="text-left text-3xl font-bold leading-9 tracking-tight text-black mb-10">
            MY SETTINGS
          </h2>
          <div className="bg-white rounded-md mb-8 p-4 shadow">
          <label className="font-bold text-xs text-left">EDIT PASSWORD:</label>
          <input
            className="block w-full rounded-full border-0 py-1.5 pl-5 pr-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 mt-1 mb-6"
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="aqua rounded-full lg:w-1/6 md:w-1/6 py-2 w-1/2 text-white font-bold  hover:text-black mt-4 text-xs">Submit</button>
          </div>
          <div className="border-t-2 border-gray-400 my-10 w-1/2"></div>
          <h2 className="text-left text-3xl font-bold leading-9 tracking-tight text-black mb-10">
            CAMPAIGNS
          </h2>
          <div className="bg-white rounded-md mb-8 p-4 shadow">
            {userCampaigns.length === 0 ? (
              <p className="text-base text-left ml-8">No campaigns found.</p>
            ) : (
              userCampaigns.map((campaign) => (
                <Link to={`/campaigns/details?id=${campaign.id}`} key={campaign.id}>
                  <SingleCampaign campaign={campaign} />
                </Link>
              ))
            )}
          </div>
          <div className="border-t-2 border-gray-400 my-10 w-1/2"></div>
          <h2 className="text-left text-3xl font-bold leading-9 tracking-tight text-black mt-10 mb-10">MY DONATIONS</h2>
          <div className="bg-white rounded-md mb-8 p-4 shadow">
          {userDonations.length === 0 ? (
            <p className="text-base text-left ml-8">No donations found.</p>
          ) : (
            userDonations.map((donation) => (
              <Link
                to={`/campaigns/details?id=${donation.campaign.id}`}
                key={donation.id}
              >
                <div>
                  <h3>{donation.amount}</h3>
                </div>
              </Link>
            ))
          )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyAccount;