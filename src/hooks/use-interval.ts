import { useEffect, useRef } from "react";

type Callback = () => void;

export const useInterval = (callback: Callback, delay: number | null) => {
  const savedCallback = useRef<Callback | null>(null);
  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    const tick = () => {
      if (savedCallback.current) {
        savedCallback.current();
      }
    };

    if (delay !== null) {
      const id = setInterval(tick, delay);
      return () => {
        clearInterval(id);
      };
    }
  }, [delay]);
};
