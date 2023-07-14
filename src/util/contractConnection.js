import { ethers } from 'ethers'

// This exports a simple contract connector
export default function connectToContract(address, abi, signer) {
    return new ethers.Contract(address, abi, signer)
}