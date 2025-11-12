"use client";

import NavBar from "@/components/mobile/layouts/NavBar";

export default function Layout({ children }) {
  return (
    <div className="flex flex-col min-h-screen bg-theme-teal-1">
      {/* <div
        id="background"
        className="-z-0 fixed bg-theme-teal-1 -top-[75%] -left-[50%] h-[100%] w-[200%] rounded-b-full"
      ></div> */}

      <main className="flex-1 pb-14">{children}</main>
      <NavBar />
    </div>
  );
}
