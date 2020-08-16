import React, {useState, useContext} from "react"
import * as fcl from "@onflow/fcl"

import Card from '../components/Card'
import Header from '../components/Header'
import Code from '../components/Code'
import GlobalContext from '../Global'

const getScript = (address) => ( `\
import FlowToken from 0x01cf0e2f2f715450
import BaloonToken from 0x179b6b1cb6755e31
import Dex from 0xf3fcd2c1a78f5eee

pub fun main() :[UFix64] {
  // Get the accounts' public account objects
  let acct1 = getAccount(0xf3fcd2c1a78f5eee)
  let acct1FlowReceiverRef = acct1.getCapability(/public/FlowReceiver)!
                          .borrow<&FlowToken.Vault{FlowToken.Balance}>()
                          ?? panic("Could not borrow a reference to the acct1 receiver")

  let flowCap = acct1.getCapability(/public/FlowReceiver)!

  return [acct1FlowReceiverRef.balance]
}
`
)

export default function ScriptOne() {
  const [data, setData] = useState(null)
  const context = useContext(GlobalContext);
  const address = context.user && context.user.addr
  const scriptOne = getScript(address)
  const runScript = async (event) => {
    event.preventDefault()

    const response = await fcl.send([
      fcl.script(scriptOne),
    ])
    
    setData(await fcl.decode(response))
  }

  return (
    <Card>
      <Header>Get Balance1</Header>
      
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