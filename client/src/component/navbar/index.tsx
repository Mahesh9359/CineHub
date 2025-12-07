"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useLayout } from "@/context/layout-context";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { isHomePage } = useLayout();

  return (
    <nav
      className={`${
        isHomePage
          ? "fixed top-0 left-0 right-0 bg-transparent text-white"
          : "sticky top-0 bg-black/90 text-white shadow-lg"
      } z-50 transition-all`}
    >
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link
          href="/"
          className="text-3xl font-extrabold tracking-wide bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-orange-500"
        >
          CineHub
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8 text-lg font-medium">
          {["Home", "Movies", "Anime", "Favorites"].map((item) => (
            <Link
              key={item}
              href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
              className="hover:text-yellow-400 transition-colors"
            >
              {item}
            </Link>
          ))}
        </div>

        {/* Mobile button */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 hover:bg-white/20 rounded-full transition"
        >
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div
          className={`md:hidden px-6 pb-4 pt-2 space-y-2 ${
            isHomePage ? "bg-black/80 backdrop-blur-md" : "bg-gray-900"
          }`}
        >
          {["Home", "Movies", "Anime", "Favorites"].map((item) => (
            <Link
              key={item}
              href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
              className="block py-2 px-3 rounded-lg hover:text-yellow-400 hover:bg-white/10 transition"
              onClick={() => setOpen(false)}
            >
              {item}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
