"use client";

import axios from "axios";
import React, { useState } from "react";

export default function PostMovies() {
  const [movies, setMovies] = useState({
    title: "",
    description: "",
    images: [""],
    director: "",
    year: new Date().getFullYear(),
    genre: [""],
    cast: [""],
    rating: 8.5,
    duration: "",
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post("http://localhost:8080/movies", movies);
      alert(response.data.message || "Movie added successfully! 🎬");
      
      // Reset form
      setMovies({
        title: "",
        description: "",
        images: [""],
        director: "",
        year: new Date().getFullYear(),
        genre: [""],
        cast: [""],
        rating: 8.5,
        duration: "",
      });
    } catch (error) {
      console.error(error);
      alert(error|| "Failed to add movie 😔");
    } finally {
      setLoading(false);
    }
  };

  const handleArrayChange = (field: "genre" | "cast" | "images", index: number, value: string) => {
    setMovies(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => (i === index ? value : item))
    }));
  };

  const addField = (field: "genre" | "cast" | "images") => {
    setMovies(prev => ({
      ...prev,
      [field]: [...prev[field], ""]
    }));
  };

  const removeField = (field: "genre" | "cast" | "images", index: number) => {
    setMovies(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-5xl font-bold text-white mb-4 tracking-tight">
            Add New <span className="text-yellow-400">Movie</span>
          </h1>
          <p className="text-gray-400 text-lg">Share your cinematic masterpiece with the world</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-gray-900/80 backdrop-blur-xl border border-gray-800 rounded-3xl shadow-2xl p-8 md:p-12 space-y-8"
        >
          {/* Title */}
          <div>
            <label className="block text-yellow-400 font-semibold mb-2 text-lg">Movie Title</label>
            <input
              type="text"
              required
              value={movies.title}
              onChange={(e) => setMovies({ ...movies, title: e.target.value })}
              className="w-full px-5 py-4 bg-black/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500 focus:ring-4 focus:ring-yellow-500/20 transition"
              placeholder="e.g. Inception"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-yellow-400 font-semibold mb-2 text-lg">Description</label>
            <textarea
              required
              rows={4}
              value={movies.description}
              onChange={(e) => setMovies({ ...movies, description: e.target.value })}
              className="w-full px-5 py-4 bg-black/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500 focus:ring-4 focus:ring-yellow-500/20 transition resize-none"
              placeholder="A mind-bending thriller about dreams within dreams..."
            />
          </div>

          {/* Poster URL */}
          <div>
            <label className="block text-yellow-400 font-semibold mb-2 text-lg">Poster Image URL(s)</label>
            {movies.images.map((img, idx) => (
              <div key={idx} className="flex gap-3 mb-3">
                <input
                  type="url"
                  required={idx === 0}
                  value={img}
                  onChange={(e) => handleArrayChange("images", idx, e.target.value)}
                  className="flex-1 px-5 py-4 bg-black/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500 transition"
                  placeholder="https://image.tmdb.org/t/p/original/..."
                />
                {movies.images.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeField("images", idx)}
                    className="px-4 bg-red-600/20 text-red-400 hover:bg-red-600/40 rounded-xl transition"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={() => addField("images")}
              className="text-yellow-400 hover:text-yellow-300 text-sm font-medium"
            >
              + Add another image
            </button>
          </div>

          {/* Director */}
          <div>
            <label className="block text-yellow-400 font-semibold mb-2 text-lg">Director</label>
            <input
              type="text"
              required
              value={movies.director}
              onChange={(e) => setMovies({ ...movies, director: e.target.value })}
              className="w-full px-5 py-4 bg-black/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500 transition"
              placeholder="Christopher Nolan"
            />
          </div>

          {/* Year & Duration */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-yellow-400 font-semibold mb-2 text-lg">Release Year</label>
              <input
                type="number"
                required
                min="1900"
                max={new Date().getFullYear() + 5}
                value={movies.year}
                onChange={(e) => setMovies({ ...movies, year: parseInt(e.target.value) || 2025 })}
                className="w-full px-5 py-4 bg-black/50 border border-gray-700 rounded-xl text-white focus:outline-none focus:border-yellow-500 transition"
              />
            </div>

            <div>
              <label className="block text-yellow-400 font-semibold mb-2 text-lg">Duration</label>
              <input
                type="text"
                required
                value={movies.duration}
                onChange={(e) => setMovies({ ...movies, duration: e.target.value })}
                className="w-full px-5 py-4 bg-black/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500 transition"
                placeholder="2h 28min or 148 min"
              />
            </div>
          </div>

          {/* Rating */}
          <div>
            <label className="block text-yellow-400 font-semibold mb-2 text-lg">
              Rating (out of 10)
            </label>
            <input
              type="number"
              step="0.1"
              min="0"
              max="10"
              required
              value={movies.rating}
              onChange={(e) => setMovies({ ...movies, rating: parseFloat(e.target.value) || 0 })}
              className="w-full px-5 py-4 bg-black/50 border border-gray-700 rounded-xl text-white focus:outline-none focus:border-yellow-500 transition"
            />
          </div>

          {/* Genre */}
          <div>
            <label className="block text-yellow-400 font-semibold mb-2 text-lg">Genres</label>
            {movies.genre.map((g, idx) => (
              <div key={idx} className="flex gap-3 mb-3">
                <input
                  type="text"
                  value={g}
                  onChange={(e) => handleArrayChange("genre", idx, e.target.value)}
                  className="flex-1 px-5 py-4 bg-black/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500 transition capitalize"
                  placeholder="Action, Sci-Fi, Thriller..."
                />
                {movies.genre.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeField("genre", idx)}
                    className="px-4 bg-red-600/20 text-red-400 hover:bg-red-600/40 rounded-xl transition"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={() => addField("genre")}
              className="text-yellow-400 hover:text-yellow-300 text-sm font-medium"
            >
              + Add Genre
            </button>
          </div>

          {/* Cast */}
          <div>
            <label className="block text-yellow-400 font-semibold mb-2 text-lg">Cast (Main Actors)</label>
            {movies.cast.map((actor, idx) => (
              <div key={idx} className="flex gap-3 mb-3">
                <input
                  type="text"
                  value={actor}
                  onChange={(e) => handleArrayChange("cast", idx, e.target.value)}
                  className="flex-1 px-5 py-4 bg-black/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500 transition"
                  placeholder="Leonardo DiCaprio"
                />
                {movies.cast.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeField("cast", idx)}
                    className="px-4 bg-red-600/20 text-red-400 hover:bg-red-600/40 rounded-xl transition"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={() => addField("cast")}
              className="text-yellow-400 hover:text-yellow-300 text-sm font-medium"
            >
              + Add Actor
            </button>
          </div>

          {/* Submit Button */}
          <div className="pt-6">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-5 px-8 bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-bold text-xl rounded-xl hover:from-yellow-400 hover:to-yellow-500 transform hover:scale-[1.02] transition-all duration-300 shadow-xl disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-3"
            >
              {loading ? (
                <>Uploading... Please wait</>
              ) : (
                <>
                  Add Movie to Database
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}