package main

import (
	"github.com/0xAlchemist/go-flow-tooling/tooling"
)

const flowToken = "FlowToken"
const baloonToken = "BaloonToken"
const dex = "Dex"

func main() {
	flow := tooling.NewFlowConfigLocalhost()

	flow.DeployContract(flowToken)
	flow.DeployContract(baloonToken)
	flow.DeployContract(dex)

	flow.SendTransaction("Transaction1", flowToken)
	flow.SendTransaction("Transaction2", baloonToken)
	flow.SendTransaction("Transaction3", dex)
	flow.RunScript("Script1")
}