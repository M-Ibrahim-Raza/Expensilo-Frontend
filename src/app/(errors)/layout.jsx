"use client";

import React from "react";

export default function AuthLayout({ children }) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-theme-turquoise-1 to-theme-turquoise-2">
      {children}
    </div>
  );
}
