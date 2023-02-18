import { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../state';

// Bind dispatch and actions to useActions
// Example use:
// const { updateCell } = useActions();
// updateCell(contentHere);
export const useActions = () => {
  const dispatch = useDispatch();

  // Memoize bindActionCreators to prevent dependency render loop in code-cell.tsx
  return useMemo(() => {
    return bindActionCreators(actionCreators, dispatch);
  }, [dispatch]);
};
