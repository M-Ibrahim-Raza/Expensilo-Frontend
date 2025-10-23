"use client";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { useEffect, useRef, useState } from "react";
import { DateRangePicker } from "react-date-range";
import { ChevronDown, ChevronUp, Calendar } from "lucide-react";

export default function DateSelector({ onDateChange }) {
  const [range, setRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [isOpen, setIsOpen] = useState(false);
  const [isFilter, setFilter] = useState(false);

  const dateSelectorRef = useRef(null);

  const handleDateChange = (item) => {
    const newRange = [item.selection];
    setRange(newRange);
  };

  const toggleOpen = () => setIsOpen((prev) => !prev);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        dateSelectorRef.current &&
        !dateSelectorRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleApply = () => {
    onDateChange(range[0].startDate, range[0].endDate);
    toggleOpen();
    setFilter(true);
  };

  const clearFilter = () => {
    setFilter(false);
    onDateChange(null, null);
    toggleOpen();
  };

  return (
    <div
      className="bg-white rounded-2xl shadow p-2 max-w-md min-w-1/4 relative"
      ref={dateSelectorRef}
    >
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
        <div className="card-base absolute -left-96 bg-black mt-4 border-t border-gray-200 p-4 animate-fadeIn">
          <DateRangePicker
            ranges={range}
            className=""
            onChange={handleDateChange}
            moveRangeOnFirstSelection={false}
            months={1}
            direction="vertical"
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
              onClick={handleApply}
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
