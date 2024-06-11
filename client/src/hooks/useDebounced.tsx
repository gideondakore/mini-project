import { useEffect, useMemo, useState } from "react";

const useDebounced = (value: string, delay: number = 1000) => {
  const [debounced, setDebounced] = useState<string>("");

  useEffect(() => {
    ((value: string, delay: number) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          setDebounced(value);
        }, delay);
      });
    })(value, delay);
  }, [delay, value]);
  return useMemo(() => debounced, [debounced]);
};

export default useDebounced;
