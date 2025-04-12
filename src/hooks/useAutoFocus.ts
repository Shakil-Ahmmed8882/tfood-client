import { useEffect, useRef } from "react";

export const useAutoFocus = (shouldFocus: boolean) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const isEmpty = inputRef.current?.value === "";

  useEffect(() => {
    if (shouldFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [shouldFocus]);

  return {inputRef, isEmpty};
};
