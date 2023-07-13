export const sendEther = async (web3, accounts, amount, recipient) => {
    if (!web3 || accounts.length === 0) {
        alert('Please connect to MetaMask.');
        return;
    }

    const amountInWei = web3.utils.toWei(amount, 'ether');

    try {
        const transaction = await web3.eth.sendTransaction({
            from: accounts[0],
            to: recipient,
            value: amountInWei,
        });

        return transaction;
    } catch (error) {
        console.error('Error sending Ether', error);
        throw error;
    }
};