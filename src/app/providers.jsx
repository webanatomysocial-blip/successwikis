'use client';

import { useEffect, useState } from 'react';
import { LenisContext } from '../components/LenisContext';
import Lenis from "lenis";

export function LenisProvider({ children }) {
  const [lenisInstance, setLenisInstance] = useState(null);
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

    setLenisInstance(newLenis);
    setIsLoading(false);

    // Make lenis globally available as the app expects
    window.lenis = newLenis;

    function raf(time) {
      newLenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      newLenis.destroy();
      setLenisInstance(null);
      if (window.lenis === newLenis) {
        window.lenis = null;
      }
    };
  }, []);

  if (isLoading) {
    return null;
  }

  return (
    <LenisContext.Provider value={lenisInstance}>
      {children}
    </LenisContext.Provider>
  );
}
