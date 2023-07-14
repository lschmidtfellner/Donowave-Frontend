import { utils } from 'web3';
import erc20ABI from '../contracts/ABIs/erc20ABI'; // adjust the path to point to your erc20ABI.js file

export const sendToken = async (web3, accounts, amount, recipient) => {
    if (!web3 || accounts.length === 0) {
        alert('Please connect to MetaMask.');
        return;
    }

    const tokenContractAddress = process.env.REACT_APP_ERC20_CONTRACT_ADDRESS

    // Convert the amount to the smallest unit of the token (often called "wei")
    const amountInWei = utils.toWei(amount, 'ether');

    // Create a contract instance
    const contract = new web3.eth.Contract(erc20ABI, tokenContractAddress);

    // Prepare the transaction object
    const transaction = {
        from: accounts[0],
        gasPrice: web3.utils.toWei("1", "gwei"),
    };

    // Log the transaction object
    console.log('Prepared transaction:', transaction);

    try {
        // Call the contract's transfer function
        const receipt = await contract.methods.transfer(recipient, amountInWei).send(transaction);
        console.log('Transaction receipt:', receipt);
        return receipt;
    } catch (error) {
        console.error('Error sending tokens', error);
        throw error;
    }
};
