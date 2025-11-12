"use client";

import NavBar from "@/components/web/layouts/NavBar";

export default function ProtectedLayout({ children }) {
  return (
    <>
      <NavBar />
      {children}
    </>
  );
}
