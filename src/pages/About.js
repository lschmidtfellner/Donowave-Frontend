import React, { useEffect, useRef } from 'react';



export default function About() {
  
    return (
      <div className="flex flex-col items-center mt-8 w-full mx-auto max-w-screen-lg z-50">
        <div className="w-10/12 mt-4 rounded-md py-2">
          <div className="w-full text-center">
            <p className="text-left text-3xl font-bold leading-9 tracking-tight text-black mb-10">
              DonoWave<span className="text-gray-400"> is a modern fundraising platform enabling users to create campaigns and donate using our own DonoCoin cryptocurrency.</span></p>
              <p className="text-left text-3xl font-bold leading-9 tracking-tight text-gray-400 mb-10">Leveraging the power of MetaMask wallet, we're revolutionizing philanthropy in the crypto era. Join us in making a difference, one DonoCoin at a time.
            </p>
            <div className="bg-white rounded-md mb-8 p-4 shadow min-h-full">
              <ul className="ml-8 mb-8 text-base text-left">
              <li className="mt-8">
                  <span className="text-xs text-lavender tracking-wide mr-1 font-bold">STEP 1.  </span>
                  <span className="">Install </span>
                  <a href="https://metamask.io/download/" target="_blank" rel="noopener noreferrer" className="underline">Metamask wallet app</a>
                </li>
                <li className="mt-8"><span className="text-xs text-lavender mr-1 font-bold">STEP 2.  </span>Register a Metamask account on the Metamask wallet App</li>
                <li className="mt-8">
                  <span className="text-xs text-lavender font-bold mr-1">STEP 3.  </span>
                  Get free Sepolia ETH at
                  <a href="https://sepoliafaucet.com/" target="_blank" rel="noopener noreferrer" className="underline"> this website</a>
                </li>
                <li className="mt-8"><span className="text-xs text-lavender font-bold mr-1">STEP 4.  </span> Get DonoCoin from this link</li>
                <li className="mt-8"><span className="text-xs text-lavender font-bold mr-1">STEP 5.  </span> Register or Login to your account</li>
                <li className="mt-8"><span className="text-xs text-lavender font-bold mr-1">STEP 6.  </span> Create campaigns or view campaigns and donate to them.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }

