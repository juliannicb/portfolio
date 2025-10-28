"use client";
import { useState } from "react";
import { Copy } from "lucide-react";
import toast from "react-hot-toast";
import { cn } from "@/lib/utils";

export function CodeBlock({ code, lang, className }: { code: string; lang?: string; className?: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <div className={cn("relative", className)}>
      <button
        aria-label="Copy code"
        className="absolute right-3 top-3 z-10 rounded-md bg-black/40 px-2 py-1 text-xs text-white hover:bg-black/60"
        onClick={() => {
          navigator.clipboard.writeText(code);
          setCopied(true);
          toast.success("Copied to clipboard");
          setTimeout(() => setCopied(false), 1500);
        }}
      >
        <Copy size={14} />
      </button>
      <pre className="overflow-x-auto">
        <code className={`language-${lang ?? "tsx"}`}>{code}</code>
      </pre>
    </div>
  );
}