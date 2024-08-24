import React from 'react';
import Profile from '../profile/Profile';

const Header = () => {
  return (
    <header className="bg-white border-b border-gray-300 p-4 flex justify-between items-center h-[4rem]">
      <h1 className="text-2xl font-bold">𝖰Docs<span className="text-2xl font-bold text-red-500">.</span></h1>
      <div className="flex items-center space-x-4">
        <button className="bg-red-300 text-xs  border border-red-400 text-white px-4 py-2 rounded-lg hover:bg-red-600">
          Upgrade Plan
        </button>
        <Profile />
      </div>
    </header>
  );
};

export default Header;
