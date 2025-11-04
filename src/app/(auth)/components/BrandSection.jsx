"use client";

import React from "react";
import { Wallet } from "lucide-react";

export default function BrandSection() {
  return (
    <div className="text-center mb-8">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4 bg-theme-forest-dark">
        <Wallet className="w-8 h-8 text-white" />
      </div>
      <h1 className="text-4xl font-bold mb-2">Expensilo</h1>
      <p className="text-lg">
        Start managing your expenses smartly
      </p>
    </div>
  );
}
