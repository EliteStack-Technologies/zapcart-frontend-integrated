"use client";

import { useState } from "react";
import Link from "next/link";
import ProductModal from "./ProductModal";
import SearchBox from "./SearchBox";
import ProductList, { ProductCard } from "./ProductList";

export default function CategoryClient({products,  }) {
  const allProducts = products || [];
  console.log(allProducts,"allProductsallProductsallProducts");
  console.log(allProducts?.category,'dpojsodingoidsnhfiudf');
  
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Show loading or error state if no products
  if (!products) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl font-bold text-gray-800">Loading...</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen ">
      <SearchBox
        products={allProducts?.products}
        onSelect={(item) => setSelectedProduct(item)}
      />

      {/* Header Section */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-5 py-6">
          {/* Category Header */}
          {allProducts?.category && (
            <div className="flex items-center gap-4">
              {allProducts?.category && (
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-4 border-green-500 shadow-md">
                  <img
                    src={allProducts?.category?.image ? `http://localhost:8000/uploads/${allProducts.category.image}` : '/default-category.png'}
                    alt={allProducts?.category?.name || 'Category'}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div>
                <h1 className="text-2xl md:text-4xl font-bold text-gray-900">
                  {allProducts?.category.name || 'Category'}
                </h1>
                <p className="text-gray-600 mt-1">
                  {allProducts?.products.length} {allProducts?.products.length === 1 ? 'product' : 'products'} available
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Products Grid */}
      <div className="container mx-auto py-8">
        {allProducts?.products.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 px-5">
            {allProducts?.products.map((product, index) => (
              <div
                key={index}
                onClick={() => setSelectedProduct(product)}
                className="cursor-pointer"
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="text-gray-400 mb-4">
              <svg
                className="w-24 h-24 mx-auto"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              No products found
            </h3>
            <p className="text-gray-500 mb-6">
              There are no products in this category yet.
            </p>
            <Link
              href="/"
              className="inline-block bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
            >
              Back to Home
            </Link>
          </div>
        )}
      </div>

      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  );
}
