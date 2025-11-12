"use client";

import React from "react";
import BrandSection from "@/components/auth/BrandSection";

export default function AuthLayout({ children }) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-theme-neutral-gray">
      <div className="w-full max-w-md">
        <BrandSection />
        {children}
      </div>
    </div>
  );
}
