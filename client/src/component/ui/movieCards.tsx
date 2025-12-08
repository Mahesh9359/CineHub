import Image from "next/image";
import Link from "next/link";

interface ItemProps {
  item: {
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
  };
}

export default function MovieCard({ item }: ItemProps) {
  return (
    <Link href={`/movies/${item._id}`} className="group block">
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900 via-black to-gray-900 border border-gray-800 shadow-2xl transition-all duration-500 hover:scale-[1.02] hover:shadow-yellow-500/20 hover:border-yellow-500/30">
        {/* Backdrop Blur Overlay */}
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Movie Poster */}
        <div className="relative aspect-[3/3] overflow-hidden">
          <Image
            src={item.images[0]}
            alt={item.title}
            fill
            className="object-fill transition-transform duration-700 group-hover:scale-110"
            priority
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

          {/* Rating Badge - Floating Top Right */}
          <div className="absolute top-4 right-4 z-20 flex items-center gap-1.5 bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-full border border-yellow-500/50 shadow-2xl">
            <span className="text-yellow-400 text-lg">⭐</span>
            <span className="text-white font-bold text-sm tracking-wider">
              {item.rating}
            </span>
            <span className="text-gray-400 text-xs">/10</span>
          </div>

          {/* Play Icon on Hover */}
          <div className="absolute inset-0 flex items-center justify-center z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <div className="w-20 h-20 bg-yellow-500/90 backdrop-blur-md rounded-full flex items-center justify-center shadow-2xl scale-0 group-hover:scale-100 transition-transform duration-500">
              <svg className="w-10 h-10 text-black ml-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7L8 5z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="relative z-20 p-6 space-y-4 -mt-16 pb-8 bg-gradient-to-t from-black/95 via-black/70 to-transparent">
          {/* Title */}
          <h3 className="text-2xl font-bold text-white tracking-tight line-clamp-1 group-hover:text-yellow-400 transition-colors duration-300">
            {item.title}
          </h3>

          {/* Year + Duration */}
          <div className="flex items-center gap-4 text-sm text-gray-300">
            <span className="font-medium text-yellow-400">{item.year}</span>
            <span className="text-gray-500">•</span>
            <span>{item.duration}</span>
          </div>

          {/* Director */}
          <p className="text-sm text-gray-400">
            <span className="text-gray-200 font-medium">Dir:</span> {item.director}
          </p>

          {/* Genre Pills */}
          <div className="flex flex-wrap gap-2">
            {item.genre.slice(0, 3).map((g, idx) => (
              <span
                key={idx}
                className="px-3 py-1 bg-yellow-500/10 text-yellow-300 text-xs font-medium rounded-full border border-yellow-500/30 backdrop-blur-sm transition-all hover:bg-yellow-500/20"
              >
                {g}
              </span>
            ))}
          </div>

          {/* Cast - Subtle */}
          <p className="text-xs text-gray-500 line-clamp-1">
            {item.cast.slice(0, 4).join(" • ")}
            {item.cast.length > 4 && " ..."}
          </p>
        </div>

        {/* Animated Border Glow on Hover */}
        <div className="absolute inset-0 rounded-2xl border-2 border-transparent bg-gradient-to-r from-yellow-500/0 via-yellow-500/30 to-yellow-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-10 blur-xl" />
      </div>
    </Link>
  );
}