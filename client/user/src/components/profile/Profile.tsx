import React from 'react';
import { FiChevronDown } from 'react-icons/fi';

const Profile = () => {
  return (
    <div className="flex items-center space-x-4">
      {/* Profile Picture */}
      <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-300">
        {/* <img src="/path-to-profile-pic.jpg" alt="Profile" className="w-full h-full object-cover" /> */}
      </div>
      {/* Profile Details */}
      <div className="flex flex-col text-xs">
        <span className="font-semibold text-gray-500">Rohan Doe</span>
        <span className="font-semibold text-black">Test Plan</span>
      </div>
      {/* Dropdown */}
      <div className="relative">
        <button className="flex items-center space-x-1 text-gray-600">
         <FiChevronDown/>
          {/* <FiChevronDown className="w-4 h-4" /> */}
        </button>
        {/* Dropdown Menu (Hidden by default) */}
        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-lg shadow-lg hidden">
          <ul>
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Profile Settings</li>
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Logout</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Profile;
