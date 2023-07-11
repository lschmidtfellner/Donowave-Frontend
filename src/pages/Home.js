import React, { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom';
import SingleCampaign from '../components/SingleCampaign';
import { CampaignContext, CampaignContextProvider } from '../context/campaignContextComponent';
import categoryURLs from '../data/categoryURLs';

const Home = () => {
  const { campaigns, donations } = useContext(CampaignContext);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');

  const filteredCampaigns = campaigns.filter(campaign =>
    campaign.title.toLowerCase().includes(search.toLowerCase()) &&
    (category ? campaign.category === category : true)
  );

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  return (
    <div>
      {campaigns.map((campaign) => (
        <SingleCampaign key={campaign.id} campaign={campaign} />
      ))}
      <input
        type="text"
        placeholder="Search campaigns..."
        value={search}
        onChange={handleSearch}
      />
      <select value={category} onChange={handleCategoryChange}>
        <option value="">All Categories</option>
        {categoryURLs.map((cat, index) => (
          <option key={index} value={cat.category}>
            {cat.full_name}
          </option>
        ))}
      </select>

      {filteredCampaigns.map((campaign) => (
        <SingleCampaign key={campaign.id} campaign={campaign} />
      ))}
    </div>
  );
};

export default Home;
