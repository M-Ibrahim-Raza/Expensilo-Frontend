"use client";

import ProtectedRoute from "@/components/auth/ProtectedRoute";
import NavBar from "@/components/layout/NavBar";

export default function ProtectedLayout({ children }) {
  return (
    <div className="min-h-260 bg-gradient-to-br from-theme-turquoise-1 to-green-50">
      <ProtectedRoute>
        <NavBar />
        {children}
      </ProtectedRoute>
    </div>
  );
}
