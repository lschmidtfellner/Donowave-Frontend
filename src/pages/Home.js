// import React, { useState, useEffect, useContext } from 'react'
// import { Link } from 'react-router-dom';
// import { useCombobox } from 'downshift';
// import SingleCampaign from '../components/SingleCampaign';
// import { CampaignContext, CampaignContextProvider } from '../context/campaignContextComponent';
// import categoryURLs from '../data/categoryURLs';

// const Home = () => {
//   const { campaigns, donations } = useContext(CampaignContext);
//   const [category, setCategory] = useState('');


//   const handleCategoryChange = (event) => {
//     setCategory(event.target.value);
//   };

//   const items = campaigns.map(campaign => campaign.title);

//   const [selectedItem, setSelectedItem] = useState(null);

//   const {
//     isOpen,
//     getToggleButtonProps,
//     getLabelProps,
//     getMenuProps,
//     getInputProps,
//     highlightedIndex,
//     getItemProps,
//     inputValue
//   } = useCombobox({
//     items,
//     selectedItem,
//     onSelectedItemChange: ({ selectedItem }) => {
//       const selectedCampaign = campaigns.find(campaign => campaign.title === selectedItem);
//       setCategory(selectedCampaign?.category || '');
//       setSelectedItem(selectedItem);
//     },
//     onInputValueChange: ({ inputValue }) => {
//       if (inputValue === '') {
//         setSelectedItem(null);
//       }
//     },
//     itemToString: (item) => (item ? item : ''), // This function handles the string conversion of each item.
//   });

//   const filteredItems = items.filter(item =>
//     item.toLowerCase().includes(inputValue.toLowerCase())
//   );

//   const filteredCampaigns = campaigns.filter(campaign =>
//     campaign.title.includes(selectedItem || '') &&
//     (category ? campaign.category === category : true)
//   );


//   return (
//     <div>
//       <label {...getLabelProps()}>Search campaigns</label>
//       <div>
//         <input {...getInputProps()} />
//         <button {...getToggleButtonProps()} aria-label="toggle menu" />
//       </div>
//       <ul {...getMenuProps()}>
//         {isOpen && inputValue &&
//           filteredItems.map((item, index) => {
//             const itemIndex = items.indexOf(item); // get the original index of the item
//             return (
//               <li
//                 {...getItemProps({ index: itemIndex, item })}
//                 style={{
//                   backgroundColor: highlightedIndex === index ? 'lightgray' : 'white',
//                   fontWeight: selectedItem === item ? 'bold' : 'normal',
//                 }}
//                 key={item}
//               >
//                 {item}
//               </li>
//             );
//           })}
//       </ul>



//       <select value={category} onChange={handleCategoryChange}>
//         <option value="">All Categories</option>
//         {categoryURLs.map((cat, index) => (
//           <option key={index} value={cat.category}>
//             {cat.full_name}
//           </option>
//         ))}
//       </select>

//       {filteredCampaigns.map((campaign) => (
//         <SingleCampaign key={campaign.id} campaign={campaign} />
//       ))}
//     </div>
//   );
// };

// export default Home;


import React, { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom';
import { useCombobox } from 'downshift';
import SingleCampaign from '../components/SingleCampaign';
import { CampaignContext, CampaignContextProvider } from '../context/campaignContextComponent';
import categoryURLs from '../data/categoryURLs';

const Home = () => {
  const { campaigns, donations } = useContext(CampaignContext);
  const [category, setCategory] = useState('');

  // Function to handle changing the campaign category
  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  // Map the campaigns to an array of titles
  const items = campaigns.map(campaign => campaign.title);

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
      const selectedCampaign = campaigns.find(campaign => campaign.title === selectedItem);
      setCategory(selectedCampaign?.category || ''); // Set the category of the selected campaign
      setSelectedItem(selectedItem); // Set the selected item
    },
    onInputValueChange: ({ inputValue }) => {
      if (inputValue === '') {
        setSelectedItem(null); // Clear the selected item when the input is cleared
      }
    },
    itemToString: (item) => (item ? item : ''), // This function handles the string conversion of each item.
  });

  // Filter items based on user input
  const filteredItems = items.filter(item =>
    item.toLowerCase().includes(inputValue.toLowerCase())
  );

  // Filtering campaigns based on selected item and category
  const filteredCampaigns = campaigns.filter(campaign =>
    campaign.title.includes(selectedItem || '') &&
    (category ? campaign.category === category : true)
  );

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

      {/* // The dropdown menu */}
      <ul {...getMenuProps()}>
        {/* // Show dropdown menu only when it's open and user has typed something */}
        {isOpen && inputValue &&
          filteredItems.map((item, index) => (
            // Generate each dropdown item
            <li
              key={item}
              {...getItemProps({ index, item })}
              style={{
                backgroundColor: highlightedIndex === index ? 'lightgray' : 'white',
                fontWeight: selectedItem === item ? 'bold' : 'normal',
              }}
            >
              {item}
            </li>
          ))}
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

      {/* // Here we render the filtered campaigns */}
      {filteredCampaigns.map((campaign) => (
        <SingleCampaign key={campaign.id} campaign={campaign} />
      ))}
    </div>
  );
};

export default Home;
