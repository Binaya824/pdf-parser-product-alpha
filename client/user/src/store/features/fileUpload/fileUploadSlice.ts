import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the initial state
interface FileUploadState {
    isFileUploadInitiated: boolean;
    documentType: string | null;  // Document type (e.g., Income, Procurement)
    documentCategory: string | null;  // Document category (e.g., Bank Statement, Invoice)
    file: File | null;
}

const initialState: FileUploadState = {
    isFileUploadInitiated: false,
    documentType: null,
    documentCategory: null,
    file: null,
};

// Create the slice
const fileUploadSlice = createSlice({
    name: 'fileUpload',
    initialState,
    reducers: {
        setFileUploadInitiated(state, action: PayloadAction<boolean>) {
            state.isFileUploadInitiated = action.payload;
        },
        setDocumentType(state, action: PayloadAction<{ type: string | null; category: string | null }>) {
            state.documentType = action.payload.type;
            state.documentCategory = action.payload.category;
        },
        setFile(state, action: PayloadAction<File | null>) {
            state.file = action.payload;
        },
        closeFileUpload(state) {
            state.isFileUploadInitiated = false;
            state.file = null;
            state.documentType = null;
            state.documentCategory = null;
        },
        resetSelectedDoc(state){
            state.documentType = null
            state.documentCategory = null;
            state.file =  null;
        },
        deleteSelectedFile(state){
            state.file = null;
        }
    },
});

// Export actions
export const { setFileUploadInitiated, setDocumentType, setFile, closeFileUpload, resetSelectedDoc, deleteSelectedFile } = fileUploadSlice.actions;

// Export reducer
export default fileUploadSlice.reducer;
