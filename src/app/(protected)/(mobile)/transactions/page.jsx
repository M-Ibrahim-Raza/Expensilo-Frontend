"use client";

import { useState } from "react";

import Link from "next/link";

import { useTransactions } from "@/hooks/useTransactions";
import { useCategories } from "@/hooks/useCategories";
import { useTransactionModel } from "@/hooks/useTransactionModal";
import { useViewTransactionModal } from "@/hooks/useViewTransactionModal";

import { ChevronLeft, Search, ChevronDown, Eraser } from "lucide-react";

import { Input } from "@/components/ui/input";

import { Button } from "@/components/ui/button";
import { BanknoteArrowUp, BanknoteArrowDown } from "lucide-react";

import { getTotalBalance } from "@/utils/transaction";

import TransactionSection from "@/components/mobile/TransactionSection";

import TransactionDialog from "@/components/mobile/TransactionDialog";
import ViewTransactionDialog from "@/components/mobile/ViewTransactionDialog";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function TransactionPage() {
  const {
    transactions,
    loading,
    setTransactions,
    loadTransactions,
    addOrUpdateTransaction,
    handleDeleteTransaction,
  } = useTransactions();

  const {
    showModal,
    modalType,
    editingTransaction,
    setShowModal,
    openNewModal,
    openEditModal,
  } = useTransactionModel();

  console.log(transactions);

  const { showViewModal, transaction, setShowViewModal, openViewModal } =
    useViewTransactionModal();

  const { categories, loadCategories } = useCategories();

  const [submitting, setSubmitting] = useState(false);

  const [openSearchDialog, openSearchDialogChange] = useState(false);

  const [searchOption, setSearchOption] = useState("Title");
  const [searchValue, setSearchValue] = useState("");

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

  const balance = getTotalBalance(transactions);

  return (
    <>
      <div className="flex bg-theme-teal-1 h-16 text-white font-semibold justify-between px-4 py-4 items-center">
        <div>
          <Link href="/home">
            <Button variant="ghost" size="icon">
              <ChevronLeft className="!h-5 !w-5" />
            </Button>
          </Link>
        </div>
        <div>Transactions</div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => openSearchDialogChange((prev) => !prev)}
        >
          <Search className="!h-5 !w-5" />
        </Button>
      </div>
      <main className="min-h-screen mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-2 rounded-t-3xl bg-theme-neutral-gray">
        <div className="flex justify-center">
          <div className="flex gap-2">
            <>
              <Button
                onClick={() => openNewModal("INCOME")}
                variant="default"
                size="lg"
                className="bg-theme-teal hover:bg-theme-teal/90"
              >
                <BanknoteArrowUp />
                Add Income
              </Button>

              <Button
                onClick={() => openNewModal("EXPENSE")}
                variant="default"
                size="lg"
                className="bg-theme-rose hover:bg-theme-rose/90"
              >
                <BanknoteArrowDown />
                Add Expense
              </Button>
            </>
          </div>
        </div>

        <TransactionSection
          transactions={transactions}
          loading={loading}
          openNewModal={openNewModal}
          openViewModal={openViewModal}
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          searchOption={searchOption}
        />
      </main>

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

      <ViewTransactionDialog
        open={showViewModal}
        onOpenChange={setShowViewModal}
        modalType={modalType}
        transaction={transaction}
        handleDelete={handleDeleteTransaction}
        handleEdit={openEditModal}
      />

      <Dialog open={openSearchDialog} onOpenChange={openSearchDialogChange}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-center">
              Search Transactions
            </DialogTitle>
          </DialogHeader>
          <div className="flex flex-row gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  {searchOption} <ChevronDown />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="bottom"
                align="start"
                className="[--radius:0.95rem]"
              >
                <DropdownMenuItem
                  onSelect={() => {
                    setSearchOption("Title");
                  }}
                >
                  Title
                </DropdownMenuItem>
                <DropdownMenuItem
                  onSelect={() => {
                    setSearchOption("Category");
                  }}
                >
                  Category
                </DropdownMenuItem>
                <DropdownMenuItem
                  onSelect={() => {
                    setSearchOption("Amount");
                  }}
                >
                  Amount
                </DropdownMenuItem>
                <DropdownMenuItem
                  onSelect={() => {
                    setSearchOption("Details");
                  }}
                >
                  Details
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Input
              id="search"
              type="text"
              value={searchValue}
              placeholder="Search..."
              maxLength={15}
              onChange={(e) => {
                setSearchValue(e.target.value);
              }}
            />
          </div>
          <DialogFooter className="flex flex-row justify-center">
            <DialogClose asChild>
              <Button
                variant="destructive"
                size="default"
                onClick={() => setSearchValue("")}
              >
                <Eraser /> Clear
              </Button>
            </DialogClose>
            <DialogClose asChild>
              <Button
                className="bg-theme-teal-2"
                variant="default"
                size="default"
              >
                <Search /> Search
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
