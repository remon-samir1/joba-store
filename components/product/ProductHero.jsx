"use client";

import { useEffect, useState, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function ProductHero({
  name,
  price,
  rating,
  reviews,
  image,
  additionalImages = [],
  inStock,
}) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [loaded, setLoaded] = useState(true);
  const preloadedImages = useRef({});
  
  // تحميل جميع الصور مسبقاً عند التحميل الأولي
  useEffect(() => {
    additionalImages.forEach((img, index) => {
      const imgObj = new Image();
      imgObj.src = img.path;
      imgObj.onload = () => {
        preloadedImages.current[index] = imgObj;
      };
    });
  }, [additionalImages]);

  // التبديل الفوري للصور المحملة مسبقاً
  const switchImage = (index) => {
    if (preloadedImages.current[index]) {
      setCurrentImageIndex(index);
      setLoaded(true);
    } else {
      setLoaded(false);
      setCurrentImageIndex(index);
    }
  };

  const nextImage = () => {
    const nextIndex = (currentImageIndex + 1) % additionalImages.length;
    switchImage(nextIndex);
  };

  const prevImage = () => {
    const prevIndex = (currentImageIndex - 1 + additionalImages.length) % additionalImages.length;
    switchImage(prevIndex);
  };

  return (
    <div className="w-full shrink-0 mp-28 px-[10vw] gap-8 lg:gap-12 mb-8">
      <div className="relative flex justify-center flex-col items-center">
        <div className="w-[400px] h-[400px] bg-white border-gray-200 rounded-lg overflow-hidden">
          <img
            src={additionalImages[currentImageIndex]?.path}
            alt={name}
            className={`w-full h-full object-cover transition-opacity duration-300 ${loaded ? "opacity-100" : "opacity-0"}`}
            onLoad={() => setLoaded(true)}
            onError={() => setLoaded(true)}
          />
          
          {!loaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
              <div className="w-12 h-12 border-t-2 border-primary rounded-full animate-spin"></div>
            </div>
          )}
        </div>

        {additionalImages.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white border border-gray-200 rounded-full p-2 hover:bg-gray-50 transition-colors z-10"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white border border-gray-200 rounded-full p-2 hover:bg-gray-50 transition-colors z-10"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </>
        )}

        {additionalImages.length > 1 && (
          <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
            {additionalImages.map((img, index) => (
              <button
                key={index}
                onClick={() => switchImage(index)}
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