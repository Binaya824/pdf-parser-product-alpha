import React from 'react';
import { FiUpload, FiEye } from 'react-icons/fi';

const Card = () => {
  return (
    <div className="h-fit bg-white border border-gray-300 shadow-lg rounded-lg  m-4 p-4 w-full sm:w-80">
      {/* Card Header */}
      <div className="flex justify-between items-center mb-4">
        <h4 className="text-sm font-semibold">Table Extractor</h4>
        <div className="text-gray-500 cursor-pointer">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            strokeWidth={1.5} 
            stroke="currentColor" 
            className="w-6 h-6"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
          </svg>
        </div>
      </div>

      {/* Status Box */}
      <div className="bg-gray-200 text-xs p-4 rounded-lg mb-4 border border-gray-200">
        <p>Uploaded: <span className="font-bold">1</span></p>
        <p>Review Pending: <span className="font-bold">0</span></p>
        <p>Approved: <span className="font-bold">1</span></p>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
        <button className="flex items-center text-xs space-x-2 bg-red-500 text-white px-4 py-2 rounded-lg h-8">
         
          <FiUpload size={14} color="white" />
          <span>Upload</span>
        </button>
        <button className="flex items-center text-xs space-x-2 bg-white text-gray-700 border border-gray-300 px-4 py-2 rounded-lg h-8">
          <FiEye size={14} color="gray" />
          <span>Review</span>
        </button>
      </div>
    </div>
  );
};

export default Card;
