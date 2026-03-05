"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  ExternalLink,
  ShoppingCart,
  MessageCircle,
} from "lucide-react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/servers", label: "Server IPs" },
  { href: "/settings", label: "Settings" },
  { href: "/rules", label: "Rules" },
  { href: "/status", label: "Status" },
  { href: "/store", label: "Store" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  return (
    <nav className="fixed inset-x-0 top-0 z-50 border-b border-dark-600/50 bg-dark-900/90 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <span className="text-2xl" role="img" aria-label="dodo">
              🦤
            </span>
            <span className="text-xl font-extrabold tracking-tight">
              <span className="text-emerald-400 group-hover:text-emerald-300 transition-colors">
                Dodo
              </span>
              <span className="text-white group-hover:text-gray-100 transition-colors">
                Ark
              </span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-emerald-500/15 text-emerald-400"
                      : "text-gray-400 hover:bg-dark-700 hover:text-white"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* CTA Buttons */}
          <div className="hidden items-center gap-3 md:flex">
            <a
              href="https://discord.gg/dodoark"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 rounded-lg bg-[#5865F2]/20 px-4 py-2 text-sm font-medium text-[#5865F2] transition-all hover:bg-[#5865F2]/30 hover:text-[#7289da]"
            >
              <MessageCircle className="h-4 w-4" />
              Discord
            </a>
            <Link
              href="/store"
              className="flex items-center gap-1.5 rounded-lg bg-emerald-500/20 px-4 py-2 text-sm font-medium text-emerald-400 transition-all hover:bg-emerald-500/30"
            >
              <ShoppingCart className="h-4 w-4" />
              Store
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="rounded-lg p-2 text-gray-400 hover:bg-dark-700 hover:text-white md:hidden"
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t border-dark-600/50 bg-dark-900/98 backdrop-blur-xl md:hidden">
          <div className="space-y-1 px-4 pb-4 pt-3">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`block rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-emerald-500/15 text-emerald-400"
                      : "text-gray-400 hover:bg-dark-700 hover:text-white"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
            <div className="flex gap-3 pt-3">
              <a
                href="https://discord.gg/dodoark"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-[#5865F2]/20 px-4 py-2.5 text-sm font-medium text-[#5865F2]"
              >
                <MessageCircle className="h-4 w-4" />
                Discord
              </a>
              <Link
                href="/store"
                onClick={() => setMobileOpen(false)}
                className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-emerald-500/20 px-4 py-2.5 text-sm font-medium text-emerald-400"
              >
                <ShoppingCart className="h-4 w-4" />
                Store
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
