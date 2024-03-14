require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.24",
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545/", // Make sure this matches your local Ethereum node URL
      accounts: [
        // Add the private keys of your accounts here
        "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80",
        "0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d",
        "0x7c852118294e51e653712a81e05800f419141751be58f605c371e15141b007a6",
        // Add other accounts...
      ],
    },
    // Other networks...
  },
};
