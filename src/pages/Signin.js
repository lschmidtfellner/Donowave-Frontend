import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../api/apiService";
import { AuthContext } from "../context/authContextComponent";
// import Swal from "sweetalert2";

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
    <div className="flex flex-1 flex-col justify-center px-6 lg:px-8 h-max">
      {/* Render the LottieAnimation component */}
      <form onSubmit={handleSubmit} className="placeholder:">
        <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-indigo-600 mt-16 mb-10">
          Sign in to your account
        </h2>
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        <div className="lg:w-2/5 md:w-2/5 w-full mx-auto">
          <input
            className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            type="text"
            name="username"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 my-8"
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="mb-8">
            <button
              type="submit"
              className="rounded-full pink-bg lg:w-1/6 md:w-1/6 py-2 w-1/3  text-white font-bold  hover:text-black mt-4"
            >
              Sign In
            </button>
            <span className="ml-2 mt-4 lg:w-1/6 md:w-1/6">
              Not a user yet?{" "}
              <Link to="/signup" className="text-indigo-600 hover:text-black">
                Sign Up
              </Link>
            </span>
          </div>
        </div>
      </form>
    </div>
  );
}
