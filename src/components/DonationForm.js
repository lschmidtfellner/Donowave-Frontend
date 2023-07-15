import { Fragment, useRef, useState, useContext } from 'react';
import { Dialog, Transition } from '@headlessui/react';
// import { HeartIcon } from '@heroicons/react/outline';
import { Web3Context } from '../context/web3Context';
import { useLocation} from 'react-router-dom';

import { sendToken } from '../api/sendEther';
import { createDonation } from '../api/donationService';
import { CampaignContext } from '../context/campaignContextComponent';
import { AuthContext } from '../context/authContextComponent';

export default function DonationForm({ setOpen }) {
    const { web3, accounts } = useContext(Web3Context);
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const selectedCampaignId = queryParams.get('id');    
    const { user } = useContext(AuthContext); // Call useContext at top level
    const [amount, setAmount] = useState('');
    const cancelButtonRef = useRef(null);

    const handleSubmit = async () => {
        console.log('User:', user.user_id);
        console.log('CampaignContext:', CampaignContext);
        const numericAmount = Number(amount);
        if (!Number.isInteger(numericAmount) || numericAmount <= 0) {
            alert('Please enter a positive whole number.');
            return;
        }
    
        console.log(`Submitting amount: ${amount}`);
        if (!web3 || accounts.length === 0) {
            alert('Please connect to MetaMask.');
            return;
        }
    
        const recipient = process.env.REACT_APP_METAMASK_ADDRESS;
        const receipt = await sendToken(web3, accounts, amount, recipient);
        if (receipt && receipt.status) {
            const userId = user.user_id;
    
            // Log the values here
            console.log('selectedCampaignId:', selectedCampaignId);
            console.log('userId:', userId);
            console.log('numericAmount:', numericAmount);
            console.log('transactionHash:', receipt.transactionHash);
    
            await createDonation({
                campaign: selectedCampaignId,
                user: userId.toString(),
                amount: numericAmount.toString(),
                transaction_hash: receipt.transactionHash.toString()
            });
        } else {
            console.error('Transaction failed:', receipt);
        }
        setOpen(false);
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
                        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                            <Dialog.Panel>
                                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                    <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                                        Donate Today!
                                    </Dialog.Title>
                                    <div className="mt-2">
                                        <input
                                            type="number"
                                            min="1"
                                            step="1"
                                            className="block w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                            value={amount}
                                            onChange={(e) => {
                                                const value = e.target.value;
                                                if (value === '' || (Number.isInteger(Number(value)) && value >= 1)) {
                                                    setAmount(value);
                                                }
                                            }}
                                            placeholder="Enter amount"
                                        />
                                    </div>
                                </div>
                                <div className="px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                    <button
                                        type="button"
                                        className="w-full inline-flex justify-center py-2 px-4 border border-transparent rounded-full shadow-sm text-base font-semibold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
                                        onClick={handleSubmit}
                                    >
                                        Submit
                                    </button>
                                    <button
                                        type="button"
                                        className="mt-3 w-full inline-flex justify-center rounded-full border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-semibold text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
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
