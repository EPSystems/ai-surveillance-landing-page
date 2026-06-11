"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronDown } from "lucide-react";

export function AccordionItem({
  id,
  open,
  onToggle,
  question,
  questionSecondary,
  children,
}: {
  id: string;
  open: boolean;
  onToggle: () => void;
  question: string;
  /** Secondary (English) rendering of the question */
  questionSecondary?: string;
  children: React.ReactNode;
}) {
  const reduced = useReducedMotion();

  return (
    <div className="border-b border-edge">
      <button
        type="button"
        id={`${id}-q`}
        aria-expanded={open}
        aria-controls={`${id}-a`}
        onClick={onToggle}
        className="flex w-full items-start justify-between gap-4 py-5 text-left"
      >
        <span>
          <span className="block font-display text-lg font-bold uppercase leading-snug tracking-wide text-ink">
            {question}
          </span>
          {questionSecondary && (
            <span className="mt-1 block text-sm text-ink-secondary">{questionSecondary}</span>
          )}
        </span>
        <motion.span
          aria-hidden="true"
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: reduced ? 0 : 0.2 }}
          className="mt-1 shrink-0 text-accent"
        >
          <ChevronDown size={20} strokeWidth={2} />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            id={`${id}-a`}
            role="region"
            aria-labelledby={`${id}-q`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: reduced ? 0 : 0.25, ease: [0.4, 0, 0.2, 1] }}
            className="overflow-hidden"
          >
            <div className="max-w-2xl pb-6 pr-8 leading-relaxed text-ink-secondary">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
