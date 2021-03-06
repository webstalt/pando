const NFTCollection = artifacts.require("NFTCollection");
const NFTMarketplace = artifacts.require("NFTMarketplace");
const RBFVault = artifacts.require("RBFVault");

module.exports = async function (deployer) {
  await deployer.deploy(NFTCollection);
  const deployedNFT =  await NFTCollection.deployed();

  const NFTAddress = deployedNFT.address;
  await deployer.deploy(NFTMarketplace, NFTAddress);
};




const RBFVault = artifacts.require("RBFVault");
const PaymentSplitter = artifacts.require("PaymentSplitter");
const CompoundEth = artifacts.require("CompoundEth");
const SendEther = artifacts.require("SendEther");

module.exports = function (deployer) {
  deployer.deploy(Migrations);
  deployer.deploy(RBFVault);
  deployer.deploy(PaymentSplitter);
  deployer.deploy(CompoundEth);
  deployer.deploy(SendEther);
};
