"use client";

import * as React from "react";
import { ChevronDownIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const currentYear = new Date().getFullYear();

interface DatePickerProps {
  label: string;
  name: string;
  value: Date | undefined;
  onChange: (date: Date | undefined) => void;
  fromYear?: number;
  toYear?: number;
  required?: boolean;
  disabled?: boolean;
}

export function DatePicker({
  label,
  name,
  value,
  onChange,
  fromYear = currentYear - 100,
  toYear = currentYear + 50,
  required = false,
  disabled,
}: DatePickerProps) {
  const [open, setOpen] = React.useState(false);

  const handleSelect = (date: Date | undefined) => {
    onChange(date);
    setOpen(false);
  };

  return (
    <div
      className="
        flex flex-col  rounded-xl 
        transition-all duration-300
        gap-2
      "
    >
      <Label htmlFor={name} className="px-1 text-white">
        {label}
        {required && <span className="text-red-400 ml-1">*</span>}
      </Label>

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            id={name}
            className={`
              w-full justify-between text-white 
              border border-white/20
              transition-all
              ${disabled ? "opacity-40 cursor-not-allowed" : ""}
            `}
            onClick={(e) => disabled && e.preventDefault()}
          >
            {value ? value.toLocaleDateString() : "Select date"}
            <ChevronDownIcon className="h-4 w-4 opacity-70" />
          </Button>
        </PopoverTrigger>

        {!disabled && (
          <PopoverContent
            align="start"
            className="
              w-auto p-0 rounded-xl 
              bg-white/20 backdrop-blur-2xl 
              border border-white/30 shadow-2xl 
              overflow-hidden
            "
          >
            <Calendar
              mode="single"
              selected={value}
              captionLayout="dropdown"
              fromYear={fromYear}
              toYear={toYear}
              onSelect={handleSelect}
              initialFocus
            />
          </PopoverContent>
        )}
      </Popover>

      {/* Hidden input (required fix) */}
      <input
        type="hidden"
        name={name}
        required={required}
        value={value ? value.toISOString().split("T")[0] : ""}
      />
    </div>
  );
}
