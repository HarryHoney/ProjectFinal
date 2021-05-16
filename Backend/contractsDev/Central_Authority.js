const contract = require('truffle-contract');
const artifacts = require('../build/Central_Authority.json')
const Web3 = require('web3');

const web3Provider = new Web3.providers.HttpProvider('http://localhost:8545')
const web3 = new Web3(web3Provider);

const LMS = contract(artifacts);
LMS.setProvider(web3.currentProvider)
module.exports = {other:LMS};
