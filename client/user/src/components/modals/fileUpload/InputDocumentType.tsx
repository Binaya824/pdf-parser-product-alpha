"use client"
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { useState } from 'react';

const MultiSelect: React.FC = () => {

    const { isFileUploadInitiated, documentType, file, documentCategory } = useAppSelector((state) => state.fileUpload);
    const dispatch = useAppDispatch();

    return (
        <div className="">
            <div className="relative">
                <label htmlFor="multi-select" className="block text-sm font-medium text-gray-700 mb-1">
                    Your chosen document type
                </label>
                <div className="mt-1 relative flex space-x-4">
                    <span className="block truncate">
                        Type : {documentType ? documentType : ""}
                    </span>
                    <span className="block truncate">
                        Category : {documentCategory ? documentCategory : ""}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default MultiSelect;
