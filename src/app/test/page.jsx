"use client";
import React from "react";

import { ToastContainer, toast } from "react-toastify";

export default function toasta() {
  const notify = () => toast("Wow so easy!");

  return (
    <div>
      <button onClick={notify}>Notify!</button>
      <ToastContainer />
    </div>
  );
}
