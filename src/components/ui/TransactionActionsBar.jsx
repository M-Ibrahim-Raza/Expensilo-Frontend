"use client";

import {
  BanknoteArrowUp,
  BanknoteArrowDown,
  Download,
  Table,
  File,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

import { downloadCSV, downloadPDF } from "@/api/transaction";

export default function TransactionActionsBar({
  className,
  transactions,
  openNewModal,
}) {
  return (
    <>
      <div className={`flex justify-between ${className}`}>
        <div className="flex gap-2">
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
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="default"
              size="lg"
              className="bg-theme-forest-dark hover:bg-theme-forest-dark/90"
            >
              <Download />
              Export
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-32" align="end">
            <DropdownMenuItem onClick={async () => downloadCSV(transactions)}>
              <Table />
              CSV
            </DropdownMenuItem>
            <DropdownMenuItem onClick={async () => downloadPDF(transactions)}>
              <File />
              PDF
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </>
  );
}
