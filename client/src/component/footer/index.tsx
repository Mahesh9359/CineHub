import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h2 className="text-2xl font-bold text-yellow-400 mb-3">CineHub</h2>
          <p className="text-sm">
            Your ultimate destination for movies, anime, and entertainment.
            Watch, save, and explore your favorites with CineHub.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-white mb-2">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/" className="hover:text-yellow-400">Home</Link></li>
            <li><a href="/movies" className="hover:text-yellow-400">Movies</a></li>
            <li><a href="/anime" className="hover:text-yellow-400">Anime</a></li>
            <li><a href="/favorites" className="hover:text-yellow-400">Favorites</a></li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-white mb-2">Contact</h3>
          <ul className="text-sm space-y-2">
            <li>Email: support@cinehub.com</li>
            <li>Phone: +91 9876 543 210</li>
            <li>Address: Pune, Maharashtra, India</li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-white mb-2">Newsletter</h3>
          <p className="text-sm mb-2">Subscribe to get the latest updates and releases.</p>
          <form className="flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-3 py-2 rounded text-black bg-amber-50 text-sm w-full"
            />
            <button
              type="submit"
              className="bg-yellow-400 text-black px-4 py-2 rounded font-semibold text-sm hover:bg-yellow-500 transition"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
      <div className="border-t border-gray-700 mt-6 py-4 text-center text-sm">
        <div className="mt-2 flex justify-center gap-4 text-gray-400">
          <a href="#" className="hover:text-yellow-400">Facebook</a>
          <a href="#" className="hover:text-yellow-400">Twitter</a>
          <a href="#" className="hover:text-yellow-400">Instagram</a>
        </div>
      </div>
    </footer>
  );
}
