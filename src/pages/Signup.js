import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../api/apiService';
import Swal from 'sweetalert2';

export default function Signup() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [walletAddress, setWalletAddress] = useState('');
  const [signupSuccess, setSignupSuccess] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const registerData = {
        username,
        email,
        password,
        userprofile: { metamask_wallet_address: 'placeholder' },
      };
      await registerUser(registerData);

      setSignupSuccess(true);
      setTimeout(() => {
        window.location.reload()
    }, 2000)
    Swal.fire({
        icon: 'success',
        title: "You have successfully signed up!"
    }).then(() => {
      navigate('/signin');
    });
    } catch (error) {
      console.error('Registration failed:', error);
    }
  }

  return (
    <div className="flex flex-1 flex-col justify-center px-6 lg:px-8 h-max bg-white min-h-screen">
      <form onSubmit={handleSubmit} className="placeholder:">
        <h2 className="text-left text-3xl font-bold leading-9 tracking-tight text-black mb-10 ml-8">
          Sign up
        </h2>
        {signupSuccess && (
          <p className="text-green-500">
            Signup successful! Redirecting to signin page...
          </p>
        )}
        <div className="lg:w-2/5 md:w-2/5 w-11/12 ml-4">
          <label className="font-bold text-xs ml-4">USERNAME</label>
          <input
            className="block w-full rounded-full border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 mt-1 mb-8"
            type="text"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label className="font-bold text-xs ml-4">EMAIL</label>
          <input
            className="block w-full rounded-full border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 mt-1 mb-8"
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label className="font-bold text-xs ml-4">PASSWORD</label>
          <input
            className="block w-full rounded-full border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 mt-1 mb-8"
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="mb-8 flex flex-col items-center justify-center">
            <button 

              type="submit"
              className="aqua rounded-full lg:w-1/6 md:w-1/6 py-2 w-1/3 text-white font-bold  hover:text-black mt-4 text-xs"
            >
              SIGN UP
            </button>
            <br></br>
            <span className="ml-2 lg:w-1/6 md:w-1/6">
              Already a user?{" "}
              <Link to="/signin" className="text-aqua hover:text-black text-sm font-bold">
                Sign In
              </Link>
            </span>
          </div>
        </div>
      </form>
    </div>
  );
}