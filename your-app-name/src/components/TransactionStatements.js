import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ethers } from 'ethers';
import { JsonRpcProvider } from 'ethers/providers';

import MockBitcoinWallet from '../contracts/MockBitcoinWallet.json';

function TransactionStatements() {
  const navigate = useNavigate();
  const [transactions, setTransactions] = useState([]);
  const [userAddress, setUserAddress] = useState('');
  const [transactionDisplayInfo, setTransactionDisplayInfo] = useState([]);
  async function getDisplayData(transactionInfoLogs) {
    let displayInfoArray = [];

    // Iterate through each transaction log
    transactionInfoLogs.forEach(transactionLog => {
        // Extract the arguments array from the transaction log
        const args = transactionLog.args;
        
        // Access and process the individual arguments
        const fromAddress = args[0];
        const toAddress = args[1];
        const amountInWei = args[2];
        
        // Print or process the extracted information
        // console.log("From:", fromAddress);
        // console.log("To:", toAddress);
        // console.log("Amount in Wei:", amountInWei);

        // Add the extracted information to the displayInfoArray
        displayInfoArray.push({
        fromAddress,
        toAddress,
        amountInWei
      });

    });
    setTransactionDisplayInfo(displayInfoArray);

}


  async function parseEventLogs(provider, contractAddress, abi, transactionHashes) {
    const parsedLogs = [];
  
    for (const hash of transactionHashes) {
      // Retrieve the transaction receipt
      const receipt = await provider.getTransactionReceipt(hash.id);
      // Get the contract interface
      const contract = new ethers.Contract(contractAddress, abi, provider);
      // Parse event logs
      const logs = receipt.logs.map(log => contract.interface.parseLog(log));
      parsedLogs.push(...logs);
    }
    console.log(parsedLogs)
    getDisplayData(parsedLogs);
    return parsedLogs;
  }
  

  useEffect(() => {
    async function fetchTransactions() {
      const provider = new JsonRpcProvider('http://localhost:8545'); // Assuming your Hardhat server is running locally on port 8545
      const contract = new ethers.Contract(
        '0x5fbdb2315678afecb367f032d93f642f64180aa3',
        MockBitcoinWallet.abi,
        provider
      );
    
      // Fetch transaction history
      const filter = {
        address: '0x5fbdb2315678afecb367f032d93f642f64180aa3', // Contract address
        topics: [ethers.id('Sent(address,address,uint256)')], // Event topic for Sent event
        fromBlock: 0, // Start block (optional)
        toBlock: 'latest', // End block (optional)
        from: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266' // Specific sender address
      };

      const events = await provider.getLogs(filter);

      const detailedTransactions = await Promise.all(events.map(event => {
        const parsedLog = contract.interface.parseLog(event);
        // Check if parsedLog is defined before accessing its properties
        if (!parsedLog) {
          console.error('Failed to parse log event:', event);
          return null; // Skip this transaction
        }
        //const { from, to, amount } = parsedLog.values;
        // Manual conversion of Wei to Ether
        //const amountInEther = ethers.formatEther(amount);
        console.log("transaction hash is below");
        console.log(event.transactionHash)
        return {
          id: event.transactionHash,
        };
      }));
    
      // Filter out null transactions (due to failed parsing)
      const validTransactions = detailedTransactions.filter(tx => tx !== null);
      parseEventLogs(provider, '0x5fbdb2315678afecb367f032d93f642f64180aa3', MockBitcoinWallet.abi, detailedTransactions)
      setTransactions(validTransactions);
    }
    
    fetchTransactions();
  }, []);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
      <div className="mt-10 mb-10 bg-white p-6 rounded-lg shadow-lg max-w-4xl w-full overflow-x-auto">
        <h2 className="text-2xl font-bold mb-4 text-gray-900">Transaction Statements</h2>
        <table className="min-w-full leading-normal">
          <thead>
            <tr>
              <th className="px-5 py-3 border-b-2 border-gray-700 bg-gray-600 text-left text-xs font-semibold text-white uppercase tracking-wider">
                Sender
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-700 bg-gray-600 text-left text-xs font-semibold text-white uppercase tracking-wider">
                Recipient
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-700 bg-gray-600 text-left text-xs font-semibold text-white uppercase tracking-wider">
                Amount
              </th>
            </tr>
          </thead>
          <tbody>
  {transactionDisplayInfo.map((transaction, index) => (
    <tr key={index}>
      <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
        {transaction.fromAddress}
      </td>
      <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
        {transaction.toAddress}
      </td>
      <td className={`px-5 py-2 border-b border-gray-200 bg-white text-sm ${transaction.amountInETH >= 0 ? 'text-green-600' : 'text-red-600'}`}>
        {/* Convert amount from Wei to Ether and display */}
        {ethers.formatEther(transaction.amountInWei)} ETH
      </td>
    </tr>
  ))}
</tbody>

        </table>
        <button onClick={() => navigate('/account-balance')} className="mt-4 w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
          Return to Dashboard
        </button>
      </div>
    </div>
  );
}

export default TransactionStatements;
