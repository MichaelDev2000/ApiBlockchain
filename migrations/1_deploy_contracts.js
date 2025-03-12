const MembresiasToken = artifacts.require("MembresiaToken");

module.exports = async function (deployer) {
    await deployer.deploy(MembresiasToken);

};