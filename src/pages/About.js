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
          </div>
        </div>
      </div>
    )
  }

