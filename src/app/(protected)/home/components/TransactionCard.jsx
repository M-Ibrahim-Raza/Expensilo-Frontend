"use client";

import { Edit, Trash2 } from "lucide-react";

export default function TransactionCard({
  transaction,
  openEditModal,
  handleDelete,
}) {
  const isExpense = transaction.type === "EXPENSE";

  return (
    <div
      key={transaction.id}
      className={`p-3 rounded-lg border-l-4 ${
        isExpense
          ? "border-theme-red-3 bg-theme-red-1/10 outline-1 outline-theme-red-1/30"
          : "border-theme-green-3 bg-theme-turquoise-1/20 outline-1 outline-theme-turquoise-1"
      } flex items-center justify-between gap-3`}
    >
      {/* Left: Title, Category & Date */}
      <div className="flex items-center gap-3 flex-shrink-0">
        <div className="min-w-0">
          <div className="flex items-center gap-2 mb-0.5">
            <h3 className="font-semibold text-base text-gray-800 truncate">
              {transaction.title}
            </h3>
            {transaction.category && (
              <span className="px-2 py-0.5 bg-theme-blue-2 text-white text-xs rounded-full whitespace-nowrap">
                {transaction.category}
              </span>
            )}
          </div>
          <div className="flex items-center gap-2 text-xs">
            <span className="text-gray-400 whitespace-nowrap">
              {new Date(transaction.created_at).toLocaleDateString()}
            </span>
          </div>
        </div>
      </div>

      {/* Center: Details */}
      <div className="flex-1 min-w-0 px-4">
        {transaction.details && (
          <p className="text-sm text-gray-600 text-center truncate">
            {transaction.details}
          </p>
        )}
      </div>

      {/* Middle: Amount */}
      <div
        className={`text-xl font-bold whitespace-nowrap flex-shrink-0 ${
          isExpense ? "text-theme-red-3" : "text-theme-green-3"
        }`}
      >
        {isExpense ? "- " : "+ "}Rs.{" "}
        {parseFloat(transaction.amount).toLocaleString()}
      </div>

      {/* Right: Action Buttons */}
      <div className="flex gap-2 flex-shrink-0">
        <button
          onClick={() => openEditModal(transaction)}
          className="p-1.5 bg-theme-turquoise-3 hover:bg-theme-turquoise-2 text-white rounded-lg transition"
        >
          <Edit className="w-4 h-4" />
        </button>
        <button
          onClick={() => handleDelete(transaction.id)}
          className="p-1.5 bg-theme-red-2 hover:bg-theme-red-1 text-white rounded-lg transition"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
