import { Routes, Route } from "react-router-dom";
import React, { useContext, useEffect } from "react";
import categoryURLs from "./data/categoryURLs";
import {
  CampaignContext,
  CampaignContextProvider,
} from "./context/campaignContextComponent";
// import AuthContextComponent, {
//   AuthContext
// } from '/context/AuthContextComponent'
import api from "./api/apiConfig";
import Nav from "./components/Nav";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import CreateCampaign from "./pages/CreateCampaign";
import CampaignDetails from "./pages/CampaignDetails";

function App() {
  // return (
  //   // <AuthContextComponent>
  //   //   {' '}
  //   //   {/* Use the AuthContextComponent to wrap the app */}
  //   //   <AppContent />
  //   // </AuthContextComponent>
  // )
  // }

  // const AppContent = () => {
  // const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext)
  // // const navigate = useNavigate();
  // const navigate = useNavigate();

  // useEffect(() => {
  //   console.log("Logged in?", isLoggedIn);
  //   console.log(isLoggedIn)
  //   // if (!isLoggedIn) {
  //   //   navigate('/auth/signin', { replace: true });
  //   // }
  // // }, [isLoggedIn, navigate]);
  //   }, [isLoggedIn, navigate]);

  return (
    <CampaignContextProvider>
      {/* <Nav isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} /> */}
      <Nav />
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/" element={<Home />} />
        <Route
          path="/create-campaign"
          element={<CreateCampaign />}
          // element={isLoggedIn ? <CreateCampaign /> : <Signin />}
        />
        <Route
          path="/campaigns/details"
          element={<CampaignDetails/>}
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
