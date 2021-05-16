var CentralAuthority = artifacts.require('./Central_Authority.sol');
var Official = artifacts.require('./Official.sol');
var TaxCollection = artifacts.require('./TaxCollection.sol');
// var Project = artifacts.require('./Project');

module.exports = async function(deployer){

	const accounts = await web3.eth.getAccounts();
	const centralAuthContract = await deployer.deploy(CentralAuthority, {from: accounts[0]});
	const taxCollectionContract = await deployer.deploy(TaxCollection,centralAuthContract.address, {from: accounts[0]});

}
/*
Contract is deployed to 0x898D22d4375C0eb7B1161B2C3c6431B6992A2154
Central Authority
on rinkbey

Contract is deployed to 0x03e81faDa15f80c9eBe648D1dD3F84D0f56358e6
TaxCollection wala

*/