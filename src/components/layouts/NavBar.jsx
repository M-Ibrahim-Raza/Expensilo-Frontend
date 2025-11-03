"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Wallet, LogOut, User, Settings, Menu, X } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";
import { logout } from "@/api/auth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function NavBar() {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/login");
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
          <div className="hidden md:flex items-center">
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
            <Button variant="link" size="lg">
              <Link href="/analytics" className="text-white text-base">
                Analytics
              </Link>
            </Button>

            {/* Profile Dropdown */}
            <DropdownMenu modal={false}>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="icon-lg"
                  className="rounded-full"
                >
                  <User className="!w-6 !h-6" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <User />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuItem variant="destructive" onClick={handleLogout}>
                  <LogOut />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
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
          <div className="md:hidden flex flex-col items-start pb-4 space-y-2">
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
            <Button variant="link" size="lg">
              <Link href="/income" className="text-white text-base">
                Analytics
              </Link>
            </Button>
            <Button variant="link" size="lg">
              <Link href="/income" className="text-white text-base">
                Profile
              </Link>
            </Button>
            <Button variant="link" size="lg">
              <Link href="/income" className="text-white text-base">
                Settings
              </Link>
            </Button>
            <Button onClick={handleLogout} variant="link" size="lg">
              <Link href="/income" className="text-white text-base">
                Logout
              </Link>
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
}
