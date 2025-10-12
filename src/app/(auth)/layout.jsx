"use client";

import React from "react";
import BrandSection from "./components/BrandSection";

export default function AuthLayout({ children }) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-theme-turquoise-1 to-theme-turquoise-2">
      <div className="w-full max-w-md">
        <BrandSection />
        {children}
      </div>
    </div>
  );
}
