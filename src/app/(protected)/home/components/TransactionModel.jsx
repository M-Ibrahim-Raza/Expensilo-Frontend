"use client";

import CreatableSelect from "react-select/creatable";

import { useState } from "react";
export default function TransactionModal({
  showModal,
  setShowModal,
  modalType,
  formData,
  setFormData,
  handleSubmit,
  submitting,
  editingTransaction,
  categories,
  balance,
}) {
  if (!showModal) return null;

  const [isFuture, setIsFuture] = useState(false);

  const [isBalanceNegative, setIsBalanceNegative] = useState(false);

  const [options, setOptions] = useState(
    categories.map((category) => ({
      value: category.name,
      label: category.name,
    }))
  );

  const isExpense = modalType === "EXPENSE";
  const headerColor = isExpense ? "bg-theme-red-2" : "bg-theme-turquoise-3";

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto transform transition-all duration-300 scale-100">
        {/* Header */}
        <div
          className={`p-6 ${headerColor} text-white rounded-t-2xl shadow-md flex items-center justify-center`}
        >
          <h2 className="text-2xl font-bold tracking-wide uppercase">
            {editingTransaction ? "Edit" : "Add"}{" "}
            {isExpense ? "Expense" : "Income"}
          </h2>
        </div>

        {/* Body */}
        <div className="p-6 space-y-5 bg-theme-turquoise-0">
          {/* Title */}
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-theme-blue-2 mb-1"
            >
              Title *
            </label>
            <input
              id="title"
              type="text"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className="w-full px-4 py-3 rounded-xl border-2 border-theme-turquoise-1 bg-white focus:outline-none focus:ring-2 focus:ring-theme-turquoise-2 transition-all"
              placeholder="Enter title"
            />
          </div>

          {/* Amount */}
          <div>
            <label
              htmlFor="amount"
              className="block text-sm font-medium text-theme-blue-2 mb-1"
            >
              Amount *
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                Rs.
              </span>
              <input
                id="amount"
                type="number"
                step="0.01"
                min="0"
                value={formData.amount}
                onChange={(e) => {
                  let value = e.target.value.replace(/[^\d.]/g, "");

                  const parts = value.split(".");
                  if (parts.length > 2) return;

                  const integerPart = parts[0].slice(0, 8);
                  const decimalPart = parts[1]?.slice(0, 2);
                  value = decimalPart
                    ? `${integerPart}.${decimalPart}`
                    : integerPart;
                  if (value === "" || Number(value) >= 0) {
                    if (modalType === "EXPENSE") {
                      if (!(balance < 0)) {
                        if (editingTransaction) {
                          setIsBalanceNegative(
                            Number(value) >
                              balance + Number(editingTransaction.amount)
                          );
                        } else {
                          setIsBalanceNegative(Number(value) > balance);
                        }
                      } else {
                        setIsBalanceNegative(false);
                      }
                    }
                    setFormData({ ...formData, amount: value });
                  }
                }}
                className="w-full px-4 py-3 pl-10 rounded-xl border-2 border-theme-turquoise-1 bg-white focus:outline-none focus:ring-2 focus:ring-theme-turquoise-2 transition-all"
                placeholder="0.00"
              />
            </div>
            {isBalanceNegative && (
              <div className="p-3 mb-2 mt-2 rounded-xl text-sm bg-yellow-50 text-red-600">
                ⚠︎ Amount exceeds available balance. Please double-check.
              </div>
            )}
          </div>

          {/* Category */}
          <div>
            <label
              htmlFor="category"
              className="block text-sm font-medium text-theme-blue-2 mb-1"
            >
              Category *
            </label>

            <CreatableSelect
              options={options}
              isClearable
              isSearchable
              placeholder="Select or type a category"
              value={
                options.find((opt) => opt.value === formData.category) || null
              }
              onChange={(option) =>
                setFormData({
                  ...formData,
                  category: option ? option.value : "",
                })
              }
              onCreateOption={(inputValue) => {
                const newOption = { value: inputValue, label: inputValue };
                setOptions((prev) => [...prev, newOption]);
                setFormData({ ...formData, category: inputValue });
              }}
              classNames={{
                control: ({ isFocused }) =>
                  `w-full px-2 py-1.5 rounded-xl border-2 border-theme-turquoise-1 bg-white transition-all ${
                    isFocused
                      ? "outline-none ring-2 ring-theme-turquoise-2 border-theme-turquoise-2"
                      : "border-theme-turquoise-1"
                  }`,
                placeholder: () => "text-gray-400 px-1",
                singleValue: () => "text-gray-800 px-1",
                menu: () =>
                  "mt-1 border border-gray-200 rounded-xl shadow-lg bg-white z-50",
                option: ({ isFocused, isSelected }) =>
                  `cursor-pointer px-3 py-2 rounded-lg ${
                    isSelected
                      ? "bg-theme-turquoise-2 text-white"
                      : isFocused
                      ? "bg-theme-turquoise-1/10"
                      : "bg-white text-gray-800"
                  }`,
                input: () => "text-gray-800",
              }}
              theme={(theme) => ({
                ...theme,
                colors: {
                  ...theme.colors,
                  primary25: "rgba(0, 150, 136, 0.1)",
                  primary: "var(--theme-turquoise-2)",
                },
              })}
            />
          </div>

          {/* Date */}
          <div>
            <label
              htmlFor="created_at"
              className="block text-sm font-medium text-theme-blue-2 mb-1"
            >
              Date
            </label>
            <input
              id="created_at"
              type="date"
              value={formData.created_at || ""}
              onChange={(e) => {
                const selectedDate = new Date(e.target.value);
                setIsFuture(selectedDate > new Date());
                return setFormData({ ...formData, created_at: e.target.value });
              }}
              className="w-full px-4 py-3 rounded-xl border-2 border-theme-turquoise-1 bg-white focus:outline-none focus:ring-2 focus:ring-theme-turquoise-2 transition-all"
            />
            {isFuture && (
              <div className="p-3 mb-2 mt-2 rounded-xl text-sm bg-yellow-50 text-red-600">
                ⚠︎ You’ve selected a future date. Please double-check it.
              </div>
            )}
          </div>

          {/* Details */}
          <div>
            <label
              htmlFor="details"
              className="block text-sm font-medium text-theme-blue-2 mb-1"
            >
              Details (Optional)
            </label>
            <textarea
              id="details"
              value={formData.details}
              onChange={(e) =>
                setFormData({ ...formData, details: e.target.value })
              }
              className="w-full px-4 py-3 rounded-xl border-2 border-theme-turquoise-1 bg-white focus:outline-none focus:ring-2 focus:ring-theme-turquoise-2 transition-all"
              rows={3}
              placeholder="Additional details"
            />
          </div>

          {/* Buttons */}
          <div className="flex space-x-3 pt-2">
            <button
              onClick={() => setShowModal(false)}
              disabled={submitting}
              className="flex-1 px-4 py-3 rounded-xl border-2 border-gray-300 text-gray-700 font-semibold bg-gray-100 hover:bg-gray-200 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>

            <button
              onClick={handleSubmit}
              disabled={
                submitting ||
                !formData.title ||
                !formData.amount ||
                !formData.category
              }
              className={`flex-1 px-4 py-3 rounded-xl font-semibold text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center ${
                isExpense
                  ? "bg-theme-red-2 hover:bg-theme-red-3"
                  : "bg-theme-turquoise-3 hover:bg-theme-green-3"
              }`}
            >
              {submitting ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  {editingTransaction ? "Updating..." : "Adding..."}
                </>
              ) : (
                <>{editingTransaction ? "Update" : "Add"}</>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
