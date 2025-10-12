"use client";

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
}) {
  if (!showModal) return null;

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
            <input
              id="amount"
              type="number"
              step="0.01"
              value={formData.amount}
              onChange={(e) =>
                setFormData({ ...formData, amount: e.target.value })
              }
              className="w-full px-4 py-3 rounded-xl border-2 border-theme-turquoise-1 bg-white focus:outline-none focus:ring-2 focus:ring-theme-turquoise-2 transition-all"
              placeholder="0.00"
            />
          </div>
          <div>
            <label
              htmlFor="category"
              className="block text-sm font-medium text-theme-blue-2 mb-1"
            >
              Category
            </label>
            <input
              list="category-options"
              id="category"
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
              className="w-full px-4 py-3 rounded-xl border-2 border-theme-turquoise-1 bg-white focus:outline-none focus:ring-2 focus:ring-theme-turquoise-2 transition-all"
              placeholder="Select or type a category"
            />
            <datalist id="category-options">
              {categories.map((cat) => (
                <option key={cat.id} value={cat.name} />
              ))}
            </datalist>
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
              disabled={submitting || !formData.title || !formData.amount}
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
