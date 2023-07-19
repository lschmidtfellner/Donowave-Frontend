import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { useCombobox } from "downshift";
import SingleCampaign from "../components/SingleCampaign";
import { CampaignContext } from "../context/campaignContextComponent";
import { getCampaigns } from "../api/campaignService";
import categoryURLs from "../data/categoryURLs";


const Home = () => {
  const { campaigns, setCampaigns } = useContext(CampaignContext);
  const [category, setCategory] = useState("");

  // Function to handle changing the campaign category
  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  // Fetch campaigns on component mount
  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const data = await getCampaigns();
        setCampaigns(data);
      } catch (error) {
        console.error("Error fetching campaigns:", error);
      }
    };

    fetchCampaigns();
  }, []);

  // Map the campaigns to an array of titles
  const items = campaigns.map((campaign) => campaign.title);

  // Use state to manage the selected item
  const [selectedItem, setSelectedItem] = useState(null);

  // Using the Downshift hook 'useCombobox' to manage the combobox
  const {
    isOpen,
    getToggleButtonProps,
    getLabelProps,
    getMenuProps,
    getInputProps,
    highlightedIndex,
    getItemProps,
    inputValue,
  } = useCombobox({
    items,
    selectedItem,
    onSelectedItemChange: ({ selectedItem }) => {
      const selectedCampaign = campaigns.find(
        (campaign) => campaign.title === selectedItem
      );
      setCategory(selectedCampaign?.category || ""); // Set the category of the selected campaign
      setSelectedItem(selectedItem); // Set the selected item
    },
    onInputValueChange: ({ inputValue }) => {
      if (inputValue === "") {
        setSelectedItem(null); // Clear the selected item when the input is cleared
      }
    },
    itemToString: (item) => (item ? item : ""), // This function handles the string conversion of each item.
  });

  // Filter items based on user input
  const filteredItems = items.filter((item) =>
    item.toLowerCase().includes(inputValue.toLowerCase())
  );

  // Filtering campaigns based on selected item and category
  const filteredCampaigns = campaigns.filter(
    (campaign) =>
      campaign.title.includes(selectedItem || "") &&
      (category ? campaign.category === category : true)
  );

  // Handles search / category clearing
  const handleReset = () => {
    setSelectedItem("");
    setCategory("");
  };

  return (
    <div className="flex flex-col items-center mt-8 w-full mx-auto max-w-screen-lg z-50">
      <div className="w-10/12 mt-4 bg-white rounded-md py-8">
        <div className="w-full text-center">
          {/* <label {...getLabelProps()} className="font-bold text-xs">SEARCH:</label> */}
          <input {...getInputProps()} className="block w-3/4 mx-auto rounded-full border-0 py-1.5 pl-5 pr-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-black placeholder:font-bold focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-xs leading-6 mt-1" placeholder="SEARCH FOR CAMPAIGN TITLE" />
          <button {...getToggleButtonProps()} aria-label="toggle menu" />
        </div>

        <div className="w-full text-center">
          <select value={category} onChange={handleCategoryChange} className="w-3/4 mx-auto font-bold text-xs bg-white rounded-full border-0 py-1.5 pl-5 pr-4 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 leading-6 mt-1 mb-2">
            <option value="" className="font-bold text-xs">ALL CATEGORIES</option>
            {categoryURLs.map((cat, index) => (
              <option key={index} value={cat.category}>
                {cat.full_name}
              </option>
            ))}
          </select>

          <button onClick={handleReset} className="lavender rounded-full lg:w-1/6 md:w-1/6 py-2 w-1/3 text-white font-bold  hover:text-black mt-4 text-xs">
            RESET
          </button>
        </div>

        <ul {...getMenuProps()} className="bg-white shadow-md rounded h-full">
          {isOpen &&
            inputValue &&
            filteredItems.map((item, index) => {
              const itemIndex = items.indexOf(item);
              return (
                <li key={item} {...getItemProps({ index: itemIndex, item })} className={`${highlightedIndex === itemIndex ? 'bg-gray-200' : ''
                  } ${selectedItem === item ? 'font-bold' : ''} p-1`}>
                  {item}
                </li>
              );
            })}
        </ul>
      </div>

      <div className="campaignFeed w-10/12 mt-8">
        {filteredCampaigns.map((campaign) => (
          <div className="bg-white rounded-md mb-8 p-4 shadow">
            <SingleCampaign key={campaign.id} campaign={campaign} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;