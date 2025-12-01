"use client";
import Image from "next/image";
import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import logo from "../../public/logo.svg";
export default function SearchBox({ products, onSelect }) {
  const [query, setQuery] = useState("");

  const filtered = query
    ? products.filter((p) =>
        (p?.name || "").toString().toLowerCase().includes(query.toLowerCase())
      )
    : [];
  return (
    <div className=" px-5  sticky bg-white z-40 top-0 flex items-center gap-5 shadow">
      <Image src={logo} alt="logo" className="w-[150px]" />
      <div className="border border-gray-400 rounded-md w-full px-2 py-1 flex items-center gap-2">
        <FiSearch className="text-gray-800 text-lg" />
        <input
          type="text"
          placeholder="Search products..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full text-[#333] outline-none placeholder:text-gray-400"
        />
      </div>

      {query && (
        <div className="absolute w-full bg-white top-24 left-0  border rounded-md shadow-md mt-1 z-50 max-h-64 overflow-y-auto">
          {filtered.length === 0 ? (
            <p className="p-2 text-sm text-gray-600">No products found</p>
          ) : (
            filtered.map((item) => (
              <div
                key={item.id}
                className="p-2 hover:bg-gray-100 cursor-pointer text-sm text-black border-b"
                onClick={() => {
                  onSelect(item); // ⬅ OPEN POPUP
                  setQuery(""); // clear search
                }}
              >
                {item.name}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
