pragma solidity ^0.8.0;

contract BlockchainContract {
  mapping(address => uint256) private balances;
  address private owner;

  event Transfer(address indexed from, address indexed to, uint256 amount);

  constructor() {
    owner = msg.sender;
  }

  modifier onlyOwner() {
    require(msg.sender == owner, "Only the contract owner can call this function.");
    _;
  }

  function deposit() external payable {
    balances[msg.sender] += msg.value;
  }

  function withdraw(uint256 amount) external {
    require(balances[msg.sender] >= amount, "Insufficient balance.");

    balances[msg.sender] -= amount;
    payable(msg.sender).transfer(amount);

    emit Transfer(address(this), msg.sender, amount);
  }

  function getBalance(address account) external view returns (uint256) {
    return balances[account];
  }
}