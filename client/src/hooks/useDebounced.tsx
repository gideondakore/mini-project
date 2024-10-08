import { useEffect, useMemo, useState } from "react";

const useDebounced = (value: string, delay: number = 500) => {
  const [debounced, setDebounced] = useState<string>("");

  useEffect(() => {
    ((value: string, delay: number) => {
      return new Promise(() => {
        setTimeout(() => {
          setDebounced(value);
        }, delay);
      });
    })(value, delay);
  }, [delay, value]);
  return useMemo(() => debounced, [debounced]);
};

export default useDebounced;
