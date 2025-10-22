"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { verifyToken } from "@/api/auth";
import { ClipLoader } from "react-spinners";

export default function ProtectedRoute({ children }) {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    let isMounted = true;

    const checkAuth = async () => {
      try {
        await verifyToken();
        if (!isMounted) return;
        setLoading(false);
      } catch (error) {
        if (!isMounted) return;
        router.replace("/login");
      }
    };

    checkAuth();

    return () => {
      isMounted = false;
    };
  }, [router]);

  if (loading) {
    return (
      <div className="flex justify-center items-center inset-0 fixed">
        <ClipLoader color="#006a67" size="60px" />
      </div>
    );
  }

  return <>{children}</>;
}
