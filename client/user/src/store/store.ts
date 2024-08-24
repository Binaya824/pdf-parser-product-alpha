// app/store.ts
import { configureStore } from '@reduxjs/toolkit';
import fileUploadReducer from './features/fileUpload/fileUploadSlice';

export const store = configureStore({
    reducer: {
        fileUpload: fileUploadReducer,
    },
});

// Define the RootState and AppDispatch types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
