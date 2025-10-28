"use client";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export function Card({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      className={cn("group relative rounded-2xl glass p-5 overflow-hidden", className)}
      whileHover={{ rotateX: -2, rotateY: 2 }}
      transition={{ type: "spring", stiffness: 150, damping: 15 }}
      style={{ transformStyle: "preserve-3d" }}
    >
      <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-tr from-accent-violet/10 via-transparent to-accent-teal/10 opacity-0 group-hover:opacity-100" />
      {children}
    </motion.div>
  );
}