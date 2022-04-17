const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3('HTTP://127.0.0.1:7545');
const HOW_MANY = 2;
//ganache.provider()

//import our interface and bytecode so we can run the test
//const {interface, bytecode} = require('../compile');
const {abi, evm} = require('../compile');

let accounts;
let wave;
let transactions = [];
let txn;
let results = {};
let user;


before("", async ()=>{
  accounts = await web3.eth.getAccounts();
  user = accounts[1];
  
  //use one account to deploy contract
  wave = await new web3.eth.Contract(abi)
  .deploy({ 
    data: evm.bytecode.object, 
    arguments:["The Wave Portal!"]
  })
  .send({ from: accounts[0], gas: '1000000' });

  //call WavePortal Functions
  for(var i=0; i<HOW_MANY;i++){
    txn = await wave.methods.wave().send({from: user, gas: '1000000'});
    transactions.push(txn.transactionHash);
  }
});

after("", async ()=>{
  results["Contract Name: "] = await wave.methods.contractName().call();
  results["Contract Address: "] = await wave.options.address;
  results["Transactions: "] = {};
  
  for(var j = 0; j<transactions.length; j++){
    txn = await web3.eth.getTransaction(transactions[j]);
    results["Transactions: "][j] = {
      "Transaction: ": txn.hash.substring(0,5),
      "From: ": txn.from,
      "Value: ": txn.value,
      "Gas Used:": txn.gasPrice,
      "Block: ": txn.blockNumber, 
    };
  }
   console.log(results);
});

describe('WavePortal', ()=>{
  it('deploys the WavePortal contract with correct address', ()=>{
    assert.ok(wave.options.address);
  });
  it('has a default contract name', async ()=>{
    const contractName = await wave.methods.contractName().call();

    assert.equal(contractName, 'The Wave Portal!');
  });
  it('accepts a wave', async ()=>{
    const waved = await wave.methods.wave().send({from: accounts[0], gass: '1000000'});
    transactions.push(waved.transactionHash)
  });

  it('gets total waves', async ()=>{
    const totalWaves = await wave.methods.getTotalWaves().call();
    assert.equal(totalWaves, HOW_MANY + 1);
  });
  it('gets my waves', async ()=>{
    const myWaves = await wave.methods.getMyWaves().call({from: user});
    assert.equal(myWaves, HOW_MANY);
  });
  it('has all these properties', async ()=>{    
  });
})