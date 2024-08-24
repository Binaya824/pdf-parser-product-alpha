"use client"
import React from 'react';
import Card from '../cards/Card';
import { FiSearch, FiPlus } from 'react-icons/fi';
import { setFileUploadInitiated, setDocumentType, setFile } from '@/store/features/fileUpload/fileUploadSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import DocumentModal from '../modals/Add_Doument_modal/DocumentModal';


const Document = () => {
  const { isFileUploadInitiated, documentType, file ,documentCategory} = useAppSelector((state) => state.fileUpload);
  const dispatch = useAppDispatch();

  //  console.log("-----")
  //  console.log("file", isFileUploadInitiated);
  //  console.log("documentType", documentType);
  //  console.log("document category", documentCategory)
  //  console.log("file", file)
  //  console.log("-----")

  const handleFileAdd = ()=>{
    dispatch(setFileUploadInitiated(true))
  }

  return (
    <div className="p-2 sm:p-4 lg:p-0">
      {/* Top Bar */}
      <div className="flex flex-col  sm:flex-row items-center justify-between bg-transparent p-4 border-b border-gray-200 mb-4">
        <div className="text-lg sm:text-xl font-semibold mb-2 sm:mb-0">Document Types</div>
        <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4">
          <div className="relative text-xs w-full sm:w-64">
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
              <FiSearch size={16} color="gray" />
            </div>
            <input
              type="text"
              placeholder="Search document type"
              className="pl-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
            />
          </div>
          {isFileUploadInitiated && <DocumentModal /> }
          <button onClick={()=> handleFileAdd()}  className="bg-red-500 text-white px-4 py-2 text-xs rounded-lg hover:bg-red-600 flex items-center space-x-2">
            <FiPlus size={16} color="white" />
            <span>Add Document Type</span>
          </button>
        </div>
      </div>

      {/* Card Container */}
      <div
        id="document"
        className="pb-4 flex flex-wrap gap-4 overflow-y-auto"
        style={{ maxHeight: 'calc(100vh - 8rem)' }}
      >
        <Card />
        
      </div>
    </div>
  );
};

export default Document;
