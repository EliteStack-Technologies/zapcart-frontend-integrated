"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import CategoryClient from "../../_components/CategoryClient";
import { getCategoryProducts } from "../../api";

export default function CategoryPage() {
  const params = useParams();
  const id = params.id;
  
  const [categoryProducts, setCategoryProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        setError(null);
        const response = await getCategoryProducts(id);
        setCategoryProducts(response || []);
      } catch (err) {
        console.error("Error fetching category products:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl font-bold text-gray-800">Loading...</h1>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl font-bold text-gray-800">Failed to load products</h1>
      </div>
    );
  }
console.log(categoryProducts,'categoryProductscategoryProductscategoryProducts');

  return ( 
    <CategoryClient
      products={categoryProducts}
    />
  );
}
