"use client";
import { useState } from "react";
import { Search } from "lucide-react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupButton,
} from "@/components/ui/input-group";
import { useTransactions } from "@/hooks/useTransactions";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

export default function test() {
  const [search, setSearch] = useState("Title");

  return (
    <>
      <div className="grid w-full max-w-sm gap-6">
        <InputGroup>
          <InputGroupInput placeholder="Search..." />
          <InputGroupAddon>
            <Search />
          </InputGroupAddon>
          <InputGroupAddon align="inline-end">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <InputGroupButton variant="outline">{search}</InputGroupButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="bottom"
                align="start"
                className="[--radius:0.95rem]"
              >
                <DropdownMenuItem
                  onSelect={() => {
                    setSearch("Title");
                  }}
                >
                  Title
                </DropdownMenuItem>
                <DropdownMenuItem
                  onSelect={() => {
                    setSearch("Category");
                  }}
                >
                  Category
                </DropdownMenuItem>
                <DropdownMenuItem
                  onSelect={() => {
                    setSearch("Amount");
                  }}
                >
                  Amount
                </DropdownMenuItem>
                <DropdownMenuItem
                  onSelect={() => {
                    setSearch("Details");
                  }}
                >
                  Details
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </InputGroupAddon>
        </InputGroup>
      </div>
    </>
  );
}
