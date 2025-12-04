"use client";

import Link from "next/link";
import Image from "next/image";
import heroImg from "../../public/hero2.png";

export default function HomePage() {

  return (
    <main className="bg-gradient-to-b from-gray-900 to-gray-950 text-white">
      {/* Hero Section with Parallax Effect */}
      <div className="relative w-full h-screen min-h-[600px] max-h-[800px] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/70 to-transparent z-10" />
        <Image
          src={heroImg}
          alt="hero-banner"
          fill
          priority
          className="object-full object-center"
          quality={100}
          placeholder="blur"
        />

        <div className="relative z-20 h-full flex flex-col justify-center items-center text-center px-4 pt-16">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-amber-500 to-orange-500">
            Welcome to CineHub
          </h1>
          <p className="text-xl md:text-2xl lg:text-3xl mb-8 text-gray-300 max-w-3xl mx-auto">
            Your ultimate destination for movies and anime. Discover, watch, and
            enjoy.
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              href="/movies"
              className="px-8 py-3 bg-gradient-to-r from-amber-500 to-orange-600 rounded-full font-bold text-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center gap-2"
            >
              <span>Explore Movies</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>
            <Link
              href="/anime"
              className="px-8 py-3 border-2 border-amber-500 text-amber-500 rounded-full font-bold text-lg hover:bg-amber-500 hover:bg-opacity-10 transition-all duration-300"
            >
              Browse Anime
            </Link>
          </div>
        </div>

        {/* Scrolling indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
          <span className="text-sm mb-1">Scroll Down</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </div>

      {/* Content Sections */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Top Movies Section */}

        {/* Call to Action */}
        <div className="mt-24 mb-16 relative rounded-2xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-900 to-amber-900 opacity-80 z-0" />
          <div className="relative z-10 p-8 sm:p-12 lg:p-16 text-center">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              Ready to dive in?
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
              Join thousands of users enjoying the best movies and anime in one
              place.
            </p>
            <Link
              href="/signup"
              className="inline-block px-8 py-4 bg-white text-gray-900 font-bold rounded-full text-lg hover:bg-gray-200 transition-all duration-300 shadow-xl hover:shadow-2xl"
            >
              Get Started Now
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
