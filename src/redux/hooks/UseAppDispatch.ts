import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store'; // Path to your store file

export const useAppDispatch = () => useDispatch<AppDispatch>();