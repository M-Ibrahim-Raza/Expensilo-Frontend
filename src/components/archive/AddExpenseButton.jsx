"use client";

import { Minus } from "lucide-react";

export default function AddExpenseButton({ openModal }) {
  return (
    <button
      onClick={() => openModal("EXPENSE")}
      className="relative flex-1 bg-gradient-to-r from-theme-red-1 to-theme-red-3 text-white font-semibold py-4 px-4 mx-2 rounded-xl shadow-md flex items-center border-2 border-theme-red-3/50 justify-center space-x-2 transition-all duration-300 hover:shadow-theme-red-1/50 hover:scale-[1.03]"
    >
      <span className="absolute inset-0 bg-white/10 opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-xl scale-[1.02]"></span>

      <Minus className="w-6 h-6 z-10" />
      <span className="text-lg z-10 tracking-wide">Add Expense</span>
    </button>
  );
}
