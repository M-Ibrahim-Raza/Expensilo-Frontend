"use client";

import { useState } from "react";

import Link from "next/link";

import { useTransactions } from "@/hooks/useTransactions";
import { useCategories } from "@/hooks/useCategories";
import { useTransactionModel } from "@/hooks/useTransactionModal";
import { useViewTransactionModal } from "@/hooks/useViewTransactionModal";
import { useDate } from "@/hooks/useDate";

import { LineChart } from "@mui/x-charts";

import { downloadCSV, downloadPDF } from "@/api/transaction";

import { ChevronLeft, Download, Table, File } from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  getTotalBalance,
  getExpenses,
  getIncome,
  isSameDate,
} from "@/utils/transaction";

import AnalyticsTransactionSection from "@/components/mobile/AnalyticsTransactionSection";

import TransactionDialog from "@/components/mobile/TransactionDialog";
import ViewTransactionDialog from "@/components/mobile/ViewTransactionDialog";

import { getLineChartSummary } from "@/utils/charts";

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

export default function AnalyticsPage() {
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

  const { showViewModal, transaction, setShowViewModal, openViewModal } =
    useViewTransactionModal();

  const [openExportDialog, openExportDialogChange] = useState(false);

  const { categories, loadCategories } = useCategories();

  const { dateRange, setDateRange, filteredTransactions } =
    useDate(transactions);

  const [transactionType, setTransactionType] = useState("Expense");

  const transactionsFilter =
    transactionType === "Expense" ? getExpenses : getIncome;

  const [submitting, setSubmitting] = useState(false);

  const balance = getTotalBalance(transactions);

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

  const today = new Date();

  const options = [
    {
      label: "Day",
      value: "day",
      start: new Date(today),
      end: new Date(today),
    },
    {
      label: "Week",
      value: "week",
      start: new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000),
      end: new Date(today),
    },
    {
      label: "Month",
      value: "month",
      start: new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000),
      end: new Date(today),
    },
    {
      label: "Year",
      value: "year",
      start: new Date(today.getTime() - 365 * 24 * 60 * 60 * 1000),
      end: new Date(today),
    },
  ];

  const [lineChartSummaryDuration, setLineChartSummaryDuration] =
    useState("Monthly");

  return (
    <>
      <main className="min-h-screen mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-2 bg-theme-neutral-gray">
        <div className="flex text-black font-semibold justify-between items-center">
          <div>
            <Link href="/home">
              <Button variant="ghost" size="icon">
                <ChevronLeft className="!h-5 !w-5" />
              </Button>
            </Link>
          </div>
          <div>Analytics</div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => openExportDialogChange((prev) => !prev)}
          >
            <Download className="!h-5 !w-5" />
          </Button>
        </div>
        <div className="flex gap-3 justify-around px-2">
          {options.map((option) => (
            <Button
              key={option.value}
              className={`border-0 font-normal !py-1 text-xs ${
                isSameDate(dateRange.start, option.start)
                  ? "bg-theme-teal-2"
                  : "text-gray-600"
              }`}
              size="sm"
              variant={
                isSameDate(dateRange.start, option.start) ? "default" : "ghost"
              }
              onClick={() => setDateRange(option.start, option.end)}
            >
              {option.label}
            </Button>
          ))}
        </div>
        <div className="flex h-40">
          <LineChart
            height={undefined}
            margin={{ right: 50 }}
            xAxis={[
              {
                dataKey: "label",
                label: null,
                scaleType: "point",
              },
            ]}
            series={[
              {
                dataKey: "expense",
                label: "Expense",
                color: "#e11d48",
              },
            ]}
            yAxis={[
              {
                label: null,
                width: 75,
              },
            ]}
            sx={{
              ".MuiLineElement-root": { strokeWidth: 4 },
              ".MuiChartsLegend-root": { mt: 2 },
            }}
            dataset={getLineChartSummary(
              filteredTransactions,
              lineChartSummaryDuration
            )}
          />
        </div>

        <AnalyticsTransactionSection
          transactionType={transactionType}
          transactions={transactionsFilter(filteredTransactions)}
          loading={loading}
          openNewModal={openNewModal}
          openViewModal={openViewModal}
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

      <Dialog open={openExportDialog} onOpenChange={openExportDialogChange}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-center">
              Export {transactionType}
            </DialogTitle>
          </DialogHeader>
          <div className="flex justify-center gap-4">
            <Button
              className="bg-theme-teal-2"
              size="default"
              variant="default"
              onClick={async () =>
                downloadCSV(transactionsFilter(filteredTransactions))
              }
            >
              Export CSV <Table />
            </Button>
            <Button
              className="bg-theme-teal-2"
              size="default"
              variant="default"
              onClick={async () =>
                downloadPDF(transactionsFilter(filteredTransactions))
              }
            >
              Export PDF <File />
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
