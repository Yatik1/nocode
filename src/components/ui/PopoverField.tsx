import React, { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

interface PopoverOption {
  value: string;
  label: string;
  icon?: React.ReactNode;
}

interface PopoverSelectProps {
  options: PopoverOption[];
  value: string;
  onChange: (value: string) => void;
}

export default function PopoverSelect({
  options,
  value,
  onChange,
}: PopoverSelectProps) {

  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const selected = options.find((opt) => opt.value === value);

  function handleSelect(newValue: string) {
      setOpen(false); 
    onChange(newValue);
  }

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
      <div
        className="flex items-center justify-center gap-1 py-1 px-2 bg-[#F4F4F4] rounded-sm relative cursor-pointer"
        onClick={() => setOpen((prev) => !prev)}
        ref={ref}
      >
        <div className="flex items-center justify-center gap-1">
            {selected?.icon && <span className="rotate-[-45deg]">{selected.icon}</span>}
        <p className="overflow-hidden text-xs capitalize">{selected?.label ?? value}</p>
        </div>

        <ChevronDown strokeWidth={1} size={15} />

        {/* Popover Options */}
      {open && (
        <div className="bg-[#f4f4f4] absolute top-7 rounded-sm border border-stone-200 flex flex-col gap-2 items-start justify-center py-1 px-1.5 z-50">
          {options.map((opt,index) => (
            <div
              key={index}
              className={`flex items-center justify-start gap-1 hover:text-blue-800 w-full h-full cursor-pointer ${opt.value === value && "text-blue-800"}`}
              onClick={() => handleSelect(opt.value)}
            >
              {opt.icon && <span className="rotate-[-45deg]">{opt.icon}</span>}
              <p className="overflow-hidden text-xs capitalize">{opt.label}</p>
            </div>
          ))}
        </div>
      )}
      </div>
  );
}
