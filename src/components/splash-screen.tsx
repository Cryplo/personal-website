"use client"

import React, { useEffect, useState } from "react";
import Image from "next/image";

interface SplashScreenProps {
  onComplete: () => void;
}

export default function SplashScreen({ onComplete }: SplashScreenProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Start fade out after 2.5 seconds
    const fadeTimer = setTimeout(() => {
      setFadeOut(true);
    }, 3000);

    // Complete and hide after 3 seconds
    const completeTimer = setTimeout(() => {
      setIsVisible(false);
      onComplete();
    }, 3500);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  if (!isVisible) return null;

  return (
    <div
      className={`fixed inset-0 z-[99999] flex flex-col items-center justify-center transition-opacity duration-500 ${
        fadeOut ? "opacity-0" : "opacity-100"
      }`}
      style={{ backgroundColor: "#000000" }}
    >
      {/* Favicon/Logo */}
      <div
        className="relative w-24 h-24 md:w-32 md:h-32"
        style={{
          opacity: 0,
          animation: "fadeIn 1s ease-in-out forwards"
        }}
      >
        <Image
          src="/favicon.ico"
          alt="Dylan Li Logo"
          fill
          className="object-contain"
          priority
        />
      </div>

      {/* Welcome Text */}
      <h1
        className="mt-8 text-xl md:text-2xl font-bold text-white tracking-tight text-center px-4"
        style={{
          opacity: 0,
          animation: "fadeIn 1s ease-in-out 0.3s forwards"
        }}
      >
        Welcome to Dylan Li&apos;s Portfolio
      </h1>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
