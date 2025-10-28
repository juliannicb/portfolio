"use client";
import { motion } from "framer-motion";

export function Section({
  title,
  eyebrow,
  children,
}: {
  title?: string;
  eyebrow?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-16">
      {(title || eyebrow) && (
        <div className="mb-6">
          {eyebrow && <div className="text-xs uppercase tracking-wider text-muted">{eyebrow}</div>}
          {title && <h2 className="text-2xl font-semibold mt-1">{title}</h2>}
        </div>
      )}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        {children}
      </motion.div>
    </section>
  );
}