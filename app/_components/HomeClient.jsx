"use client";

import { useEffect, useState } from "react";
import Banner from "./Banner";
// import ProductList from "./ProductList";
import CTASection from "./CTASection";
import SearchBox from "./SearchBox";
import ProductModal from "./ProductModal";
import ProductCard from "./ProductList";
import Categories from "./Categories";
import { getCategory, getProduct } from "../api";

export default function HomeClient({ excelData, page1, page2, page3,  }) {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [categoriesData, setCategoriesData] = useState([]);
  const [productsData, setProductsData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getCategory();
  
        setCategoriesData(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getProduct();
        const actualProducts = data.products || [];
        setProductsData(actualProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchData();
  }, []);
  
  
  return (
    <div>
      <SearchBox
        products={excelData}
        onSelect={(item) => setSelectedProduct(item)}
      />

      <Categories categories={categoriesData} />
      <Banner />


      <h2 className="text-black mt-5 md:mt-10 md:mb-5 md:text-4xl text-lg font-extrabold pl-5">
        Best Deals
      </h2>
      <ProductCard
        products={productsData}
        onProductClick={(item) => setSelectedProduct(item)}
      />

      {/* <h2 className="text-black mt-5 md:mt-10 md:mb-5 md:text-4xl text-lg font-extrabold pl-5">
        New Arrival
      </h2>
      <ProductCard
        products={page2}
        onProductClick={(item) => setSelectedProduct(item)}
      />

      <h2 className="text-black mt-5 md:mt-10 md:mb-5 md:text-4xl text-lg font-extrabold pl-5">
       Bestsellers
      </h2>
      <ProductCard
        products={page3}
        onProductClick={(item) => setSelectedProduct(item)}
      /> */}

      <div className="mt-5 px-5 pb-5">
        <CTASection />
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
