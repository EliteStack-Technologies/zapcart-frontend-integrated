"use client";
import React from "react";
import Image from "next/image";
import { useCart } from "../context/cart-context";
import { FaPlus } from "react-icons/fa6";
import { BiSolidOffer } from "react-icons/bi";
import Countdown from "react-countdown";
import { BsFillLightningChargeFill } from "react-icons/bs";

export const ProductCard = ({ product }) => {
  const { addToCart, cartItems, removeFromCart } = useCart();
  const {
    title,
    actual_price,
    offer_start_date,
    offer_end_date,
    offer_price,
    offer_id,
    image,
    old_price,
    unit_type,
  } = product;

  const [offerActive, setOfferActive] = React.useState(false);
  const [hoursRemaining, setHoursRemaining] = React.useState(0);

  React.useEffect(() => {
    const now = new Date();
    const start = new Date(offer_start_date);
    const end = new Date(offer_end_date);

    setOfferActive(now >= start && now <= end);

    const msRemaining = end - now;
    const hours = msRemaining > 0 ? Math.floor(msRemaining / (1000 * 60 * 60)) : 0;
    setHoursRemaining(hours);
  }, [offer_start_date, offer_end_date]);

  const handleAddToCart = (e) => {
    e?.stopPropagation?.();
    const modifiedProduct = {
      ...product,
      name: title,
      quantity: 1,
      displayQuantity: unit_type === "kg" ? "1kg" : 1,
    };
    addToCart(modifiedProduct);
  };

  const inCart = React.useMemo(
    () => cartItems.some((it) => it.name === title),
    [cartItems, title]
  );

  const offerColors = {
    "Best Deal": "bg-green-500",
    "Hot Offer": "bg-red-500",
    "One Day offer": "bg-red-500",
    "Super Saver": "bg-yellow-500",
    "Killer Price": "bg-yellow-500",
    "Limited Time": "bg-blue-500",
  };

  const offerColorClass = offer_id
    ? offerColors[offer_id.name] || "bg-emerald-500"
    : "";
  const percentageOff = old_price
    ? Math.round(((old_price - actual_price) / old_price) * 100)
    : 0;

  return (
    <div className=" bg-white   relative flex flex-col  justify-between z-10">
      {/* Offer Ribbon */}
      {offer_id && (
        <div className="absolute z-20 top-3 left-3">
          <span
            className="text-white text-[12px] font-bold px-2 capitalize py-1 rounded-sm"
            style={{ backgroundColor: offer_id.color_code }}
          >
            {offer_id.name}
          </span>
        </div>
      )}

      {/* Product Image */}
      <div className="flex relative items-center justify-center bg-[#D2D2D233] h-[250px] rounded-xl mb-2">
        <Image
          src={`http://localhost:8000/uploads/${image}`}
          alt={title}
          width={180}
          height={180}
          unoptimized
          className="object-cover w-[180px] h-[180px]"
        />

        {inCart ? (
          <button
            onClick={(e) => {
              e.stopPropagation();
              removeFromCart(title);
            }}
            className="absolute bottom-2 right-2 bg-[#249424] h-7 w-7 rounded-lg text-white p-1 shadow-md flex items-center justify-center hover:scale-105 transform transition"
            aria-label={`Remove ${title} from cart`}
            title="Remove from cart"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path
                fillRule="evenodd"
                d="M16.704 5.29a1 1 0 00-1.408-1.42l-7.002 6.917-2.01-1.97a1 1 0 10-1.39 1.44l2.7 2.648a1 1 0 001.4-.02l7.71-7.595z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        ) : (
          <button
            onClick={handleAddToCart}
            className="absolute bottom-2 right-2 bg-[#249424] h-7 w-7 rounded-lg  transition"
            aria-label={`Add ${title} to cart`}
          >
            <FaPlus className="text-white m-auto" />
          </button>
        )}
      </div>

      {/* Product Info */}
      <div className="flex flex-col justify-between">
        <h3 className="text-sm  tracking-tight md:text-lg h-10 md:h-14 font-semibold text-[#272727] text-left line-clamp-3">
          {title}
        </h3>

        <div>
          <span className="text-[12px] text-[#249424] font-extrabold">
            AED <span className="text-lg">{actual_price}</span>
          </span>

          {old_price && (
            <span className="text-[14px] text-[#a5a5a5] font-bold line-through ml-1">
              {old_price}
            </span>
          )}

          {old_price && (
            <p className="text-[12px] -mt-1 text-[#FFA629] font-semibold">
              <BiSolidOffer className="inline text-yellow-500" />{" "}
              {percentageOff}% OFF
            </p>
          )}
        </div>

        {/* Countdown Timer */}
        {offerActive && offer_end_date && (
          <div
            className={`offer-banner ${
              hoursRemaining < 24 ? "offerActive" : "offerExpiring"
            } w-full   px-2 py-1 rounded shadow z-30 text-[10px]`}
          >
            <Countdown
              date={new Date(offer_end_date)}
              renderer={({ days, hours, minutes, completed }) => {
                if (completed) {
                  return <span className="text-gray-500">Offer Expired</span>;
                }
                return (
                  <span className="text-white flex min-w-max items-center font-semibold">
                    <BsFillLightningChargeFill />
                    Offer ends on:{" "}
                    <span className="">
                      {hoursRemaining < 24
                        ? `${hours}h ${minutes}m`
                        : `${days}d ${hours}h ${minutes}m`}
                    </span>
                  </span>
                );
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

const ProductList = ({ products, onProductClick }) => {
  const items = products && products.length ? products : [];
  const [selectedProduct, setSelectedProduct] = React.useState(null);
  const { addToCart, cartItems, removeFromCart } = useCart(); // ✅ FIXED HERE

  const handleModalAdd = (product) => {
    const modifiedProduct = {
      ...product,
      quantity: 1,
      displayQuantity: product.unit_type === "kg" ? "1kg" : 1,
    };
    addToCart(modifiedProduct);
    setSelectedProduct(null);
  };

  const offerColors = {
    "Best Deal": "bg-green-500",
    "Hot Offer": "bg-red-500",
    "One Day offer": "bg-red-500",
    "Super Saver": "bg-yellow-500",
    "Killer Price": "bg-yellow-500",
    "Limited Time": "bg-blue-500",
  };
  const getPercentageOff = (old_price, price) => {
    if (!old_price || !price || old_price <= price) return 0;

    return Math.round(((old_price - price) / old_price) * 100);
  };

  return (
    <div className="relative  w-full pl-5">
      <div className="flex overflow-x-auto overflow-y-hidden snap-x snap-mandatory scrollbar-hide py-3 no-scrollbar gap-3">
        {items.map((p, i) => (
          <div
            key={i}
            className="flex-none w-[43%] md:w-[28%] lg:w-[23%] xl:w-[18%] snap-start"
          >
            <div onClick={() => onProductClick(p)}>
              <ProductCard product={p} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
