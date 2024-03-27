import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ethers } from 'ethers';
import { JsonRpcProvider } from 'ethers/providers';
import ApexCharts from 'react-apexcharts';

import MockBitcoinWallet from '../contracts/MockBitcoinWallet.json';

function AccountBalance() {
  const navigate = useNavigate();
  const [balances, setBalances] = useState([]);
  const [ethPriceHistory, setEthPriceHistory] = useState([]);
  const [seriesData, setSeriesData] = useState([]);

  useEffect(() => {
    const fetchBalances = async () => {
      try {
        const provider = new JsonRpcProvider('http://localhost:8545');
        const accounts = await provider.listAccounts();
        const balances = await Promise.all(accounts.map(async (account) => {
          const contractAddress = '0x5fbdb2315678afecb367f032d93f642f64180aa3'; // Replace with your deployed contract address
          const contract = new ethers.Contract(contractAddress, MockBitcoinWallet.abi, provider);
          const balanceInWei = await contract.balances(account);
          return ethers.formatEther(balanceInWei);
        }));
        setBalances(balances);
      } catch (error) {
        console.error('Error fetching balances:', error);
      }
    };

    fetchBalances();
  }, []);



  useEffect(() => {
    const API_KEY = 'bc5981cf9b879a8dc599fe2ccb3f48f089cb4308b435d8a6a51dc24f475afa71'; // Replace with your CryptoCompare API key
    const fetchEthPriceHistory = async () => {
      const url = `https://min-api.cryptocompare.com/data/v2/histoday?fsym=ETH&tsym=CAD&limit=30&api_key=${API_KEY}`;
      try {
        const response = await fetch(url);
        const data = await response.json();
        setEthPriceHistory(data.Data.Data);

        // Prepare series data for the chart
        const series = data.Data.Data.map(day => ({
          x: new Date(day.time * 1000),
          y: day.close
        }));

        setSeriesData(series);
      } catch (error) {
        console.error('Error fetching Ethereum price history:', error);
      }
    };

    fetchEthPriceHistory();
  }, []);


  
  const chartOptions = {
    chart: {
      type: 'area',
      stacked: false,
      height: 350,
      zoom: { type: 'x', enabled: true },
      toolbar: { autoSelected: 'zoom' },
      dropShadow: {
        enabled: false,
      },
    },
    dataLabels: { enabled: false },
    markers: { size: 0 },
    title: {
      text: 'Ethereum Price',
      align: 'left'
    },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        inverseColors: false,
        opacityFrom: 0.5,
        opacityTo: 0.1,
        stops: [0, 90, 100]
      },
    },
    yaxis: {
      labels: {
        formatter: function (val) {
          return (val).toFixed(2);
        },
      },
      title: {
        text: 'Price'
      },
    },
    xaxis: {
      type: 'datetime',
    },
    tooltip: {
      shared: false,
      y: {
        formatter: function (val) {
          return (val).toFixed(2)
        }
      }
    }
  };

  // Note: The graph needs to be a controlled component with dynamic keys to force a re-render
  const now = new Date();
  const graphKey = `graph-${now.getTime()}`;



  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="container mx-auto flex justify-center mt-12 mb-12">
        {/* Grid wrapper */}
        <div className="w-full max-w-xl">

        {/* Placeholder Card as the Dashboard */}
        <div className="bg-white p-12 rounded-lg shadow-lg space-y-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-900">Wallet Dashboard</h2>
            <img src="/image.png" alt="Logo" className="h-12 w-auto" />
          </div>
          <div className="flex flex-col space-y-4">
          <button onClick={() => {}} className="px-6 py-2 bg-sky-900 hover:bg-sky-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-900 focus:ring-offset-2">Settings</button>
          <button onClick={() => {}} className="px-6 py-2 bg-sky-900 hover:bg-sky-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-900 focus:ring-offset-2">Support</button>
          <button onClick={() => {}} className="px-6 py-2 bg-sky-900 hover:bg-sky-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-900 focus:ring-offset-2">About</button>
          </div>
        </div>

        {/* Account Balances Card */}
        <div className="bg-white p-12 rounded-lg shadow-lg space-y-6 mt-10">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">Account Balances</h2>
          {balances.length > 0 ? (
            <ul className="text-lg text-gray-700">
              {/* Display only the first balance */}
              <li>
                Current Balance: <span className="font-semibold">{balances[6]} ETH</span>
              </li>
            </ul>
          ) : (
            <p className="text-lg text-gray-700">Fetching balances...</p>
          )}
          <div className="flex flex-col space-y-4">
            <button onClick={() => navigate('/money-transfer')} className="px-6 py-2 bg-sky-900 hover:bg-sky-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-900 focus:ring-offset-2">Transfer Money</button>
            <button onClick={() => navigate('/transaction-statements')} className="px-6 py-2 bg-sky-900 hover:bg-sky-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-900 focus:ring-offset-2">View Transactions</button>
            <button onClick={() => navigate('/')} className="px-6 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-offset-2">Logout</button>
          </div>
        </div>

  
          {/* Graph Card */}
          <div className="bg-white p-12 mt-10 rounded-lg shadow-lg">
            <div key={graphKey}>
              <ApexCharts options={chartOptions} series={[{ name: 'ETH', data: seriesData }]} type="area" height={350} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  

}  

export default AccountBalance;
