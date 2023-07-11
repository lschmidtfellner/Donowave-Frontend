import { Routes, Route } from 'react-router-dom'
import React, { useContext, useEffect } from 'react'
import categoryURLs from './data/categoryURLs'
import Signin from './pages/Signin'
import Signup from './pages/Signup'
import { campaignContextProvider } from './context/campaignContextProvider'
import api from './api/apiConfig'
import AuthContextComponent, {
  AuthContext
} from '/context/AuthContextComponent'
import Nav from './components/Nav'



function App() {
  return (
    <>
      <Nav isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/" element={<Home />} />
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
