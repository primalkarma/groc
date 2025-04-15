"use client"; // Mark this component as a client component

import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

type Category = {
  cat_id: string;
  cat_name: string;
  cat_img: string;
};

type CategoriesListProps = {
  categories: Category[];
  errorMessage: string | null;
};

export default function CategoriesList({ categories, errorMessage }: CategoriesListProps) {
  const [loading, setLoading] = useState(true); // Loading state

  // Simulate a delay to show the loader
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500); // Adjust delay if needed
    return () => clearTimeout(timer);
  }, []);

  // Skeleton Loader for Categories
  const SkeletonLoader = () => (
    <div className="grid grid-cols-2 md:grid-cols-2 gap-6">
      {[...Array(6)].map((_, index) => (
        <div key={index} className="w-full">
          <Card className="w-full">
            <CardHeader>
              {/* Skeleton for Category Image */}
              <div className="relative w-full aspect-[4/3] bg-sidebar/50 rounded-lg overflow-hidden mb-4 animate-pulse" />

              {/* Skeleton for Category Name */}
              <CardTitle className="h-6 w-3/4 bg-primary/50 rounded animate-pulse" />
            </CardHeader>
          </Card>
        </div>
      ))}
    </div>
  );

  if (loading) {
    return <SkeletonLoader />;
  }

  if (errorMessage) {
    return (
      <div className="col-span-full text-center text-destructive">
        <p>{errorMessage}</p>
      </div>
    );
  }

  if (categories.length === 0) {
    return (
      <div className="col-span-full text-center">
        <p>No categories found.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4">
      {categories.map((category) => (
        <Link
          key={category.cat_id}
          href={`/categories/${category.cat_id}`}
          aria-label={`View ${category.cat_name} category`}
        >
          <Card
            className="max-w-sm mx-auto bg-card transition-transform duration-300 ease-in-out hover:scale-[1.05] focus:outline-none focus:ring-2 focus:ring-ring"
            role="button"
            tabIndex={0}
          >
            <CardHeader>
              <div className="relative w-full aspect-[4/3] bg-card rounded-lg overflow-hidden mb-4">
                <Image
                  src={category.cat_img || "/placeholder.svg"}
                  alt={category.cat_name}
                  fill
                  className="object-contain p-8"
                  style={{ objectFit: "contain" }}
                  loading="lazy"
                  quality={75}
                />
              </div>
              <CardTitle className="text-center text-card-foreground tracking-tight font-semibold text-2xl truncate p-2">
                {category.cat_name}
              </CardTitle>
            </CardHeader>
          </Card>
        </Link>
      ))}
    </div>
  );
}