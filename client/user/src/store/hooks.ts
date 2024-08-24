import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './store';

// Custom hook to use dispatch with AppDispatch type
export const useAppDispatch = () => useDispatch<AppDispatch>();

// Custom hook to use selector with RootState type
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
