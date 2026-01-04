import { useEffect, useCallback } from 'react';
import debounce from 'lodash.debounce';

/**
 * value 값이 변경될 때 callback을 디바운스하여 실행하는 커스텀 훅
 *
 * @param {useCallback((value: any) => void,[])} callback
 *  메모처리된 함수 전달 할 것 ( 아규먼트로 전달되는 함수 주소값 바껴 불필요한 리렌더링 발생)
 *
 * @param {any} value
 *  디바운스 대상 값 (이 값이 바뀔 때마다 callback 실행 예약)
 *
 * @param {number} [delay=300]
 *  디바운스 지연 시간(ms)
 */

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
