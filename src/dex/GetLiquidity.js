import React, {useEffect, useState} from "react"
import * as fcl from "@onflow/fcl"

import Card from '../components/Card'
import Header from '../components/Header'
import Code from '../components/Code'

const scriptOne = `\
import FlowToken from 0x01cf0e2f2f715450
import BaloonToken from 0x179b6b1cb6755e31
import Dex from 0xf3fcd2c1a78f5eee

pub fun main() :[UFix64] {
    // Get the accounts' public account objects
    let acct1 = getAccount(0xf3fcd2c1a78f5eee)
    let dexRef =  acct1.getCapability(/public/DexPool)!
                            .borrow<&Dex.Pool{Dex.PoolPublic}>()
                            ?? panic("Could not borrow a reference to the acct1 receiver")
    return [dexRef.xLiquidity(), dexRef.yLiquidity(), dexRef.xPrice(), dexRef.yPrice()]
}
`

export default function ScriptOne() {
  const [data, setData] = useState(null)

  const runScript = async () => {
    const response = await fcl.send([
      fcl.script(scriptOne),
    ])
    
    setData(await fcl.decode(response))
  }
  useEffect(() =>
    runScript()
  , [])
  return (
    <Card>
      <Header>Current liquidity</Header>
      
      {data && (
        <ul>
          <li>Liquidity: Flow Token:{data[0]} - Baloon Token:{data[1]} pair </li>
          <li>1 Flow = {data[2]} Baloon </li>
          <li>1 Baloon = {data[3]} Flow </li>
        </ul>
      )}
    </Card>
  )
}
