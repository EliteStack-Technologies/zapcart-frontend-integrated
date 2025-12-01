"use client";
import Image from "next/image";
import { BiSolidOffer } from "react-icons/bi";
import { useCart } from "../context/cart-context";

export default function ProductModal({ product, onClose }) {
  const { addToCart, cartItems, removeFromCart } = useCart();

  const offerColors = {
    "Best Deal": "bg-green-500",
    "Hot Offer": "bg-red-500",
    "One Day offer": "bg-red-500",
    "Super Saver": "bg-yellow-500",
    "Killer Price": "bg-yellow-500",
    "Limited Time": "bg-blue-500",
  };

  const getPercentageOff = (old_price, actual_price) => {
    if (!old_price || !actual_price || old_price <= actual_price) return 0;
    return Math.round(((old_price - actual_price) / old_price) * 100);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      <div className="relative z-10 max-w-2xl w-full bg-white rounded-lg shadow-lg p-6 mx-4">
        {/* ✅ MODAL */}
        {product && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black/50" />
            <div className="relative z-10 max-w-2xl w-full bg-white rounded-lg shadow-lg p-6 mx-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="sm:w-1/2 relative flex items-center justify-center bg-slate-50 p-4 rounded">
                  <Image
                    src={`http://localhost:8000/uploads/${product.image}`}
                    alt={product.title || product.name || 'Product image'}
                    width={400}
                    height={300}
                    unoptimized
                    className="object-contain"
                  />
                  {product.offer_id && (
                    <div className="absolute z-50 top-1 left-1">
                      <span
                        className={`text-white text-[14px] font-semibold px-4 py-[2px] ${
                          offerColors[product.offer] || "bg-emerald-500"
                        } rounded-sm`}
                      >
                        {product.offer_id.name}
                      </span>
                    </div>
                  )}
                </div>

                <div className="sm:w-1/2">
                  <h3 className="text-2xl font-semibold text-[#333]">
                    {product.title}
                  </h3>
                  <div>
                    <span className="text-lg text-[#249424] font-extrabold">
                      AED
                      <span className="text-2xl">{product?.actual_price}</span>
                    </span>

                    {product?.old_price && (
                      <span className="text-[16px] text-[#a5a5a5] font-bold line-through ml-1">
                        {product.old_price}
                      </span>
                    )}

                    {product?.old_price && (
                      <p className="text-[16px]  text-[#FFA629] font-semibold">
                        <BiSolidOffer className="inline text-yellow-500" />{" "}
                        {getPercentageOff(product.old_price, product.actual_price)}%
                        OFF
                      </p>
                    )}
                  </div>

                  <div className="mt-6 flex items-center gap-3">
                    {cartItems.some((item) => item.name === product.name) ? (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          removeFromCart(product.name);
                          setproduct(null);
                        }}
                        className="bg-emerald-600 text-white px-4 py-2 rounded hover:bg-emerald-700 flex items-center gap-2"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          className="w-5 h-5 mt-1"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.704 5.29a1 1 0 00-1.408-1.42l-7.002 6.917-2.01-1.97a1 1 0 10-1.39 1.44l2.7 2.648a1 1 0 001.4-.02l7.71-7.595z"
                            clipRule="evenodd"
                          />
                        </svg>
                        Added
                      </button>
                    ) : (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          addToCart(product);
                          onClose(); // optional - if you want to close modal after add
                        }}
                        className="bg-emerald-600 text-white px-4 py-2 rounded hover:bg-emerald-700 flex items-center gap-2"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="w-5 h-5 "
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 4v16m8-8H4"
                          />
                        </svg>
                        Add to Cart 
                      </button>
                    )}

                    <button
                      onClick={onClose}
                      className="px-4 py-2 rounded border text-[#333]"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
