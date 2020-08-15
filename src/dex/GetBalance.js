import React, {useState} from "react"
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

    // Get references to the account's receivers
    // by getting their public capability
    // and borrowing a reference from the capability
    let acct1FlowReceiverRef = acct1.getCapability(/public/FlowReceiver)!
                            .borrow<&FlowToken.Vault{FlowToken.Balance}>()
                            ?? panic("Could not borrow a reference to the acct1 receiver")

    let acct1BaloonReceiverRef = acct1.getCapability(/public/BaloonReceiver)!
                            .borrow<&BaloonToken.Vault{BaloonToken.Balance}>()
                            ?? panic("Could not borrow a reference to the acct1 receiver")

    return [acct1FlowReceiverRef.balance, acct1BaloonReceiverRef.balance]
}
`

export default function ScriptOne() {
  const [data, setData] = useState(null)

  const runScript = async (event) => {
    event.preventDefault()

    const response = await fcl.send([
      fcl.script(scriptOne),
    ])
    
    setData(await fcl.decode(response))
  }

  return (
    <Card>
      <Header>Check current price</Header>
      
      <Code>{scriptOne}</Code>
      
      <button onClick={runScript}>Run Script</button>

      {data && (
        <Code>
          {JSON.stringify(data, null, 2)}
        </Code>
      )}
    </Card>
  )
}
