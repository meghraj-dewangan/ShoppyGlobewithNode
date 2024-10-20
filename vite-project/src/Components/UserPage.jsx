import React from 'react';
import { useUserAuth } from './UserContext';
import Signup from './SignUp';

const UserPage = () => {
  const { authenticated, handleLogout } = useUserAuth(); 
  const username = localStorage.getItem('username');
  const email = localStorage.getItem('email');
  
  return (
    <>
      {!authenticated ? (
        <Signup />
      ) : (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 ">
          <div className="bg-white p-8 rounded shadow-md w-full max-w-md shadow-orange-200">
            <h2 className="text-2xl mb-6 font-bold">Welcome, {username}!</h2>
            <p className="mb-4 font-bold">Email: {email}</p>
           
            
            <button
              onClick={handleLogout}
              className="mt-4 w-full bg-orange-400 text-white font-semibold py-2 rounded-md transition duration-300 ease-in-out transform hover:bg-orange-600 hover:scale-105"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default UserPage;
