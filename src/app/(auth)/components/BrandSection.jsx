"use client";

import React from "react";
import { Wallet } from "lucide-react";

export default function BrandSection() {
  return (
    <div className="text-center mb-8">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4 bg-theme-blue-2">
        <Wallet className="w-8 h-8 text-theme-turquoise-1" />
      </div>
      <h1 className="text-4xl font-bold mb-2 text-theme-blue-2">Expensilo</h1>
      <p className="text-lg text-theme-blue-1">
        Start managing your expenses smartly
      </p>
    </div>
  );
}
