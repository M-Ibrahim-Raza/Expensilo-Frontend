"use client";

import { Plus } from "lucide-react";

export default function AddIncomeButton({ openModal }) {
  return (
    <button
      onClick={() => openModal("INCOME")}
      className="relative flex-1 bg-gradient-to-r from-theme-blue-1 to-theme-green-3 text-white font-semibold py-4 px-4 mx-2 rounded-2xl shadow-md flex items-center justify-center space-x-2 transition-all duration-300 hover:shadow-red-400/40 hover:-translate-y-1 hover:scale-[1.03]"
    >
      <span className="absolute inset-0 bg-white/10 opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-2xl"></span>

      <Plus className="w-6 h-6 z-10" />
      <span className="text-lg z-10 tracking-wide">Add Income</span>
    </button>
  );
}
