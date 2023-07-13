export const sendEther = async (web3, accounts, amount, recipient) => {
    if (!web3 || accounts.length === 0) {
        alert('Please connect to MetaMask.');
        return;
    }

    const amountInWei = web3.utils.toWei(amount, 'ether');

    // Prepare the transaction object
    const transaction = {
        from: accounts[0],
        to: recipient,
        value: amountInWei,
        gasPrice: web3.utils.toWei("1", "gwei"), 
    };

    // Log the transaction object
    console.log('Prepared transaction:', transaction);

    try {
        const receipt = await web3.eth.sendTransaction(transaction);
        console.log('Transaction receipt:', receipt);
        return receipt;
    } catch (error) {
        console.error('Error sending Ether', error);
        throw error;
    }
};
