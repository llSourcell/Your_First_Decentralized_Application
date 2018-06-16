# Sample Web 3.0 DApp
Based on "This is the code for "A Guide to Building Your First Decentralized Application" by Siraj Raval on Youtube (https://youtu.be/gSQXq2_j-mw)"


## Overview

Self contained project to run Web 3.0 (DApp) using Node.js with 2 simple commands (no coding needed)

## QuickStart
Run following command and it will automatically pull the code, install dependencies, start the blockchain, start a simple backend and start website on your browser!
```
> git clone git@github.com:rpavez/Your_First_Decentralized_Application.git
> cd Your_First_Decentralized_Application
> yarn start
```


## Dependencies

* ethereumjs-testrpc 
* web3@0.20.1
* solc
* express, jquery

Install Node.js (https://nodejs.org/es/)
Install YARN (https://yarnpkg.com/en/)


## Manual testing
Manually connect to blockchain, load contract and get blockchain address (Optional)
```
$:~/hello_world_voting$ node
> Web3 = require('web3')
> web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
> code = fs.readFileSync('Voting.sol').toString()
> solc = require('solc')
> compiledCode = solc.compile(code)
> abiDefinition = JSON.parse(compiledCode.contracts[':Voting'].interface)
> VotingContract = web3.eth.contract(abiDefinition)
> byteCode = compiledCode.contracts[':Voting'].bytecode
> deployedContract = VotingContract.new(['Rama','Nick','Jose'],{data: byteCode, from: web3.eth.accounts[0], gas: 4700000})
> deployedContract.address
> contractInstance = VotingContract.at(deployedContract.address)
```

Interact with the contract via the html page attached, just open it in your browser. See [this](https://medium.com/@mvmurthy/full-stack-hello-world-voting-ethereum-dapp-tutorial-part-1-40d2d0d807c2) tutorial for more details. 

## Credits

The credits for this code go to Siraj Raval [Original Repo](https://github.com/llSourcell/Your_First_Decentralized_Application).
Siraj based his project on [maheshmurthy](https://gist.github.com/maheshmurthy).
Also based on this tutorial [Tutorial](https://medium.com/@mvmurthy/full-stack-hello-world-voting-ethereum-dapp-tutorial-part-1-40d2d0d807c2)
