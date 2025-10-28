"use client";
import { useState } from "react";
import { Wallet, LogOut, User, Settings, Menu, X } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";

export default function NavBar() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <nav className="sticky top-0 z-50 bg-theme-forest-dark shadow-lg">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Brand */}
          <Link href="/home">
            <div className="flex items-center space-x-2">
              <Wallet className="w-8 h-8 text-theme-turquoise-0" />
              <span className="text-2xl font-bold text-white">Expensilo</span>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="link" size="lg">
              <Link href="/home" className="text-white text-base">
                Home
              </Link>
            </Button>
            <Button variant="link" size="lg">
              <Link href="/expenses" className="text-white text-base">
                Expenses
              </Link>
            </Button>
            <Button variant="link" size="lg">
              <Link href="/income" className="text-white text-base">
                Income
              </Link>
            </Button>
            {/* <a
              href="#analytics"
              className="text-white hover:text-theme-turquoise-0 transition"
            >
              Analytics
            </a> */}

            {/* Profile Dropdown */}
            <Button variant="outline" size="icon-lg" className="rounded-full">
              <User className="!w-6 !h-6"/>
            </Button>

            <div className="relative">
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="w-10 h-10 rounded-full bg-theme-turquoise-0 flex items-center justify-center hover:ring-2 hover:ring-white transition"
              >
                <User className="w-6 h-6 text-theme-blue-2" />
              </button>

              {showDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl py-2">
                  <button className="w-full px-4 py-2 text-left hover:bg-theme-turquoise-1 flex items-center space-x-2">
                    <User className="w-4 h-4" />
                    <span>Profile</span>
                  </button>
                  <button className="w-full px-4 py-2 text-left hover:bg-theme-turquoise-1 flex items-center space-x-2">
                    <Settings className="w-4 h-4" />
                    <span>Settings</span>
                  </button>
                  <button
                    onClick={handleLogout}
                    className="w-full px-4 py-2 text-left hover:bg-theme-turquoise-1 flex items-center space-x-2 text-red-600"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            className="md:hidden text-white"
          >
            {showMobileMenu ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {showMobileMenu && (
          <div className="md:hidden pb-4 space-y-2">
            <a
              href="#expenses"
              className="block text-white hover:text-theme-turquoise-0 py-2"
            >
              Expenses
            </a>
            <a
              href="#income"
              className="block text-white hover:text-theme-turquoise-0 py-2"
            >
              Income
            </a>
            <a
              href="#analytics"
              className="block text-white hover:text-theme-turquoise-0 py-2"
            >
              Analytics
            </a>
            <button className="w-full text-left text-white hover:text-theme-turquoise-0 py-2">
              Profile
            </button>
            <button className="w-full text-left text-white hover:text-theme-turquoise-0 py-2">
              Settings
            </button>
            <button
              onClick={handleLogout}
              className="w-full text-left text-red-300 hover:text-red-200 py-2"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
