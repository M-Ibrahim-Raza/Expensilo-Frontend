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
      className={`p-4 rounded-lg border-l-4 ${
        isExpense
          ? "border-theme-red-3 bg-theme-red-1/10 outline-1 outline-theme-red-1/30"
          : "border-theme-green-3 bg-theme-turquoise-1/20 outline-1 outline-theme-turquoise-1"
      } flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4`}
    >
      <div className="flex-1">
        {/* Title and Category */}
        <div className="flex items-center space-x-2 mb-1">
          <h3 className="font-semibold text-lg text-gray-800">
            {transaction.title}
          </h3>
          {transaction.category && (
            <span className="px-2 py-1 bg-theme-blue-2 text-white text-xs rounded-full">
              {transaction.category}
            </span>
          )}
        </div>

        {/* Amount */}
        <p
          className={`text-2xl font-bold ${
            isExpense ? "text-theme-red-3" : "text-theme-green-3"
          }`}
        >
          {isExpense ? "-" : "+"}Rs. {parseFloat(transaction.amount)}
        </p>

        {/* Details */}
        {transaction.details && (
          <p className="text-gray-600 text-sm mt-1">{transaction.details}</p>
        )}

        {/* Date */}
        <p className="text-gray-400 text-xs mt-1">
          {new Date(transaction.created_at).toLocaleDateString()}
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-2">
        <button
          onClick={() => openEditModal(transaction)}
          className="p-2 bg-theme-turquoise-3 hover:bg-theme-turquoise-2 text-white rounded-lg transition"
        >
          <Edit className="w-5 h-5" />
        </button>
        <button
          onClick={() => handleDelete(transaction.id)}
          className="p-2 bg-theme-red-2 hover:bg-theme-red-1 text-white rounded-lg transition"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
