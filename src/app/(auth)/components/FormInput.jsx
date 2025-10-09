"use client";

import React from "react";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export default function FormInput({
  id,
  label,
  placeholder,
  type = "text",
  inputRef,
  required = false,
  is_password = false,
}) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-medium mb-2 text-theme-blue-2"
      >
        {label}
      </label>

      {is_password ? (
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            id={id}
            name={id}
            ref={inputRef}
            required={required}
            className="w-full px-4 py-3 rounded-xl border-2 border-theme-turquoise-1 bg-theme-turquoise-0 focus:outline-none focus:ring-2 focus:ring-theme-turquoise-2 transition-all"
            placeholder={placeholder}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-theme-blue-1"
          >
            {showPassword ? (
              <EyeOff className="w-5 h-5" />
            ) : (
              <Eye className="w-5 h-5" />
            )}
          </button>
        </div>
      ) : (
        <input
          type={type}
          id={id}
          name={id}
          ref={inputRef}
          required={required}
          className="w-full px-4 py-3 rounded-xl border-2 border-theme-turquoise-1 bg-theme-turquoise-0 focus:outline-none focus:ring-2 focus:ring-theme-turquoise-2 transition-all"
          placeholder={placeholder}
        />
      )}
    </div>
  );
}
