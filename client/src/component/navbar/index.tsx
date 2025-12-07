"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useLayout } from "@/context/layout-context";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { isHomePage } = useLayout();

  return (
    <nav className={`${isHomePage ? 
      "fixed top-0 left-0 right-0 z-50 bg-transparent text-white" : 
      "sticky top-0 z-50 bg-gray-900 text-white shadow-lg"
    }`}>
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link 
          href="/" 
          className="text-2xl font-bold text-yellow-400 tracking-wide hover:scale-105 transition-transform"
        >
          CineHub
        </Link>
        
        <div className="hidden md:flex gap-6 text-lg font-medium">
          <Link 
            href="/" 
            className="hover:text-yellow-400 transition-colors duration-200 px-3 py-1 rounded-lg hover:bg-white/10"
          >
            Home
          </Link>
          <Link 
            href="/movies" 
            className="hover:text-yellow-400 transition-colors duration-200 px-3 py-1 rounded-lg hover:bg-white/10"
          >
            Movies
          </Link>
          <Link 
            href="/anime" 
            className="hover:text-yellow-400 transition-colors duration-200 px-3 py-1 rounded-lg hover:bg-white/10"
          >
            Anime
          </Link>
          <Link 
            href="/favorites" 
            className="hover:text-yellow-400 transition-colors duration-200 px-3 py-1 rounded-lg hover:bg-white/10"
          >
            Favorites
          </Link>
        </div>
        
        <button
          className="md:hidden focus:outline-none p-1 rounded-full hover:bg-white/20 transition-colors"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>
      
      {isOpen && (
        <div className={`md:hidden px-4 pb-4 space-y-2 ${isHomePage ? "bg-gray-900/95 backdrop-blur-sm" : "bg-gray-800"}`}>
          <Link href="/" className="block py-2 px-3 rounded-lg hover:text-yellow-400 hover:bg-white/10">Home</Link>
          <Link href="/movies" className="block py-2 px-3 rounded-lg hover:text-yellow-400 hover:bg-white/10">Movies</Link>
          <Link href="/anime" className="block py-2 px-3 rounded-lg hover:text-yellow-400 hover:bg-white/10">Anime</Link>
          <Link href="/favorites" className="block py-2 px-3 rounded-lg hover:text-yellow-400 hover:bg-white/10">Favorites</Link>
        </div>
      )}
    </nav>
  );
}