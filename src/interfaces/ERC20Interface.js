import { ethers } from 'ethers';
import erc20ContractABI from '../contracts/ABIs/erc20ABI.js';
import connectToContract from '../util/contractConnection.js';

// Your alchemy setup
const alchemySettings = {
    apiKey: process.env.REACT_APP_API_KEY,
    network: Network.ETH_SEPOLIA 
};

const alchemy = new Alchemy(alchemySettings);
const nftAddress = process.env.REACT_APP_ERC20_CONTRACT_ADDRESS;
const provider = new ethers.providers.Web3Provider(window.ethereum);
const erc20signer = provider.getSigner();
console.log(nftAddress, erc20ContractABI, erc20signer);
// erc20 contract
export const erc20contract = connectToContract(nftAddress, erc20ContractABI, erc20signer);
console.log(erc20contract);

export const tokenTransfer = async (recipientAddress, amount) =>  {
    // Convert the amount to BigNumber, and then to the smallest unit of the token (often called "wei")
    const amountInWei = ethers.utils.parseEther(amount);

    const transaction = await erc20contract.transfer(recipientAddress, amountInWei);
    return transaction;
};
