"use client";

import React from "react";

export default function Heading({
  text,
  className = "text-2xl font-bold mb-6 text-center text-theme-blue-2",
}) {
  return <h2 className={className}>{text}</h2>;
}
