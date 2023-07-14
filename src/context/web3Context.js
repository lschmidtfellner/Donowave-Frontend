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
                setAccounts(accounts);
            });

            window.ethereum.on('accountsChanged', function (accounts) {
                setAccounts(accounts);
            });
        } else if (window.web3) {
            setWeb3(new Web3(window.web3.currentProvider));
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