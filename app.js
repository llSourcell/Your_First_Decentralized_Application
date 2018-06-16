
var express = require('express');
var fs = require('fs');
var path = require('path');
const chalk = require('chalk');
const opn = require('opn');


var app = express();
let currentAddress, VotingContract,deployedContract;

const forkTestRPC = () => {
	const spawn = require('child_process').spawn;
	const child = spawn('node_modules/ethereumjs-testrpc/build/cli.node.js');
	child.stdout.on('data', (data) => {
	  console.log(chalk.blue(`child stdout:\n${data}`));
	});

	child.stderr.on('data', (data) => {
	  console.log(chalk.blue(`child stderr:\n${data}`));
	});
}


const initBlockchain = () => {
	console.log(chalk.green("Connecting to blockchain and initializing contract.."))
	Web3 = require('web3')
	web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
	code = fs.readFileSync(path.resolve(__dirname,'voting.sol')).toString()
	solc = require('solc')
	compiledCode = solc.compile(code)
	abiDefinition = JSON.parse(compiledCode.contracts[':Voting'].interface)
	VotingContract = web3.eth.contract(abiDefinition)
	byteCode = compiledCode.contracts[':Voting'].bytecode
	console.log("Connected to blockchain")
}

const startContract = () => {
	return new Promise((approve,reject)=>{
		deployedContract = VotingContract.new(['Rama','Nick','Jose'],{data: byteCode, from: web3.eth.accounts[0], gas: 4700000})
		deployedContract.address
		contractInstance = VotingContract.at(deployedContract.address)
		intervalId = setInterval(()=>{
			console.log(chalk.green("Blockchain Address",deployedContract.address))
			if(deployedContract.address&&deployedContract.address!==""){
				currentAddress = deployedContract.address;
				clearInterval(intervalId);
				approve(currentAddress);
			}
		},1000)
	})
}


app.get('/initBlockChain', function(req, res) {
	if(!VotingContract){
		res.json({success:false,err:"Blockchain not started"})
	}
	startContract().then(()=>{
		res.json({success:true,address:currentAddress})
	})
});

app.get('/getCurrentAddress', function(req, res) {
    res.json({success:true,address:currentAddress})
});

app.use('/', express.static(__dirname + '/public'));


app.listen(3000);
console.log('Express listening on port 3000...');
forkTestRPC();
setTimeout(()=>{
	initBlockchain();
	opn('http://localhost:3000');
},2000)