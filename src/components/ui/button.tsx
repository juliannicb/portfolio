"use client";
import { cn } from "@/lib/utils";
import { motion, type HTMLMotionProps } from "framer-motion";
import { useRef } from "react";

type ButtonProps = Omit<HTMLMotionProps<"button">, "children"> & {
  children?: React.ReactNode;
  variant?: "primary" | "ghost" | "icon";
  magnetic?: boolean;
};

export function Button({ className, variant = "primary", magnetic = false, children, ...props }: ButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const isIcon = variant === "icon";
  return (
    <motion.button
      ref={ref}
      onMouseMove={(e) => {
        const el = ref.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        el.style.setProperty("--x", `${x}px`);
        el.style.setProperty("--y", `${y}px`);
      }}
      className={cn(
        "group relative overflow-hidden rounded-xl ring-focus transition-colors",
        variant === "primary" && "bg-accent-teal/90 hover:bg-accent-teal text-black px-4 py-2",
        variant === "ghost" && "bg-transparent hover:bg-card px-4 py-2",
        isIcon && "p-2 rounded-full hover:bg-card",
        className
      )}
      whileHover={magnetic ? { x: 0.5, y: -1.5, scale: 1.01 } : { y: -2, scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      {...props}
    >
      {/* Cursor-follow glow */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(120px 120px at var(--x) var(--y), rgba(56,196,182,0.25), transparent 60%)",
        }}
      />

      {/* Gradient border shimmer */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-xl border border-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "linear-gradient(#000,#000) padding-box, linear-gradient(135deg, rgba(56,196,182,0.6), rgba(122,62,245,0.6)) border-box",
          WebkitMask:
            "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
          WebkitMaskComposite: "xor" as any,
          maskComposite: "exclude" as any,
        }}
      />

      {/* Content */}
      <span className="relative z-10 inline-flex items-center gap-2">{children}</span>
    </motion.button>
  );
}