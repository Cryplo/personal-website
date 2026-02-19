"use client"

import React from "react";

interface SplashScreenProviderProps {
  children: React.ReactNode;
}

export default function SplashScreenProvider({ children }: SplashScreenProviderProps) {
  // Splash screen disabled
  return (
    <div className="flex flex-col flex-1 w-full">
      {children}
    </div>
  );
}
