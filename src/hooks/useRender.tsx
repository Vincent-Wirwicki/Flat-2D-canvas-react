import { useEffect, useRef } from "react";

const useRender = () => {
  const raf = useRef(0);
  useEffect(() => {
    const animate = () => {};
    raf.current = requestAnimationFrame(animate);
    return () => {
      cancelAnimationFrame(raf.current);
    };
  });
  return <div>useRender</div>;
};

export default useRender;
