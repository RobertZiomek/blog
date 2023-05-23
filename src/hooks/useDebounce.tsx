import { useState, useEffect } from "react";

export const useDebounce = <X,>(value: X, delay: number): X => {
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
