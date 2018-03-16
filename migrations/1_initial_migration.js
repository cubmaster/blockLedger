var Migrations = artifacts.require("./Migrations.sol");
var contract = artifacts.require('./Consignment.sol');
var ConvertLib = artifacts.require('./ConvertLib.sol');
module.exports = function(deployer) {
  deployer.deploy(Migrations);
  deployer.deploy(ConvertLib);
  deployer.deploy(contract);
};
