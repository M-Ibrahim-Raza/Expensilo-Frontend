"use client";

import React from "react";

export default function CardHeading({
  text,
  className = "text-2xl font-bold mb-2 text-center text-theme-blue-2",
}) {
  return <h2 className={className}>{text}</h2>;
}
