import React, { useState, useEffect, useContext } from "react";
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
  }, [setCampaigns]);

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

  // Downshift functionality ends here
  // Below is the rendering part of this component

  return (
    <div>
      {/* // Here we provide a search input and a button to toggle the dropdown */}
      <label {...getLabelProps()}>Search campaigns</label>
      <div>
        <input {...getInputProps()} />
        <button {...getToggleButtonProps()} aria-label="toggle menu" />
      </div>

      {/* The dropdown menu */}
      <ul {...getMenuProps()}>
        {/* Show dropdown menu only when it's open and user has typed something */}
        {isOpen &&
          inputValue &&
          filteredItems.map((item, index) => {
            const itemIndex = items.indexOf(item); // get the original index of the item
            return (
              // Generate each dropdown item
              <li
                key={item}
                {...getItemProps({ index: itemIndex, item })}
                style={{
                  backgroundColor:
                    highlightedIndex === itemIndex ? "lightgray" : "white",
                  fontWeight: selectedItem === item ? "bold" : "normal",
                }}
              >
                {item}
              </li>
            );
          })}
      </ul>

      {/* // The category filter dropdown */}
      <select value={category} onChange={handleCategoryChange}>
        <option value="">All Categories</option>
        {categoryURLs.map((cat, index) => (
          <option key={index} value={cat.category}>
            {cat.full_name}
          </option>
        ))}
      </select>

      <button
        onClick={handleReset}
        className="rounded-full pink-bg lg:w-1/6 md:w-1/6 py-1 w-1/3  text-white font-bold  hover:text-black mt-4"
      >
        reset
      </button>

      {/* // Here we render the filtered campaigns */}
      {filteredCampaigns.map((campaign) => (
        <SingleCampaign key={campaign.id} campaign={campaign} />
      ))}
    </div>
  );
};

export default Home;
