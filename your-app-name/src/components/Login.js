// components/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Hardcoded set of credentials for demonstration purposes
    const validUsername = 'a';
    const validPassword = 'a';

    if (username === validUsername && password === validPassword) {
      // Successful login
      navigate('/account-balance');
    } else {
      // Invalid credentials, display an error message
      setError('Invalid username or password. Please try again.');
    }
  };

  const handleSignUpClick = () => {
    navigate('/register');
  };

  return (
    
    <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-gray-100">
      
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          <button onClick={() => navigate('/register')} className="font-medium text-sky-900 hover:text-sky-800">Or create a new account</button>
        </p>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-6 shadow-md shadow-sky-900/50 rounded-lg sm:px-10">
          <form onSubmit={handleSubmit} className="mb-0 space-y-6">
            {error && (
              <div className="text-red-500 text-sm">
                {error}
              </div>
            )}
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
              <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)}
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-sky-900 focus:border-sky-900 sm:text-sm" required />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)}
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-sky-900 focus:border-sky-900 sm:text-sm" required />
            </div>
            <div>
              <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
                Sign In
              </button>
            </div>
            <div>
            <button type="button" onClick={handleSignUpClick}  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-sky-900 hover:bg-sky-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-900">
            Sign Up
            </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
