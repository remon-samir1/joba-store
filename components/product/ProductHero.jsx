"use client";

import { useContext, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Info } from "lucide-react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { CartCh } from "../../Context/CartContext";

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
    <div className="w-full shrink-0 mp-28 px-[10vw] gap-8 lg:gap-12 mb-8">
      {/* Product Image */}
      <div className="relative flex justify-center flex-col items-center">
        <div className="aspect-square !w-[200px] bg-white  border-gray-200 rounded-lg overflow-hidden">
          <img
            src={additionalImages[currentImageIndex]?.path}
            alt={name}
            className="w-[80%] h-[400px] object-cover"
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

    </div>
  );
}
