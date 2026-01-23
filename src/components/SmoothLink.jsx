// src/components/SmoothLink.jsx

import { useEffect, useCallback, useRef } from 'react';

function SmoothLink({ to = '#', children, ...props }) {
  const anchorRef = useRef(null);

  const handleClick = useCallback(
    (e) => {
      e.preventDefault(); // Prevent default jump
      const lenis = window.lenis;
      console.log('handleClick triggered for:', to, 'Lenis:', lenis);
      if (!lenis) {
        console.warn('Lenis not available for:', to);
        return;
      }
      const targetId = to.substring(1); // Remove '#'
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        lenis.scrollTo(targetElement, {
          offset: 0, // Adjust for fixed header if needed
          duration: 1,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Smooth easing
        });

      } else {
        console.warn('Target element not found:', targetId, 'Checking all IDs:', [...document.querySelectorAll('[id]')].map(el => el.id));
        const fallbackElement = document.querySelector(`[id="${targetId}"]`);
        if (fallbackElement) {
          lenis.scrollTo(fallbackElement, { offset: 0, duration: 1.2, easing: (t) => t });

        } else {

          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }
    },
    [to]
  );

  useEffect(() => {

    const anchor = anchorRef.current;
    if (anchor) {

      anchor.addEventListener('click', handleClick);
      return () => {
        anchor.removeEventListener('click', handleClick);
      };
    } else {
      console.warn('Anchor not found for:', to);
    }
  }, [to, handleClick]);

  return (
    <a ref={anchorRef} href={to} {...props} onClick={handleClick}>
      {children}
    </a>
  );
}

SmoothLink.defaultProps = {
  to: '#',
};

export default SmoothLink;