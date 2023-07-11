import { Routes, Route } from 'react-router-dom'
import React, { useContext, useEffect } from 'react'
import Signin from './pages/Signin'
import Signup from './pages/Signup'
import { campaignContextProvider } from './context/campaignContextProvider'
import api from './api/apiConfig'
import AuthContextComponent, {
  AuthContext
} from '/context/AuthContextComponent'
import Nav from './components/Nav'

const categoryURLs = [
  {category: "Animals",
  url: "https://i.imgur.com/I7mSjHT.jpg" },
  {category: "Business",
  url: "https://i.imgur.com/TOzMtuT.jpg" },
  {category: "Community",
  url: "https://i.imgur.com/18scva4.jpg" },
  {category: "Creative",
  url: "https://i.imgur.com/82CvzQp.jpg" },
  {category: "Education",
  url: "https://i.imgur.com/GKsBSbG.jpg" },
  {category: "Emergencies",
  url: "https://i.imgur.com/tmOAdme.jpg" },
  {category: "Environment",
  url: "https://i.imgur.com/sGHzKIw.jpg" },
  {category: "Events",
  url: "https://i.imgur.com/Fu8CEMA.jpg" },
  {category: "Faith",
  url: "https://i.imgur.com/zwRbVfc.jpg" },
  {category: "Family",
  url: "https://i.imgur.com/oTpl8LZ.jpg" },
  {category: "Funeral & Memorial",
  url: "https://i.imgur.com/0jAbxU3.jpg" },
  {category: "Medical",
  url: "https://i.imgur.com/XQt4TXP.jpg" },
  {category: "Monthly Bills",
  url: "https://i.imgur.com/6PbVtji.jpg" },
  {category: "Newlyweds",
  url: "https://i.imgur.com/FnqbWmO.jpg" },
  {category: "Other",
  url: "https://i.imgur.com/MJiMQul.jpg" },
  {category: "Sports",
  url: "https://i.imgur.com/FFokxuU.jpg" },
  {category: "Travel",
  url: "https://i.imgur.com/IyEgNHX.jpg" },
  {category: "Ukraine Relief",
  url: "https://i.imgur.com/81XGwCO.jpg" },
  {category: "Volunteer",
  url: "https://i.imgur.com/IsoYc1i.jpg" },
  {category: "Wishes",
  url: "https://i.imgur.com/z4ZC6VV.jpg" },
]

function App() {
  return (
    <>
      <Nav isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/" element= {Home}/>
        <Route
          path="/campaigns/post"
          element={isLoggedIn ? <CreateCampaign /> : <Signin />}
        />
        <Route
          path="/campaigns/details"
          element={isLoggedIn ? <CampaignDetails /> : <Signin />}
        />
        <Route
          path="/myaccount"
          element={isLoggedIn ? <MyAccount /> : <Signin />}
        />
      </Routes>
    </>
  )
}

export default App
