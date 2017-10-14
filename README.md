# Your_First_Decentralized_Application
This is the code for "A Guide to Building Your First Decentralized Application" by Siraj Raval on Youtube


## Overview

This is the code for [this](https://youtu.be/gSQXq2_j-mw) video on Youtube by Siraj Raval. It's a guide on how to build your first decentralized application. 

## Dependencies

* ethereumjs-testrpc 
* web3
* solc

Install missing dependencies with [npm](https://www.npmjs.com/). 

## Usage

After all dependancies are installed, run the `testrpc` service with:
```
node_modules/ethereumjs-testrpc/build/cli.node.js
```

Run the following commands to open the node console then deploy your contract to the test chain

```
siraj:~/hello_world_voting$ node
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

The credits for this code go to [maheshmurthy](https://gist.github.com/maheshmurthy). I've merely created a wrapper to get people started. 
