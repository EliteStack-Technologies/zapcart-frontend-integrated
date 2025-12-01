"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Categories({ categories = [] }) {
  const scrollContainerRef = useRef(null);

  const scroll = (direction) => {
    const container = scrollContainerRef.current;
    if (container) {
      const scrollAmount = 300;
      container.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  if (!categories || categories.length === 0) {
    return null;
  }

  return (
    <div className="relative  my-5">
      {/* Left Arrow */}
      <button
        onClick={() => scroll("left")}
        className="absolute left-3 top-1/2 -mt-5 -translate-y-1/2 z-10 bg-white rounded-full shadow-lg p-2 hover:bg-gray-100 transition-colors"
        aria-label="Scroll left"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-6 h-6 text-gray-600"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 19.5L8.25 12l7.5-7.5"
          />
        </svg>
      </button>

      {/* Categories Container */}
      <div
        ref={scrollContainerRef}
        className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth px-10"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {categories.map((category, index) => (
          <Link
            key={index}
            href={`/category/${category._id}`}
            className="flex flex-col items-center min-w-[90px] cursor-pointer group"
          >
            <div className="w-24 h-24 md:w-28 md:h-28 rounded-md overflow-hidden border-4 border-transparent group-hover:border-green-500 transition-all duration-300 shadow-md">
              <Image
                src={`http://localhost:8000/uploads/${category.image}`}
                alt={category.name}
                className="w-full h-full object-cover"
                width={112}
                height={112}
              />
            </div>
            <p className="mt-2 text-xs md:text-sm text-center font-medium text-gray-800 group-hover:text-green-600 transition-colors">
              {category.name}
            </p>
          </Link>
        ))}
      </div>

      {/* Right Arrow */}
      <button
        onClick={() => scroll("right")}
        className="absolute right-3 top-1/2 -mt-5 -translate-y-1/2 z-10 bg-[#fff] rounded-full shadow-lg p-2 hover:bg-gray-100 transition-colors"
        aria-label="Scroll right"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-6 h-6 text-gray-600"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.25 4.5l7.5 7.5-7.5 7.5"
          />
        </svg>
      </button>
    </div>
  );
}
