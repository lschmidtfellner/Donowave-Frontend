import React from 'react'
import { useState, useEffect } from 'react'
import { erc20contract, tokenTransfer } from '../interfaces/ERC20Interface.js'

export const ERC20 = () => {
  const [tokenInfo, setTokenInfo] = useState({})
  const [transaction, setTranscation] = useState({})

  useEffect(() => {
    async function getTokenInfo() {
      const name = await erc20contract.name()
      const symbol = await erc20contract.symbol()

      setTokenInfo({name, symbol})
    }

    getTokenInfo()
  }, [])

  async function transfer() {
    // hard coded, make this dynamic
    const transfer = await tokenTransfer('0xC87CA24Ffb45a92EDb676d289fA1541Af2cb2df2', '100')
    setTranscation(transfer)
    setTimeout(() => {
      console.log(transaction)
    }, 3000)
  }

  return (
    <>
      <div>ERC20</div>
      <button onClick={transfer}>Make transaction</button>
      <div>{tokenInfo.name}</div>
      <div>{tokenInfo.symbol}</div>
    </>
  )
}
