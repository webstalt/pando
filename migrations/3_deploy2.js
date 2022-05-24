const Migrations = artifacts.require("Migrations");
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
