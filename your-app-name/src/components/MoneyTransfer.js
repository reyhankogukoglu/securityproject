import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ethers } from 'ethers'; // Import ethers library
import { JsonRpcProvider } from 'ethers/providers';

import MockBitcoinWallet from '../contracts/MockBitcoinWallet.json';

function MoneyTransfer() {
  const navigate = useNavigate();
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [privateKey, setPrivateKey] = useState('');
  const [isTransactionConfirmed, setIsTransactionConfirmed] = useState(false);
  const [confirmedAmount, setConfirmedAmount] = useState('');

  fetch('https://securityproject-418118.nn.r.appspot.com/profile', {
    method: 'GET',
    credentials: 'include', // Include cookies in the request
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json(); // Assuming the response is JSON
  })
  .then(data => {
    // Handle the data received from the backend
    console.log(data); // Or do something else with the data
  })
  .catch(error => {
    console.error('There was a problem with the fetch operation:', error);
  });
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setPrivateKey('0x92db14e403b83dfe3df233f83dfa3a0d7096f21ca9b0d6d6b8d88b2b4ec1564e');
  
    // Connect to Ethereum network
    const provider = new JsonRpcProvider('http://localhost:8545');
    const accounts = await provider.listAccounts();
    const accountAddress = accounts[recipient];
    const signer = new ethers.Wallet("0x92db14e403b83dfe3df233f83dfa3a0d7096f21ca9b0d6d6b8d88b2b4ec1564e", provider);
    const selectedAccount = "0x70997970C51812dc3A010C7d01b50e0d17dc79C8";
    // Load contract
    const contractAddress = '0x5fbdb2315678afecb367f032d93f642f64180aa3'; // Replace with your deployed contract address
    const contract = new ethers.Contract(contractAddress, MockBitcoinWallet.abi, signer);
  
    try {
      const txResponse = await contract.send(recipient, ethers.parseEther(amount));
      console.log(`Transaction hash: ${amount}`);
    
      provider.once(txResponse.hash, (transaction) => {
        console.log(`Transaction confirmed in block ${transaction.blockNumber}`);
        setConfirmedAmount(amount); // Store the amount when the transaction is confirmed
        setIsTransactionConfirmed(true); // Trigger modal display
      });      
      
    } catch (error) {
      console.error('Error transferring funds:', error);
    }
    
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-gray-900">Transfer Money</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="recipient" className="block text-sm font-medium text-gray-700">Recipient Account:</label>
            <input type="text" id="recipient" value={recipient} onChange={(e) => setRecipient(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-sky-900 focus:border-sky-900 sm:text-sm" required />
          </div>
          <div>
            <label htmlFor="amount" className="block text-sm font-medium text-gray-700">Amount (ETH):</label>
            <input type="number" id="amount" value={amount} onChange={(e) => setAmount(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-sky-900 focus:border-sky-900 sm:text-sm" required min="0.01" step="0.01" />
          </div>
          <button type="submit" className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-sky-900 hover:bg-sky-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-900">
            Transfer
          </button>
          <button onClick={() => navigate('/account-balance')} className="mt-4 w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
            Return to Dashboard
          </button>
        </form>
      </div>
    {/* Modal for Transaction Confirmation */}
    {isTransactionConfirmed && (
  <div className="fixed z-10 inset-0 overflow-y-auto">
    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
      <div className="fixed inset-0 transition-opacity" aria-hidden="true">
        <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
      </div>
      <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
      <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
        <div>
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
            <svg className="h-6 w-6 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <div className="mt-3 text-center sm:mt-5">
            <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
              Transaction Confirmed
            </h3>
            <div className="mt-2">
              <p className="text-sm text-gray-500">
                Successfully transferred {confirmedAmount} ETH to {recipient}.
              </p>
            </div>
          </div>
        </div>
        <div className="mt-5 sm:mt-6">
          <button type="button" className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-sky-600 text-base font-medium text-white hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 sm:text-sm" onClick={() => setIsTransactionConfirmed(false)}>
            Done
          </button>
        </div>
      </div>
    </div>
  </div>
)}

    </div>
  );
}

export default MoneyTransfer;
