const fs = require('fs');
const path = require('path');

// Load the JSON file containing the compiled contract artifacts
const contractName = 'MockBitcoinWallet'; // Replace 'Lock' with the name of your contract
const artifactsPath = path.join(__dirname, 'artifacts', contractName + '.json');
const contractArtifacts = JSON.parse(fs.readFileSync(artifactsPath, 'utf8'));

// Extract the ABI from the contract artifacts
const abi = contractArtifacts.abi;

// Now you can use the ABI in your application to interact with the deployed contract
console.log(abi); // Print the ABI to the console
