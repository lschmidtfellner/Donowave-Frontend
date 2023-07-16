import BN from 'bn.js';
import erc20ABI from '../contracts/ABIs/erc20ABI';

export const sendToken = async (web3, accounts, amount, recipient) => {
    if (!web3 || accounts.length === 0) {
        alert('Please connect to MetaMask.');
        return;
    }

    const tokenContractAddress = process.env.REACT_APP_ERC20_CONTRACT_ADDRESS;

    // Since your token has a 1:1 ratio with Ether, you can use `amount` directly without conversion to Wei.
    const amountToSend = new BN(amount);

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
        const receipt = await contract.methods.transfer(recipient, amountToSend.toString()).send(transaction);
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
