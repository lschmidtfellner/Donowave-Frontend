import { createContext, useState, useEffect } from 'react';
import Web3 from 'web3';

export const Web3Context = createContext();

export function Web3ContextProvider({ children }) {
    const [web3, setWeb3] = useState(null);
    const [accounts, setAccounts] = useState([]);

    useEffect(() => {
        if (window.ethereum) {
            window.ethereum.request({ method: 'eth_requestAccounts' }).then((accounts) => {
                const web3Instance = new Web3(window.ethereum);
                setWeb3(web3Instance);
                console.log('Web3 instance set:', web3Instance);
                setAccounts(accounts);
                console.log('Accounts set:', accounts);
            });

            window.ethereum.on('accountsChanged', function (accounts) {
                setAccounts(accounts);
                console.log('Accounts updated:', accounts);
            });
        } else if (window.web3) {
            const web3Instance = new Web3(window.web3.currentProvider);
            setWeb3(web3Instance);
            console.log('Web3 instance set:', web3Instance);
        } else {
            console.log('No Ethereum browser extension detected, install MetaMask!');
        }
    }, []);

    return (
        <Web3Context.Provider value={{ web3, accounts }}>
            {children}
        </Web3Context.Provider>
    );
}
