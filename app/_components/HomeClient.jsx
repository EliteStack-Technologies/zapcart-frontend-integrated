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
  const [sortedSections, setSortedSections] = useState([]);
  
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
        
        // Group products by section_id and collect section info
        const sectionMap = new Map();
        
        actualProducts.forEach((product) => {
          const sectionId = product.section_id?._id;
          const sectionName = product.section_id?.name || 'Other Products';
          const sectionOrder = product.section_id?.order ?? 999; // Default to 999 if no order
          
          if (!sectionMap.has(sectionId || 'other')) {
            sectionMap.set(sectionId || 'other', {
              name: sectionName,
              order: sectionOrder,
              products: []
            });
          }
          
          sectionMap.get(sectionId || 'other').products.push(product);
        });
        
        // Convert map to array and sort by order
        const sectionsArray = Array.from(sectionMap.values()).sort((a, b) => a.order - b.order);
        
        setSortedSections(sectionsArray);
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

      {/* Display products grouped by section, sorted by order */}
      {sortedSections.map((section, index) => (
        <div key={section.name + index}>
          <h2 className="text-black mt-5 md:mt-10 md:mb-5 md:text-4xl text-lg font-extrabold pl-5">
            {section.name}
          </h2>
          <ProductCard
            products={section.products}
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
