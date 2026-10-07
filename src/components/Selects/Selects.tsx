import { useState, useRef, useEffect, useMemo } from "react";
import { Search, ChevronDown, Check, X } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export interface SelectItemOption {
  label: string;
  value: string;
}

interface SelectsProps {
  items: SelectItemOption[];
  placeholder?: string;
  value?: string;
  onChange: (value: string) => void;
  searchable?: boolean;
  align?: "left" | "right";
  className?: string;
}

function SearchableSelect({
  items = [],
  placeholder = "Select...",
  value,
  onChange,
  align = "left",
  className,
}: SelectsProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Autofocus input when opened
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
      return () => clearTimeout(timer);
    } else {
      setSearchQuery("");
    }
  }, [isOpen]);

  const selectedItem = useMemo(() => {
    return (items || []).find((item) => String(item.value) === String(value));
  }, [items, value]);

  const filteredItems = useMemo(() => {
    if (!searchQuery.trim()) return items || [];
    const q = searchQuery.toLowerCase().trim();
    return (items || []).filter((item) =>
      item.label.toLowerCase().includes(q)
    );
  }, [items, searchQuery]);

  return (
    <div
      ref={containerRef}
      className={cn("relative w-full", className)}
      onKeyDown={(e) => {
        if (e.key === "Escape") {
          setIsOpen(false);
        }
      }}
    >
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className={cn(
          "flex h-8 w-full items-center justify-between gap-1.5 rounded-lg border border-input bg-transparent py-2 pr-2 pl-2.5 text-sm transition-colors outline-none select-none",
          "hover:bg-slate-50 dark:hover:bg-input/50",
          "focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50",
          isOpen && "border-ring ring-3 ring-ring/50"
        )}
      >
        <span
          className={cn(
            "truncate text-left flex-1",
            !selectedItem && "text-muted-foreground"
          )}
        >
          {selectedItem ? selectedItem.label : placeholder}
        </span>
        <div className="flex items-center gap-1 shrink-0">
          {value && (
            <span
              role="button"
              tabIndex={0}
              onClick={(e) => {
                e.stopPropagation();
                onChange("");
              }}
              className="p-0.5 text-muted-foreground hover:text-foreground rounded transition-colors cursor-pointer"
              title="Clear selection"
            >
              <X className="size-3.5" />
            </span>
          )}
          <ChevronDown
            className={cn(
              "size-4 text-muted-foreground transition-transform duration-200",
              isOpen && "rotate-180"
            )}
          />
        </div>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          className={cn(
            "absolute z-50 mt-1.5 w-full min-w-[280px] sm:min-w-[320px] max-w-[420px] rounded-xl border border-slate-200 bg-popover text-popover-foreground shadow-xl ring-1 ring-black/5 dark:border-slate-800 dark:ring-white/10 overflow-hidden animate-in fade-in-0 zoom-in-95 duration-100",
            align === "right" ? "right-0" : "left-0"
          )}
        >
          {/* Sticky Search Header */}
          <div className="p-2 border-b border-border bg-slate-50/80 dark:bg-slate-900/80 backdrop-blur-xs">
            <div className="relative flex items-center">
              <Search className="absolute left-2.5 size-3.5 text-muted-foreground pointer-events-none" />
              <input
                ref={inputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search department..."
                className="w-full rounded-md border border-input bg-background pl-8 pr-7 py-1.5 text-xs text-foreground placeholder:text-muted-foreground outline-none focus:border-ring focus:ring-1 focus:ring-ring"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2 p-0.5 text-muted-foreground hover:text-foreground"
                >
                  <X className="size-3" />
                </button>
              )}
            </div>
            <div className="flex items-center justify-between mt-1 px-1 text-[10px] text-muted-foreground">
              <span>
                {filteredItems.length} of {items.length} departments
              </span>
              {searchQuery && (
                <span className="text-sky-500 font-semibold">Filtered</span>
              )}
            </div>
          </div>

          {/* Scrollable Items List */}
          <div className="max-h-60 overflow-y-auto p-1 text-xs">
            {filteredItems.length > 0 ? (
              filteredItems.map((item) => {
                const isSelected = String(item.value) === String(value);
                return (
                  <div
                    key={item.value}
                    onClick={() => {
                      onChange(item.value);
                      setIsOpen(false);
                    }}
                    className={cn(
                      "flex items-center justify-between px-2.5 py-1.5 rounded-md cursor-pointer transition-colors text-foreground",
                      isSelected
                        ? "bg-accent font-medium text-accent-foreground"
                        : "hover:bg-accent/50 hover:text-accent-foreground"
                    )}
                  >
                    <span className="truncate pr-2">{item.label}</span>
                    {isSelected && (
                      <Check className="size-3.5 text-primary shrink-0" />
                    )}
                  </div>
                );
              })
            ) : (
              <div className="py-6 text-center text-xs text-muted-foreground">
                No department found matching &ldquo;{searchQuery}&rdquo;
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default function Selects({
  items = [],
  placeholder,
  value,
  onChange,
  searchable,
  align = "left",
  className,
}: SelectsProps) {
  const isSearchable = searchable ?? (Boolean(items) && items.length > 8);

  if (isSearchable) {
    return (
      <SearchableSelect
        items={items}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        align={align}
        className={className}
      />
    );
  }

  return (
    <Select value={value} onValueChange={(val) => onChange(val ?? "")}>
      <SelectTrigger className={cn("w-full", className)}>
        <SelectValue>
          {value
            ? items.find((item: any) => String(item.value) === String(value))?.label
            : placeholder}
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {items.map((item: any) => (
            <SelectItem key={item.value} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
