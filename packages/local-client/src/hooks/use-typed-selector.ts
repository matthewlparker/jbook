import { useSelector, TypedUseSelectorHook } from 'react-redux';
import { RootState } from '../state';

// This enables TypeScript to understand type of data
// stored in Redux
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
