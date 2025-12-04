"use client";

import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import Image from "next/image";
import banner_1 from "../../public/banner_1.svg";
import banner_2 from "../../public/banner_2.svg";
import banner_3 from "../../public/banner_3.svg";

// Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa6";
import { getBanners } from "../api";

const BannerSwiper = () => {
  const images = [banner_1, banner_2, banner_3];
    const [banners, setBanners] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getBanners();
        setBanners(data);
      } catch (error) {
        console.error("Error fetching banners:", error);
      }
    };
    fetchData();
  }, []);
  return (
    <div className="w-full px-5  ">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        slidesPerView={1}
        pagination={{ clickable: true }}
        autoplay={{ delay: 3500, disableOnInteraction: false }}
        loop
        className="rounded-2xl overflow-hidden"
      >
        {banners.map((banner, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-[20vh] md:h-[50vh] rounded-2xl overflow-hidden">
              <Image
                  src={`${import.meta.env.NEXT_PUBLIC_API_IMG_URL}/uploads/${banner.image_url}`}
                alt={`Banner image ${index + 1}`}
                fill
                style={{ objectFit: "cover" }}
                className="rounded-2xl "
                priority={index === 0}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="text-white flex justify-center items-center bg-[#118b08]  transition-all duration-300 text-sm font-semibold px-6 py-3 rounded-xl shadow-md hover:shadow-lg cursor-pointer mt-2">
        <Link
          href="/weekly-offers.pdf"
          target="_blank"
          rel="noopener noreferrer"
        >
          Download our flyer collections{" "}
          <FaArrowRight className="inline ml-2" />
        </Link>
      </div>
    </div>
  );
};

export default BannerSwiper;
