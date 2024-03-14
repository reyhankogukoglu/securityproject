// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract MockBitcoinWallet {
    mapping(address => uint256) public balances;

    event Sent(address from, address to, uint256 amount);
    event Received(address from, uint256 amount);

    constructor(address[] memory accounts) {
        // Initialize the contract with an initial balance of 10000 ether for each account
        for (uint256 i = 0; i < accounts.length; i++) {
            balances[accounts[i]] += 10000 ether;
        }
    }

    function send(address to, uint256 amount) public {
        require(balances[msg.sender] >= amount, "Insufficient balance");
        balances[msg.sender] -= amount;
        balances[to] += amount;
        emit Sent(msg.sender, to, amount);
    }

    receive() external payable {
        balances[msg.sender] += msg.value;
        emit Received(msg.sender, msg.value);
    }

    // Function to check balance
    function getBalance(address account) public view returns (uint256) {
        return balances[account];
    }

}
