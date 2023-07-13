
import { Routes, Route } from 'react-router-dom';
import React, { useContext } from 'react';
import { CampaignContextProvider } from './context/campaignContextComponent';
import AuthContextComponent, { AuthContext } from './context/authContextComponent'
import Nav from './components/Nav';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import Home from './pages/Home';
import CreateCampaign from './pages/CreateCampaign';
import CampaignDetails from './pages/CampaignDetails';
import DonationForm from './components/DonationForm';


function App() {
  const {isLoggedIn} = useContext(AuthContext)

  return (
    <CampaignContextProvider value={{ isLoggedIn: false, setIsLoggedIn: () => {}, user: {}, setUser: () => {} }}>
      {/* <Nav isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} /> */}
      <Nav />
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/" element={<Home />} />
        <Route
          path="/create-campaign"
          // element={<CreateCampaign />}
          element={isLoggedIn ? <CreateCampaign /> : <Signin />}
        />
        <Route
          path="/campaigns/details"
          element={isLoggedIn ? <CampaignDetails /> : <Signin />}
        />
        <Route
          path="/donationForm"
          element={isLoggedIn ? <DonationForm /> : <Signin />}
        />
        <Route
          path="/myaccount"
          // element={isLoggedIn ? <MyAccount /> : <Signin />}
        />
      </Routes>
    </CampaignContextProvider>
  );
}

export default App;
