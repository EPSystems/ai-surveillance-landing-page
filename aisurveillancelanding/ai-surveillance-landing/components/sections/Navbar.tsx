"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { BRAND, NAV_LINKS } from "@/lib/site";

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-edge bg-surface/95 backdrop-blur-sm">
      <div className="container flex h-16 items-center justify-between">
        <a
          href="#top"
          className="font-display text-2xl font-bold uppercase tracking-[0.18em] text-accent"
          aria-label={`${BRAND} — начало`}
        >
          {BRAND}
        </a>

        <nav aria-label="Основна навигация" className="hidden items-center gap-7 lg:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-ink-secondary transition-colors hover:text-ink"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Button href="#contact">Безплатно демо</Button>
        </div>

        <button
          type="button"
          className="flex h-11 w-11 items-center justify-center text-ink lg:hidden"
          aria-expanded={open}
          aria-label={open ? "Затвори менюто" : "Отвори менюто"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            aria-label="Мобилна навигация"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden border-t border-edge bg-surface lg:hidden"
          >
            <div className="container flex flex-col py-4">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="py-3 text-base font-medium text-ink-secondary hover:text-ink"
                >
                  {link.label}
                </a>
              ))}
              <Button href="#contact" className="mt-3" onClick={() => setOpen(false)}>
                Безплатно демо
              </Button>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
