"use client";

import { useEffect } from 'react';

export default function SpaceBodyBackground() {
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.pageYOffset;
      document.body.style.setProperty('--scroll-offset', scrolled.toString());
    };
    
    // Use requestAnimationFrame for smoother performance
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };
    
    window.addEventListener('scroll', onScroll, { passive: true });
    handleScroll();
    
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return null;
}