import React, { Fragment, useRef, useState, useContext } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Web3Context } from '../context/web3Context';
import { useLocation } from 'react-router-dom';
import { sendToken } from '../api/sendEther';
import { createDonation } from '../api/donationService';
import { CampaignContext } from '../context/campaignContextComponent';
import { AuthContext } from '../context/authContextComponent';
import Swal from 'sweetalert2';


export default function DonationForm({ setOpen, refreshCampaign }) {
  const { web3, accounts } = useContext(Web3Context);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const selectedCampaignId = queryParams.get('id');
  const { user } = useContext(AuthContext);
  const [amount, setAmount] = useState('');
  // const [open, setOpen] = useState(true);
  const cancelButtonRef = useRef(null);

  const handleSubmit = async () => {
    const numericAmount = Number(amount);
    if (!Number.isInteger(numericAmount) || numericAmount <= 0) {
      alert('Please enter a positive whole number.');
      return;
    }

    if (!web3 || accounts.length === 0) {
      alert('Please connect to MetaMask.');
      return;
    }

    const recipient = process.env.REACT_APP_METAMASK_ADDRESS;

    // Close the donation modal
    setOpen(false);

    // Show a loading alert

    Swal.fire({
      title: 'Processing transaction...',
      timerProgressBar: true,
      allowOutsideClick: false,
      onBeforeOpen: () => {
        Swal.showLoading()
      },
    });

    const receipt = await sendToken(web3, accounts, amount, recipient);
    if (receipt && receipt.status) {
      const userId = user.user_id;

      await createDonation({
        campaign: selectedCampaignId,
        user: userId.toString(),
        amount: numericAmount.toString(),
        transaction_hash: receipt.transactionHash.toString()
      });

      // Close the loading alert
      Swal.close();

      // Show success alert
      Swal.fire({
        icon: 'success',
        title: "You have successfully made a donation!"
      });

      // Refresh campaign data
      refreshCampaign();

     


    } else {
      console.error('Transaction failed:', receipt);
      // Close the loading alert and show error message
      Swal.close();
      Swal.fire({
        icon: 'error',
        title: 'Transaction failed'
      });
    }
    //  // Call the setIsStickyNavHidden callback
    //  setIsStickyNavHidden(false);
  };

  return (
    <Transition.Root show={true} as={Fragment}>
      <Dialog as="div" static className="fixed inset-0 overflow-y-auto" initialFocus={cancelButtonRef} onClose={() => setOpen(false)}>
        <div className="flex items-center justify-center min-h-screen">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all w-11/12 h-64">
              <Dialog.Panel>
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 text-left">
                  <Dialog.Title as="h2" className="text-left text-3xl font-bold leading-9 tracking-tight text-black mb-8 ml-2">
                    Make a Donation
                  </Dialog.Title>
                  <div className="mt-2">
                    <input
                      type="number"
                      min="1"
                      step="1"
                      value={amount}
                      onChange={(e) => {
                        const value = e.target.value;
                        if (value === '' || (Number.isInteger(Number(value)) && value >= 1)) {
                          setAmount(value);
                        }
                      }}
                      placeholder="Enter amount"
                      className="block w-full rounded-full border-0 py-1.5 pl-4 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 mt-1 mb-8"
                    />
                  </div>
                </div>
                <div className="px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse text-center">
                  <button
                    type="button"
                    className="aqua rounded-full lg:w-1/6 md:w-1/6 py-2 w-1/3 mr-8 text-white font-bold  hover:text-black mt-4 text-xs"
                    onClick={handleSubmit}
                  >
                    Submit
                  </button>
                  <button
                    type="button"
                    className="bg-white text-aqua border-aqua rounded-full lg:w-1/6 md:w-1/6 py-2 w-1/3 font-bold  hover:text-black mt-4 text-xs"
                    onClick={() => setOpen(false)}
                    ref={cancelButtonRef}
                  >
                    Cancel
                  </button>
                </div>
              </Dialog.Panel>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
