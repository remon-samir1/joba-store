"use client";

import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Info } from "lucide-react";
import { useParams } from "react-router-dom";
import axios from "axios";

export function ProductHero({
  name,
  price,
  rating,
  reviews,
  image,
  additionalImages = [],
  inStock,
}) {
  const [allImages , setAllImages] = useState([])
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [products , setProducts]=useState([])

  
  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % additionalImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prev) => (prev - 1 + allImages.length) % additionalImages.length
    );
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-8">
      {/* Product Image */}
      <div className="relative">
        <div className="aspect-square bg-white border border-gray-200 rounded-lg overflow-hidden">
          <img
            src={additionalImages[currentImageIndex]?.path}
            alt={name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Image Navigation */}
        {additionalImages.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white border border-gray-200 rounded-full p-2 hover:bg-gray-50 transition-colors"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white border border-gray-200 rounded-full p-2 hover:bg-gray-50 transition-colors"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </>
        )}

        {/* Thumbnail Navigation */}
        {additionalImages.length > 1 && (
          <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
            {additionalImages.map((img, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 bg-white border rounded-lg overflow-hidden transition-colors ${
                  index === currentImageIndex
                    ? "border-primary border-2"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <img
                  src={img.path}
                  alt={`${name} view ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="space-y-6">
        <div>
          <h1 className="text-4xl font-semibold text-gray-900 mb-4">{name}</h1>
          <div className="text-3xl font-semibold text-primary mb-6">
             {price}
          </div>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-6">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`h-4 w-4 ${
                    i < Math.floor(rating)
                      ? "text-yellow-400 fill-current"
                      : "text-gray-300 fill-current"
                  }`}
                  viewBox="0 0 20 20"
                >
                  <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                </svg>
              ))}
            </div>
            <span className="text-sm text-gray-600">
              {rating} ({reviews} comment{reviews !== 1 ? "s" : ""})
            </span>
          </div>

          {/* Stock Status and Request Button */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-2">
              <Info className="h-6 w-6 text-primary" />
              <span className="text-gray-900">
                {inStock ? "In stock" : "Out of stock"}
              </span>
            </div>
            {!inStock && (
              <button
                onClick={() => {
                  const orderForm = document.getElementById("order-form");
                  if (orderForm) {
                    orderForm.scrollIntoView({ behavior: "smooth" });
                  } else {
                    alert("Please scroll down to fill the order request form");
                  }
                }}
                className="bg-primary hover:bg-primary/90 text-white px-6 sm:px-8 py-3 rounded-lg font-semibold transition-colors w-full sm:w-auto"
              >
                Request Now
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
