const web3 = require("./web3");
const fs = require('fs');
const path = require('path');


const constractsPath = path.resolve(__dirname, '../artifacts/MembresiaToken.json');

const contractJson = JSON.parse(fs.readFileSync(constractsPath, 'utf8'));
const abi = contractJson.abi;
const address = "0x7A4bA6AA0537d3bb11f069968b0C5027D053E317";

const contratoMembresias = new web3.eth.Contract(abi, address);

module.exports = contratoMembresias;