"use client";
import { useState } from "react";
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { ChevronDown, ChevronUp, Calendar } from "lucide-react";

export default function DateSelector({ onDateChange, fetchTransactions }) {
  const [isOpen, setIsOpen] = useState(false);
  const [range, setRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const [isFilter, setFilter] = useState(false);

  const toggleOpen = () => setIsOpen((prev) => !prev);

  const handleSelect = () => {
    onDateChange(range[0].startDate, range[0].endDate);
    toggleOpen();
    setFilter(true);
  };

  const clearFilter = () => {
    setFilter(false);
    fetchTransactions();
    toggleOpen();
  };

  const handleDateChange = (item) => {
    const newRange = [item.selection];
    setRange(newRange);
  };

  return (
    <div className="bg-white rounded-2xl shadow p-2 max-w-md min-w-1/4 relative">
      {/* Header */}
      <button
        onClick={toggleOpen}
        className="w-full flex items-center justify-between px-2 py-1 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
      >
        <div className="flex items-center justify-center gap-2">
          <Calendar className="text-gray-600" />
          {isFilter ? (
            <span className="font-medium text-gray-700">
              {range[0].startDate.toDateString()} —{" "}
              {range[0].endDate.toDateString()}
            </span>
          ) : (
            <span className="font-medium text-gray-700">Select Period</span>
          )}
        </div>
        {isOpen ? (
          <ChevronUp className="text-gray-500" />
        ) : (
          <ChevronDown className="text-gray-500" />
        )}
      </button>

      {/* Collapsible Content */}
      {isOpen && (
        <div className="absolute w-full p-4 bg-white mt-4 border-t border-gray-200 pt-4 animate-fadeIn">
          <DateRangePicker
            ranges={range}
            onChange={handleDateChange}
            moveRangeOnFirstSelection={false}
            months={1}
            direction="horizontal"
          />
          <div className="flex text-right mt-2 space-x-2 justify-end">
            <button
              onClick={clearFilter}
              disabled={!isFilter}
              className={`px-5 py-2 text-sm font-semibold rounded-lg transition 
    ${
      isFilter
        ? "bg-blue-600 text-white hover:bg-blue-700"
        : "bg-gray-300 text-gray-500 cursor-not-allowed"
    }`}
            >
              Clear
            </button>
            <button
              onClick={handleSelect}
              className="px-4 py-2 text-sm font-semibold bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Apply
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
