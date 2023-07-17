import React, { Component } from 'react';

export default class About extends Component {
  render() {
    return (
      <div className="flex flex-col items-center mt-8 w-full mx-auto max-w-screen-lg z-50">
        <div className="w-10/12 mt-4 rounded-md py-2">
          <div className="w-full text-center">
            <h2 className="text-left text-3xl font-bold leading-9 tracking-tight text-black mb-10">
              ABOUT
            </h2>
            <div className="bg-white rounded-md mb-8 p-4 shadow min-h-full">
              <ul className="-ml-8 mb-8 text-base">
                <li className="mt-8"><span className="text-xs text-lavender tracking-wide mr-1 font-bold">STEP 1.  </span><span className=""> How to get started...</span></li>
                <li className="mt-8"><span className="text-xs text-lavender mr-1 font-bold">STEP 2.  </span> How to get started...</li>
                <li className="mt-8"><span className="text-xs text-lavender font-bold mr-1">STEP 3.  </span> How to get started...</li>
                <li className="mt-8"><span className="text-xs text-lavender font-bold mr-1">STEP 4.  </span> How to get started...</li>
                <li className="mt-8"><span className="text-xs text-lavender font-bold mr-1">STEP 5.  </span> How to get started...</li>
                <li className="mt-8"><span className="text-xs text-lavender font-bold mr-1">STEP 6.  </span> How to get started...</li>
                <li className="mt-8"><span className="text-xs text-lavender font-bold mr-1">STEP 7.  </span> How to get started...</li>
                <li className="mt-8"><span className="text-xs text-lavender font-bold mr-1">STEP 8.  </span> How to get started...</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
