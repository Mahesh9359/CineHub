"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import heroImg from "../../../public/hero2.png";
import { useLayout } from "@/context/layout-context";
import axios from "axios";
import MovieCard from "../ui/movieCards";

interface Movie {
  _id: string;
  title: string;
  description: string;
  images: string[];
  director: string;
  year: number;
  genre: string[];
  cast: string[];
  rating: number;
  duration: string;
}
// Animation Variants
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function HomePage() {
  const { setIsHomePage } = useLayout();
  const [showMovies, setShowMovies] = useState<Movie[]>([]);
  const [showAnime, setShowAnime] = useState([]);

  useEffect(() => {
    setIsHomePage(true);
    return () => setIsHomePage(false);
  }, [setIsHomePage]);

  const onload = async () => {
    try {
      const response = await axios.get(`${process.env.BASE_URL}/movies`);
      setShowMovies(response.data.data);
      console.log("data", response.data.data);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };
  useEffect(() => {
    const load = async () => {
      await onload();
    };
    load();
  }, []);

  return (
    <main className="bg-gradient-to-b from-gray-900 to-black text-white">
      {/* HERO SECTION */}
      <section className="relative w-full h-screen max-h-[820px] overflow-hidden">
        <Image
          src={heroImg}
          alt="CineHub Hero Banner"
          fill
          priority
          className="object-fill object-center opacity-90"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

        <div className="relative z-20 flex h-full flex-col justify-center items-center text-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
            className="max-w-4xl space-y-6"
          >
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 drop-shadow-xl">
              Welcome to CineHub
            </h1>

            <p className="text-lg md:text-2xl text-gray-300 max-w-2xl mx-auto">
              Discover the world of Cinema and Anime — your one-stop platform
              for entertainment.
            </p>

            <div className="flex gap-4 justify-center mt-8">
              <Link
                href="/movies"
                className="px-8 py-3 rounded-full bg-gradient-to-r from-orange-500 to-red-600 font-semibold text-lg shadow-lg hover:scale-105 hover:shadow-2xl transition-all flex items-center gap-2"
              >
                Explore Movies
              </Link>

              <Link
                href="/anime"
                className="px-8 py-3 rounded-full border-2 border-orange-400 text-orange-300 font-semibold text-lg hover:bg-orange-400 hover:text-black transition-all"
              >
                Browse Anime
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-gray-300 flex flex-col items-center"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <p className="text-sm mb-1">Scroll Down</p>
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </motion.div>
      </section>

      {/* SECTIONS */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        {/* MOVIES SECTION */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Top Movies</h2>
          <Link href="/movies" className="text-orange-400 hover:underline">
            View More →
          </Link>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
        >
          {showMovies.map((movie) => (
            <motion.div
              key={movie._id}
              variants={item}
              whileHover={{ scale: 1.04 }}
              className="group relative rounded-2xl overflow-hidden shadow-xl bg-gray-900/40 backdrop-blur-lg border border-white/10 hover:border-yellow-500/40 transition-all duration-300"
            >
              <MovieCard item={movie} />
            </motion.div>
          ))}
        </motion.div>

        {/* ANIME SECTION */}
        <div className="flex justify-between items-center mt-20 mb-8">
          <h2 className="text-3xl font-bold">Top Anime</h2>
          <Link href="/anime" className="text-orange-400 hover:underline">
            View More →
          </Link>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
        ></motion.div>

        {/* CTA SECTION */}
        <div className="mt-28 relative rounded-3xl overflow-hidden shadow-xl">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-800/80 to-orange-700/80" />

          <div className="relative p-12 text-center space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold">
              Ready to Dive In?
            </h2>
            <p className="text-xl text-gray-200 max-w-2xl mx-auto">
              Join thousands enjoying movies & anime all in one place.
            </p>

            <Link
              href="/signup"
              className="inline-block mt-6 px-10 py-4 bg-white text-black rounded-full font-bold shadow-lg hover:bg-gray-200 transition"
            >
              Get Started Now
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
