"use client";
import { useState, useRef, useEffect } from "react";
import { downloadCSV, downloadPDF } from "@/utils/transaction";

export default function ExportDropdown({ transactions }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleDownloadCSV = async () => {
    await downloadCSV(transactions);
    setIsOpen(false);
  };

  const handleDownloadPDF = async () => {
    await downloadPDF(transactions);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-center" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        type="button"
        className="text-white bg-theme-turquoise-3 w-28 hover:bg-theme-turquoise-2
               focus:ring-4 focus:outline-none focus:ring-theme-turquoise-1
               font-medium rounded-xl text-sm px-5 py-2.5 text-center inline-flex items-center
               transition-all duration-200 shadow-sm"
      >
        Export
        <svg
          className="w-3 h-3 ms-2 mt-0.5"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 4 4 4-4"
          />
        </svg>
      </button>

      {isOpen && (
        <div
          className="absolute right-0 z-10 mt-2 w-28 origin-top-right rounded-xl
                 bg-theme-turquoise-0 shadow-lg ring-1 ring-theme-turquoise-1
                 divide-y divide-theme-turquoise-1 transition-all duration-150"
        >
          <ul
            className="py-2 text-sm text-theme-blue-2"
            aria-labelledby="dropdownButton"
          >
            <li>
              <button
                className="block w-full text-left px-4 py-2 hover:bg-theme-turquoise-1
                       hover:text-theme-green-3 transition-colors duration-150"
                onClick={handleDownloadCSV}
              >
                CSV
              </button>
            </li>
            <li>
              <button
                className="block w-full text-left px-4 py-2 hover:bg-theme-turquoise-1
                       hover:text-theme-green-3 transition-colors duration-150"
                onClick={handleDownloadPDF}
              >
                PDF
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
