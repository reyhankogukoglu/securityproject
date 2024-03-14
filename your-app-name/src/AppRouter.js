// AppRouter.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import AccountBalance from './components/AccountBalance';
import TransactionStatements from './components/TransactionStatements';
import MoneyTransfer from './components/MoneyTransfer';

function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/account-balance" element={<AccountBalance />} />
        <Route path="/transaction-statements" element={<TransactionStatements />} />
        <Route path="/money-transfer" element={<MoneyTransfer />} />
      </Routes>
    </Router>
  );
}

export default AppRouter;
