# alley-oop

Minimum Automated Market Maker(AMM) on Flow Blockchain

![](https://media.giphy.com/media/l0HlTgeWIqq5wZMKA/giphy-downsized.gif)

## Reference

https://medium.com/@austin_48503/%EF%B8%8F-minimum-viable-exchange-d84f30bd0c90

## Flow playground

- [Flow playground](https://play.onflow.org/ac8f1629-2f92-4559-b456-1b5401eab111)

## How to run the demo on the Flow playground

- Deploy FlowToken as the first(0x01) account
- Deploy BaloonToken as the second(0x02) account
- Deploy Dex as the third(0x03) account
- Run Transaction1.cdc with all accounts
- Run Transaction2.cdc with all accounts
- Run Transaction2.cdc with the first account(0x01)
- Run Script1.cdc to run report

## Todo

- Refactor to inherit more generalised [Funggible token]() so that I don't have to copy&paste each fungible token
- Allow anyone to deposit/withdraw liquidity
- Refactor to combine YtoX and XtoY into single function (as they are almost identical)
- Add Frontend (if I get enough time)

## Open Question.

- How do I change so that it allows to list any fungible tokens?
- Is the current xVault/yVault secure? (= can the contract owner drain the fund?)
