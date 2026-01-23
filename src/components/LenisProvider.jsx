// src/components/LenisProvider.jsx


import { useEffect, useState } from 'react';
import { LenisContext } from './LenisContext';
import Lenis from "lenis";

function LenisProvider({ children }) {
  const [lenis, setLenis] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const newLenis = new Lenis({
      duration: 1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    setLenis(newLenis);
    setIsLoading(false);

    function raf(time) {
      newLenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      newLenis.destroy();
      setLenis(null);
    };
  }, []);

  if (isLoading) {
    return null;
  }

  return (
    <LenisContext.Provider value={lenis}>
      {children}
    </LenisContext.Provider>
  );
}

export default LenisProvider;