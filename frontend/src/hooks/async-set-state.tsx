import { useEffect, useRef } from 'react';

function useAsyncSetState<T extends Function>(asyncSetState: T) {
  const canSetState = useRef(false);

  useEffect(() => {
    canSetState.current = true;

    return () => {
      canSetState.current = false;
    };
  }, [canSetState]);

  const setAsyncState = (...args: any) => {
    if (canSetState.current) {
      asyncSetState(...args);
    }
  };

  return setAsyncState as unknown as T;
}

export default useAsyncSetState;
