"use client";

import ProtectedRoute from "@/components/auth/ProtectedRoute";

export default function Home() {
  return (
    <ProtectedRoute>
      <main className="p-6">
        <h1 className="text-2xl font-bold">Welcome Home</h1>
        <p>You are authenticated.</p>
      </main>
    </ProtectedRoute>
  );
}
