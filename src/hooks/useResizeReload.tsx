import { useEffect } from "react";

const useResizeReload = () => {
  useEffect(() => {
    const onResize = () => location.reload();
    // https://gist.github.com/ca0v/73a31f57b397606c9813472f7493a940
    const debounce = <T extends (...args: unknown[]) => void>(
      fn: T,
      delay: number
    ): ((...args: Parameters<T>) => void) => {
      let timeoutId: ReturnType<typeof setTimeout>;
      return (...args: Parameters<T>) => {
        if (timeoutId) {
          clearTimeout(timeoutId);
        }
        timeoutId = setTimeout(() => {
          fn(...args);
        }, delay);
      };
    };
    window.addEventListener("resize", debounce(onResize, 200));
    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, []);
};

export default useResizeReload;
