import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

export function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export function usePrevious(value) {
  const ref = useRef(null);

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}
