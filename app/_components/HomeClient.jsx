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

export default function HomeClient() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [categoriesData, setCategoriesData] = useState([]);
  const [productsData, setProductsData] = useState([]);
  const [groupedByRow, setGroupedByRow] = useState({});
  
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
        
        // Group products by row_id
        const grouped = actualProducts.reduce((acc, product) => {
          const rowName = product.row_id?.name || 'Other Products';
          if (!acc[rowName]) {
            acc[rowName] = [];
          }
          acc[rowName].push(product);
          return acc;
        }, {});
        
        setGroupedByRow(grouped);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchData();
  }, []);
  
  
  return (
    <div>
      <SearchBox
        products={productsData}
        onSelect={(item) => setSelectedProduct(item)}
      />

      <Categories categories={categoriesData} />
      <Banner />

      {/* Display products grouped by row */}
      {Object.keys(groupedByRow).map((rowName) => (
        <div key={rowName}>
          <h2 className="text-black mt-5 md:mt-10 md:mb-5 md:text-4xl text-lg font-extrabold pl-5">
            {rowName}
          </h2>
          <ProductCard
            products={groupedByRow[rowName]}
            onProductClick={(item) => setSelectedProduct(item)}
          />
        </div>
      ))}

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
