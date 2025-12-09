"use client"

import React, { useState, useEffect } from "react";
import SplashScreen from "./splash-screen";

const SPLASH_SESSION_KEY = "dylanli-splash-shown";

interface SplashScreenProviderProps {
  children: React.ReactNode;
}

export default function SplashScreenProvider({ children }: SplashScreenProviderProps) {
  const [showSplash, setShowSplash] = useState<boolean | null>(null);
  const [splashComplete, setSplashComplete] = useState(false);

  useEffect(() => {
    // Check if splash has been shown in this session
    const hasSeenSplash = sessionStorage.getItem(SPLASH_SESSION_KEY);

    if (hasSeenSplash) {
      setShowSplash(false);
      setSplashComplete(true);
    } else {
      setShowSplash(true);
    }
  }, []);

  const handleSplashComplete = () => {
    sessionStorage.setItem(SPLASH_SESSION_KEY, "true");
    setSplashComplete(true);
    setShowSplash(false);
  };

  // Don't render anything until we've checked sessionStorage
  if (showSplash === null) {
    return (
      <div className="fixed inset-0 z-[99999] bg-black" />
    );
  }

  return (
    <>
      {showSplash && <SplashScreen onComplete={handleSplashComplete} />}
      <div
        className={`flex flex-col flex-1 w-full transition-opacity duration-500 ${
          splashComplete ? "opacity-100" : "opacity-0"
        }`}
      >
        {children}
      </div>
    </>
  );
}
