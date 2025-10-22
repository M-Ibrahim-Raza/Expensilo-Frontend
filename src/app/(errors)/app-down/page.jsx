"use client";

import { useRouter } from "next/navigation";
import { AlertCircle, RefreshCw } from "lucide-react";

export default function AppDown() {
  const router = useRouter();

  const handleRefresh = () => {
    router.push("/home");
  };

  return (
    <div className="bg-white rounded-lg shadow-xl p-8 text-center">
      <div className="flex justify-center mb-6">
        <div className="bg-red-100 p-4 rounded-full">
          <AlertCircle className="w-12 h-12 text-red-600" />
        </div>
      </div>

      <h1 className="text-3xl font-bold text-gray-900 mb-3">
        Server Maintenance
      </h1>

      <p className="text-gray-600 mb-2">
        We're currently performing scheduled maintenance on our servers.
      </p>
      <p className="text-gray-500 text-sm mb-8">
        We'll be back online shortly. Thank you for your patience!
      </p>

      <div className="bg-gray-50 rounded-lg p-4 mb-8">
        <div className="flex items-center justify-center gap-2">
          <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
          <span className="text-sm text-gray-600">
            Status: Under Maintenance
          </span>
        </div>
      </div>

      <button
        onClick={handleRefresh}
        className="w-full hover:shadow-lg hover:bg-theme-blue-2/95 bg-theme-blue-2 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
      >
        <RefreshCw className="w-5 h-5" />
        Try Again
      </button>

      <p className="text-xs text-gray-500 mt-6">
        If the problem persists, please contact our support team at{" "}
        <a
          href="mailto:support@example.com"
          className="text-indigo-600 hover:underline"
        >
          muhammad.ebrahim@devsinc.com
        </a>
      </p>
    </div>
  );
}
