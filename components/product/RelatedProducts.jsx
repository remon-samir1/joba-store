"use client";

import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Heart } from "lucide-react";
import { Axios } from "../Helpers/Axios";


const mockProducts = [
  {
    id: "1",
    name: "Queen's Summer",
    subtitle: "Medium Shoulder Bags",
    price: 384,
    originalPrice: 454,
    image:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/cadd4badf0dd90d25f5e7f4b5a15251a6a065f26?width=400",
    isOnSale: true,
  },
  {
    id: "2",
    name: "Queen's Summer",
    subtitle: "Medium Shoulder Bags",
    price: 384,
    originalPrice: 454,
    image:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/cadd4badf0dd90d25f5e7f4b5a15251a6a065f26?width=400",
    isOnSale: true,
  },
  {
    id: "3",
    name: "Queen's Summer",
    subtitle: "Medium Shoulder Bags",
    price: 384,
    originalPrice: 454,
    image:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/cadd4badf0dd90d25f5e7f4b5a15251a6a065f26?width=400",
    isOnSale: true,
  },
  {
    id: "4",
    name: "Queen's Summer",
    subtitle: "Medium Shoulder Bags",
    price: 384,
    originalPrice: 454,
    image:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/cadd4badf0dd90d25f5e7f4b5a15251a6a065f26?width=400",
    isOnSale: true,
  },
];

export function RelatedProducts({slug}) {
  useEffect(()=>{
    Axios.get(`/products/${slug}/similar`).then(data=>console.log(data))
  },[])
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerView = 4;

  const nextSlide = () => {
    setCurrentIndex((prev) =>
      prev + itemsPerView >= mockProducts.length ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? Math.max(0, mockProducts.length - itemsPerView) : prev - 1
    );
  };

  return (
    <div className="space-y-8">
      <h2 className="text-4xl font-semibold text-gray-900">Related Items</h2>

      <div className="relative">
        {/* Navigation Buttons */}
        <button
          onClick={prevSlide}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 z-10 bg-white border border-gray-200 rounded-full p-3 hover:bg-gray-50 transition-colors"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 z-10 bg-white border border-gray-200 rounded-full p-3 hover:bg-gray-50 transition-colors"
        >
          <ChevronRight className="h-6 w-6" />
        </button>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {mockProducts
            .slice(currentIndex, currentIndex + itemsPerView)
            .map((product) => (
              <div
                key={product.id}
                className="relative group cursor-pointer bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="relative aspect-[3/4] bg-gradient-to-b from-transparent to-black/40">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />

                  {product.isOnSale && (
                    <div className="absolute top-4 left-4 bg-gray-100 px-2 py-1 rounded text-sm font-medium text-primary">
                      SALE
                    </div>
                  )}

                  <button className="absolute top-4 right-4 p-2 text-primary hover:text-primary/80 transition-colors">
                    <Heart className="h-6 w-6" />
                  </button>

                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="text-xl font-bold mb-1">{product.name}</h3>
                    <p className="text-sm opacity-90 mb-3">
                      {product.subtitle}
                    </p>
                    <div className="flex items-center gap-2">
                      <span className="text-primary font-medium">
                        EGP {product.price}
                      </span>
                      <span className="text-white/80 line-through text-sm">
                        ${product.originalPrice}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
