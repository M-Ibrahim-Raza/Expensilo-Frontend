"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Home,
  ChartNoAxesColumnIncreasing,
  WalletMinimal,
  UserRound,
  Plus,
} from "lucide-react";

import { Button } from "../../ui/button";
import { logout } from "@/api/auth";

import { getTotalBalance } from "@/utils/transaction";
import { useTransactions } from "@/hooks/useTransactions";
import { useTransactionModel } from "@/hooks/useTransactionModal";
import { useCategories } from "@/hooks/useCategories";

import TransactionDialog from "@/components/mobile/TransactionDialog";

export default function NavBar() {
  const pathname = usePathname();

  const [submitting, setSubmitting] = useState(false);

  const navLinks = [
    { label: "home", href: "/home", icon: Home },
    {
      label: "analytics",
      href: "/analytics",
      icon: ChartNoAxesColumnIncreasing,
    },
    pathname.includes("home") && {
      label: "add expense",
      icon: Plus,
    },
    {
      label: "transactions",
      href: "/transactions",
      icon: WalletMinimal,
    },
    {
      label: "profile",
      href: "/profile",
      icon: UserRound,
    },
  ].filter(Boolean);

  const { transactions, loading, addOrUpdateTransaction } = useTransactions();

  const {
    showModal,
    modalType,
    editingTransaction,
    setShowModal,
    openNewModal,
  } = useTransactionModel();

  const { categories, loadCategories } = useCategories();

  const balance = getTotalBalance(transactions);

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  const handleSubmit = async (values) => {
    setSubmitting(true);
    const payload = {
      ...values,
      amount: parseFloat(values.amount),
      type: modalType,
      attachments: undefined,
    };
    await addOrUpdateTransaction(payload, editingTransaction);
    loadCategories();
    setShowModal(false);
    setSubmitting(false);
  };

  return (
    <>
      <nav className="fixed bottom-0 left-0 w-full h-14 flex justify-around items-center bg-white border-t">
        {navLinks.map((navItem, ind) => {
          const isActive = pathname.includes(navItem.href);
          const Icon = navItem.icon;

          if (navItem.label === "add expense") {
            return (
              <div key={ind} className="relative">
                <Button
                  className="absolute bottom-0 left-1/2 outline-0 -translate-x-1/2 p-8 bg-theme-teal-2 hover:bg-theme-teal-2 rounded-full shadow-lg"
                  variant="default"
                  size="icon-lg"
                  onClick={() => {
                    openNewModal("EXPENSE");
                  }}
                >
                  <Icon className="text-white stroke-4" />
                </Button>
              </div>
            );
          }
          return (
            <Link key={ind} aria-label={navItem.label} href={navItem.href}>
              <Icon
                className={`${
                  isActive
                    ? "text-theme-teal-2 stroke-3 w-6 h-6"
                    : "text-gray-400"
                }`}
              />
            </Link>
          );
        })}
      </nav>
      <TransactionDialog
        open={showModal}
        onOpenChange={setShowModal}
        onSubmit={handleSubmit}
        categories={categories}
        modalType={modalType}
        balance={balance}
        editingTransaction={editingTransaction}
        submitting={submitting}
      />
    </>
  );
}
