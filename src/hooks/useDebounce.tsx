import { useState, useEffect } from "react";

export const useDebounce = <X, Y extends number>(value: X, delay: Y) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(timerId);
    };
  }, [value, delay]);
  return debouncedValue;
};
