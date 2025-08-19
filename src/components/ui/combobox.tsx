"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { ScrollArea } from "@/components/ui/scroll-area"

interface ComboboxProps {
  options: { value: string; label: string }[]
  value?: string[]
  onChange: (value: string[]) => void
  placeholder?: string
  emptyText?: string
}

export function Combobox({
  options = [],
  value = [],
  onChange,
  placeholder = "Select options...",
  emptyText = "No options found.",
}: ComboboxProps) {
  const [open, setOpen] = React.useState(false)

  const handleSelect = (currentValue: string) => {
    const newValue = value.includes(currentValue)
      ? value.filter((v) => v !== currentValue)
      : [...value, currentValue]
    onChange(newValue)
  }

  const handleClear = () => {
    onChange([])
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn(
            "w-full justify-between rounded-md border border-input bg-background px-3 py-2 text-sm",
            "text-foreground shadow-sm hover:bg-black/10 hover:text-white dark:hover:bg-white/10",
            "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
          )}
        >
          {value.length === 0
            ? <span className="text-muted-foreground">{placeholder}</span>
            : `${value.length} selected`}
          {value.length === 0 ? (
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          ) : (
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleClear();
              }}
              className="ml-2 text-muted-foreground hover:text-black dark:hover:text-white"
              aria-label="Clear filter"
            >
              ✕
            </button>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-[var(--radix-popover-trigger-width)] p-0 bg-white dark:bg-gray-950 border border-border">
        <Command className="border-none">
          <CommandList>
            <ScrollArea
              className={cn(
                options.length > 5 ? "h-[200px]" : "h-auto",
                "max-h-[200px]"
              )}
            >
              <CommandGroup>
                {options
                  .sort((a, b) => a.label.localeCompare(b.label))
                  .map((option) => (
                  <div
                    key={option.value}
                    className={cn(
                      "cursor-pointer px-2 py-1.5 text-base text-black dark:text-white",
                      value.includes(option.value) ? "bg-blue-100 dark:bg-blue-900" : "",
                      "hover:bg-blue-50 dark:hover:bg-blue-800"
                    )}
                    onClick={() => handleSelect(option.value)}
                  >
                    <div className="flex items-center">
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          value.includes(option.value) ? "opacity-100 text-primary" : "opacity-0"
                        )}
                        aria-hidden="true"
                      />
                      <span className="font-semibold">{option.label}</span>
                    </div>
                  </div>
                ))}
              </CommandGroup>
            </ScrollArea>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}