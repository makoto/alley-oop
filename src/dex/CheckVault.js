import React, {useState, useContext} from "react"
import * as fcl from "@onflow/fcl"
import GlobalContext from '../Global'

import Card from '../components/Card'
import Header from '../components/Header'
import Code from '../components/Code'

const getScript = (address) => ( `\
import FlowToken from 0x01cf0e2f2f715450

pub fun main() :[Bool] {
  // Get the accounts' public account objects
  let acct1 = getAccount(0x${address})

  let flowCap = acct1.getCapability(/public/FlowReceiver)!

  return [flowCap.check<&FlowToken.Vault{FlowToken.Receiver}>()]
}
`)

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
      <Header>Check Vault for {address}</Header>
      
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
