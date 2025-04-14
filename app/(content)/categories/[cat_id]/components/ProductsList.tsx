"use client"; // Mark this component as a client component

import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";

type Subcategory = {
  subcat_id: string;
  subcat_name: string;
  products: Array<{
    product_id: string;
    product_name: string;
    product_img: string;
    unit: string;
  }>;
};

type ProductsListProps = {
  subcategories: Subcategory[];
};

export default function ProductsList({ subcategories }: ProductsListProps) {
  const [loading, setLoading] = useState(true); // Loading state

  // Simulate a delay to show the loader
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000); // Adjust delay if needed
    return () => clearTimeout(timer);
  }, []);

  // Skeleton Loader for Subcategories and Products
  const SkeletonLoader = () => (
    <div className="space-y-8">
      {[...Array(3)].map((_, index) => (
        <div key={index} className="space-y-4">
          {/* Skeleton for Subcategory Name */}
          <div className="h-6 w-48 bg-[#CC4B27]/50 rounded animate-pulse" />

          {/* Skeleton for Product Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, idx) => (
              <div key={idx} className="w-full h-64 bg-[#317039]/50 rounded-lg animate-pulse" />
            ))}
          </div>
        </div>
      ))}
    </div>
  );

  if (loading) {
    return <SkeletonLoader />;
  }

  if (subcategories.length === 0) {
    return <p>No subcategories or products found.</p>;
  }

  return (
    <>
      {subcategories.map((subcategory) => (
        <div key={subcategory.subcat_id} className="mb-8">
          {/* Subcategory Name */}
          <h2 className="text-2xl font-medium mb-4">{subcategory.subcat_name}</h2>

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {subcategory.products.map((product) => (
              <ProductCard
                key={product.product_id}
                product={product}
                subcat_name={subcategory.subcat_name}
              />
            ))}
          </div>
        </div>
      ))}
    </>
  );
}