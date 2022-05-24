const Migrations = artifacts.require("Migrations");
const NFTtest = artifacts.require("NFTtest");

module.exports = function (deployer) {
  deployer.deploy(Migrations);
  deployer.deploy(NFTtest);
};
