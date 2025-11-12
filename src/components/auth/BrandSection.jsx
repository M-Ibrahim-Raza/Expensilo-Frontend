"use client";

import React from "react";
import { Wallet } from "lucide-react";

export default function BrandSection() {
  return (
    <div className="text-center mb-4">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-2 bg-theme-teal-2">
        <Wallet className="w-8 h-8 text-white" />
      </div>
      <h1 className="text-2xl font-bold mb-2 text-theme-teal-2">Expensilo</h1>
      <p className="text-base text-theme-teal-2">
        Start managing your expenses smartly
      </p>
    </div>
  );
}
