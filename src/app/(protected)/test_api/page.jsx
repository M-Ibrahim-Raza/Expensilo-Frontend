"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { ChevronDown, Calendar, Coins, ArrowDown, ArrowUp } from "lucide-react";
import { useTransactions } from "@/hooks/useTransactions";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function TestPage() {
  const [sortColumn, setSortColumn] = useState("created_at");
  const [isDescending, setIsDescending] = useState(true);

  return (
    <div className="flex justify-center mt-10">
      <ButtonGroup>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="lg">
              {sortColumn}
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setSortColumn("created_at")}>
              <Calendar />
              Date
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSortColumn("amount")}>
              <Coins />
              Amount
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Button
          variant="outline"
          size="lg"
          onClick={() => setIsDescending((prev) => !prev)}
          aria-label="Toggle sort direction"
        >
          {isDescending ? (
            <>
              Desc <ArrowDown />
            </>
          ) : (
            <>
              Asc <ArrowUp />
            </>
          )}
        </Button>
      </ButtonGroup>
    </div>
  );
}
