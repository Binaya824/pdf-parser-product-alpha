"use client"
import { setFile } from '@/store/features/fileUpload/fileUploadSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import React, { useState } from 'react';
import { BsFillCloudUploadFill } from "react-icons/bs";

const FileUpload: React.FC = () => {
    const [previewSrc, setPreviewSrc] = useState<string | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const dispatch = useAppDispatch();
    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files[0];
        if (file) {
            displayPreview(file);
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
            displayPreview(selectedFile);
            dispatch(setFile(selectedFile));
        }
    };

    const displayPreview = (file: File) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            setPreviewSrc(reader.result as string);
        };
    };

    return (
        <div
            className={`w-full mt-5 mb-5 relative border-2 ${isDragging ? 'bg-red-100 border-red-600' : 'border-red-400'
                } border-dashed rounded-lg p-6`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            id="dropzone"
        >
            <input
                type="file"
                className="absolute inset-0 w-full h-full opacity-0 z-50 cursor-pointer"
                onChange={handleFileChange}
            />
            <div className="text-center">
                <div className='flex justify-center items-center text-lg md:text-2xl lg:text-5xl' >
                    <BsFillCloudUploadFill />
                </div>
                <h3 className="mt-2 text-sm font-medium text-gray-900">
                    <label htmlFor="file-upload" className="relative cursor-pointer">
                        <p className='text-2xl font-bold' >Drag and drop files here</p>
                        <p className="text-gray-500 text-xl mb-2 mt-2"> or</p>
                        <p className='text-xl p-3 border border-gray-400/50 text-gray-400 rounded-md w-fit m-auto' >Click here to upload</p>
                        <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                    </label>
                </h3>
                <p className="mt-5 text-gray-500 text-sm w-[90%] m-auto text-center">
                    Supported formats: JPG, JPEG, PNG, TIFF, PDF, TIF, XLSX, XLS <br />
                    File size should be maximum 25mb and it shouldn&apos;t be password protected
                </p>
            </div>
            {/* {previewSrc && (
                <img src={previewSrc} className="mt-4 mx-auto max-h-40" alt="Preview" id="preview" />
            )} */}
        </div>
    );
};

export default FileUpload;
