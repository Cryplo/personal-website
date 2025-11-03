"use client";

import { useEffect } from 'react';

export default function SpaceBodyBackground() {
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.pageYOffset;
      document.body.style.setProperty('--scroll-offset', scrolled);
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
 useEffect(() => {
    const stars = [];
    const starCount = 100; // Number of twinkling stars
    
    // Create stars
    for (let i = 0; i < starCount; i++) {
      const star = document.createElement('div');
      star.className = 'twinkling-star';
      
      // Random position
      star.style.top = `${Math.random() * 100}%`;
      star.style.left = `${Math.random() * 100}%`;
      
      // Random size (1-3px)
      const size = 1 + Math.random() * 2;
      star.style.width = `${size}px`;
      star.style.height = `${size}px`;
      
      // Random animation
      const animations = ['twinkle-random', 'twinkle-random-2', 'twinkle-random-3'];
      const animation = animations[Math.floor(Math.random() * animations.length)];
      const duration = 2 + Math.random() * 3; // 2-5 seconds
      const delay = Math.random() * 3; // 0-3 second delay
      
      star.style.animation = `${animation} ${duration}s ease-in-out ${delay}s infinite`;
      
      document.body.appendChild(star);
      stars.push(star);
    }
    
    // Cleanup function
    return () => {
      stars.forEach(star => star.remove());
    };
  }, []);
  return null;
}