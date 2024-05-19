import { useState, useEffect, RefObject } from "react";

function useInViewport<T extends HTMLElement>(
  ref: RefObject<T>,
  options?: IntersectionObserverInit
): boolean {
  const [isInView, setIsInView] = useState<boolean>(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsInView(entry.isIntersecting);
    }, options);

    if (ref.current) {
      observer.observe(ref.current);
    }

    const refCopy = ref.current as HTMLElement;

    return () => {
      observer.unobserve(refCopy);
    };
  }, [ref, options]);
  return isInView;
}

export default useInViewport;
