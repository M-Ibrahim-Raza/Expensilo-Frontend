"use client";

import ProtectedRoute from "@/components/auth/ProtectedRoute";
import NavBar from "@/components/layouts/NavBar";

export default function ProtectedLayout({ children }) {
  return (
    <div className="min-h-screen bg-theme-neutral-gray">
      <NavBar />
      <ProtectedRoute>{children}</ProtectedRoute>
    </div>
  );
}
