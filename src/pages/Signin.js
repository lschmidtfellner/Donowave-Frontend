import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../api/apiService";
import { AuthContext } from "../context/authContextComponent";

export default function Signin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const { setIsLoggedIn, setUser } = useContext(AuthContext);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const loginData = { username, password };
      const response = await loginUser(loginData);

      setUser(response);
      setIsLoggedIn(true);
      localStorage.setItem("authToken", response.token);

      navigate("/");
    } catch (error) {
      console.error("Login failed:", error);
      setErrorMessage("Invalid login credentials");
    }
  }

  return (
    <div className="flex flex-1 flex-col justify-center px-6 lg:px-8 h-max bg-white min-h-screen">
      {/* Render the LottieAnimation component */}
      <form onSubmit={handleSubmit} className="placeholder:">
        <h2 className="text-left text-3xl font-bold leading-9 tracking-tight text-black mb-10 ml-8">
          Sign in
        </h2>
        <div className="lg:w-2/5 md:w-2/5 w-11/12 ml-4">
          <label className="font-bold text-xs ml-4">USERNAME</label>
          <input
            className="block w-full rounded-full border-0 py-1.5 pl-5 pr-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 mt-1"
            type="text"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          {errorMessage && <p className="text-red-500 ml-5 mt-2">{errorMessage}</p>}
          <div className="mt-8">
          <label className="font-bold text-xs ml-4">PASSWORD</label>
          <input
            className="block w-full rounded-full border-0 py-1.5 pl-5 pr-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 mt-1 mb-8"
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          </div>
          <div className="mb-8 flex flex-col items-center justify-center">
            <button
              type="submit"
              className="aqua rounded-full lg:w-1/6 md:w-1/6 py-2 w-1/2 text-white font-bold  hover:text-black mt-4 text-xs"
            >
              SIGN IN
            </button>
            <br></br>
            <span className="ml-2 lg:w-1/6 md:w-1/6">
              Not a user yet?{" "}
              <Link to="/signup" className="text-aqua hover:text-black text-sm font-bold">
                Sign Up
              </Link>
            </span>
          </div>
        </div>
      </form>
    </div>
  );
}
