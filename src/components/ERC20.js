import React from 'react'
import { useState, useEffect } from 'react'
import { erc20contract, tokenTransfer } from '../interfaces/ERC20Interface.js'

export const ERC20 = () => {
  const [tokenInfo, setTokenInfo] = useState({})
  const [transaction, setTransaction] = useState({})
  const [transactionAmount, setTransactionAmount] = useState('')
  const [recipientAddress, setRecipientAddress] = useState('')

  useEffect(() => {
    async function getTokenInfo() {
      const name = await erc20contract.name()
      const symbol = await erc20contract.symbol()

      setTokenInfo({name, symbol})
    }

    getTokenInfo()
  }, [])

  async function transfer() {
    const transfer = await tokenTransfer(recipientAddress, transactionAmount)
    setTransaction(transfer)
  }

  function handleAddress(event) {
    setRecipientAddress(event.target.value)
  }

  function handleAmount(event) {
    setTransactionAmount(event.target.value)
  }

  return (
    <>
      <div>ERC20</div>
      <div>{tokenInfo.name}</div>
      <div>{tokenInfo.symbol}</div>
      <p>Recipient Address</p>
      <input type value={recipientAddress} onChange={handleAddress}/>
      <br/>
      <p>Amount</p>
      <input value={transactionAmount} onChange={handleAmount}/>
      <br/>
      <button onClick={transfer}>Make transaction</button>
      <br/>
      <p>Transaction hash: {transaction.hash} </p>
    </>
  )
}
