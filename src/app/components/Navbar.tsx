"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navLinks = [
  { href: "/", label: "Unicode to Text" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/privacy-policy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="border-b border-slate-200 bg-white">
      {/* Top bar */}
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between gap-3">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-xl bg-sky-600 text-white text-xs font-semibold flex items-center justify-center">
            AT
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-sm font-semibold tracking-tight">
              (your name )Tools
            </span>
            <span className="text-[11px] text-slate-500">
              Free online utilities
            </span>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-4 text-xs text-slate-600">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`rounded-full px-3 py-1 transition ${
                isActive(link.href)
                  ? "bg-sky-50 text-sky-700 border border-sky-100"
                  : "hover:bg-slate-100 hover:text-sky-700"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Mobile hamburger */}
        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          className="md:hidden inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700"
          aria-label="Toggle navigation"
        >
          <div className="space-y-1">
            <span className="block h-[2px] w-5 bg-slate-700 rounded-sm" />
            <span className="block h-[2px] w-5 bg-slate-700 rounded-sm" />
            <span className="block h-[2px] w-5 bg-slate-700 rounded-sm" />
          </div>
        </button>
      </div>

      {/* Mobile overlay + side drawer */}
      {open && (
        <div className="md:hidden fixed inset-0 z-40">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/30"
            onClick={() => setOpen(false)}
          />

          {/* Drawer */}
          <div className="relative ml-auto h-full w-[70%] max-w-xs bg-white border-l border-slate-200 shadow-xl flex flex-col">
            {/* Drawer header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <div className="h-7 w-7 rounded-lg bg-sky-600 text-white text-[10px] font-semibold flex items-center justify-center">
                  AT
                </div>
                <span className="text-sm font-semibold tracking-tight">
                  (your name )Tools
                </span>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700"
                aria-label="Close navigation"
              >
                ✕
              </button>
            </div>

            {/* Drawer links */}
            <nav className="flex-1 px-4 py-4 flex flex-col gap-1 text-sm text-slate-700">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`rounded-xl px-3 py-2 transition ${
                    isActive(link.href)
                      ? "bg-sky-50 text-sky-700 border border-sky-100"
                      : "hover:bg-slate-100"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Small note / footer inside drawer (optional) */}
            <div className="px-4 pb-4 text-[11px] text-slate-500">
              © {new Date().getFullYear()} (your name )Tools
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
