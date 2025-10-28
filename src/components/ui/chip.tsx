import { cn } from "@/lib/utils";

export function Chip({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-1 rounded-full bg-card px-3 py-1 text-xs text-muted", className)}>
      {children}
    </span>
  );
}