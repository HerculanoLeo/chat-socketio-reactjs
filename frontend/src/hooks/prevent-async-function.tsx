import { useRef, useState } from 'react';

function usePreventAsyncFunction<T extends Function>(
  asyncFunction: T,
  controlledState?: boolean,
) {
  const [unlockFunction, setUnlockFunction] = useState(true);
  const unlockFunctionRef = useRef(true);

  const safeFunction = async (...args: any) => {
    if (isUnlockFunction()) {
      try {
        setIsUnlockFunction(false);
        return await asyncFunction(...args);
      } catch (error) {
        throw error;
      } finally {
        setIsUnlockFunction(true);
      }
    }
  };

  const isUnlockFunction = () => {
    return controlledState ? unlockFunction : unlockFunctionRef.current;
  };

  const setIsUnlockFunction = (state: boolean) => {
    if (controlledState) {
      setUnlockFunction(state);
    } else {
      unlockFunctionRef.current = state;
    }
  };

  return {
    safeFunction: safeFunction as unknown as T,
    isUnlock: isUnlockFunction(),
  };
}

export default usePreventAsyncFunction;
