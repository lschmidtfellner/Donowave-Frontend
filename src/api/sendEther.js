import { ethers } from 'ethers';
import erc20ABI from '../contracts/ABIs/erc20ABI'; // adjust the path to point to your erc20ABI.js file

export const sendToken = async (provider, signer, amount, recipient) => {
    if (!provider || !signer) {
        alert('Please connect to MetaMask.');
        return;
    }

    const tokenContractAddress = process.env.REACT_APP_ERC20_CONTRACT_ADDRESS;

    // Convert the amount to the smallest unit of the token (often called "wei")
    const amountInWei = ethers.utils.parseEther(amount);

    // Create a contract instance
    const contract = new ethers.Contract(tokenContractAddress, erc20ABI, signer);

    // Log the transaction object
    console.log('Prepared transaction:');

    try {
        // Call the contract's transfer function
        const receipt = await contract.transfer(recipient, amountInWei);
        console.log('Transaction receipt:', receipt);
        return receipt;
    } catch (error) {
        // Handle the error here
        if (error.code === 4001) {
            // User rejected transaction
            alert('Transaction was rejected by the user.');
        } else {
            console.error('Error sending tokens', error);
            // Don't re-throw the error
        }
    }
};
