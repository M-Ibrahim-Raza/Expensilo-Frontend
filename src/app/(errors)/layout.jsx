"use client";

import React from "react";

export default function AuthLayout({ children }) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-theme-neutral-gray">
      {children}
    </div>
  );
}
