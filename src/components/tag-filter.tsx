"use client";
import { useState } from "react";
import { Chip } from "@/components/ui/chip";

export function TagFilter({
  tags,
  onChange,
}: {
  tags: string[];
  onChange: (active: string | null) => void;
}) {
  const [active, setActive] = useState<string | null>(null);
  return (
    <div className="flex flex-wrap gap-2">
      {["All", ...tags].map((t) => (
        <button
          key={t}
          className="ring-focus"
          onClick={() => {
            const val = t === "All" ? null : t;
            setActive(val);
            onChange(val);
          }}
        >
          <Chip className={active === (t === "All" ? null : t) ? "bg-accent-teal/20" : ""}>{t}</Chip>
        </button>
      ))}
    </div>
  );
}