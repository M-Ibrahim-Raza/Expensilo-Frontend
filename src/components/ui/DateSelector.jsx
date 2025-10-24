"use client";

import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { useState } from "react";
import { DateRangePicker } from "react-date-range";
import { ChevronDown, ChevronUp, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";

export default function DateSelector({ onDateChange }) {
  const [range, setRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const [open, setOpen] = useState(false);

  const [isFilter, setFilter] = useState(false);

  const handleDateChange = (item) => {
    const newRange = [item.selection];
    setRange(newRange);
  };

  const handleApply = () => {
    onDateChange(range[0].startDate, range[0].endDate);
    setFilter(true);
  };

  const clearFilter = () => {
    setFilter(false);
    onDateChange(null, null);
  };

  return (
    <DropdownMenu modal={false} open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="lg">
          <div className="flex items-center justify-center gap-2">
            <Calendar />
            {isFilter ? (
              <span>
                {range[0].startDate.toDateString()} —{" "}
                {range[0].endDate.toDateString()}
              </span>
            ) : (
              <span>Select Period</span>
            )}
            {open ? <ChevronUp /> : <ChevronDown />}
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="card-base p-4"
        side="bottom"
        align="end"
        avoidCollisions={false}
      >
        <DateRangePicker
          className="my-date-range"
          ranges={range}
          onChange={handleDateChange}
          moveRangeOnFirstSelection={false}
          months={1}
          direction="vertical"
        />
        <div className="flex text-right mt-2 space-x-2 justify-end">
          <Button
            variant="outline"
            size="sm"
            disabled={!isFilter}
            onClick={() => {
              clearFilter();
              setOpen(false);
            }}
          >
            Clear
          </Button>

          <Button
            variant="default"
            size="sm"
            onClick={() => {
              handleApply();
              setOpen(false);
            }}
          >
            Apply
          </Button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
