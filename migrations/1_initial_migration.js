const Migrations = artifacts.require("Migrations");
const CompoundEth = artifacts.require("CompoundEth");
const SendEther = artifacts.require("SendEther");

module.exports = function (deployer) {
  deployer.deploy(Migrations);
  deployer.deploy(CompoundEth);
  deployer.deploy(SendEther);
};
