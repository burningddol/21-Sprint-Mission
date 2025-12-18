import { useEffect, useCallback } from 'react';
import debounce from 'lodash.debounce';

//value값이 변할 때 callback 함수 delay만큼 디바운스
export function useDebouncedEffect(callback, value, delay = 300) {
  const debouncedCallback = useCallback(
    debounce((v) => {
      callback(v);
    }, delay),
    [callback, delay]
  );

  useEffect(() => {
    debouncedCallback(value);

    return () => {
      debouncedCallback.cancel();
    };
  }, [value, debouncedCallback]);
}
