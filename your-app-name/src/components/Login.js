// components/Login.js
import React, { useState } from 'react';
import { Alert } from 'react-native'
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    try {
      // Replace this URL with your actual authentication endpoint
      const apiUrl = 'https://securityproject-418118.nn.r.appspot.com/api/auth';
      console.log(username);
      console.log(password);

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }), 
      });
      console.log(response)

      if (response.ok) {
        // Authentication successful
        console.log('Authentication successful'); 
        navigate('/account-balance');
        // You might want to navigate to the next screen or perform some other action here
      } else {
        // Authentication failed
        const errorData = await response.json();
        console.log("Authentication failed");
        Alert.alert('Authentication Failed', errorData.message || 'Invalid credentials');
      }
    } catch (error) {
      console.error('Error during authentication:', error.message);
      Alert.alert('Error', 'An unexpected error occurred. Please try again.');
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
          <form className="mb-0 space-y-6">
            {error && (
              <div className="text-red-500 text-sm">
                {error}
              </div>
            )}
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
              <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)}
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-sky-900 focus:border-sky-900 sm:text-sm" required autoComplete="username"/>
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)}
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-sky-900 focus:border-sky-900 sm:text-sm" required autoComplete="current-password"/>
            </div>
            <div>
              <button onClick={handleLogin} className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
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
