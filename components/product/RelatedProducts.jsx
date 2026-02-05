"use client";

import { useEffect, useState, useRef } from "react";
import { ChevronLeft, ChevronRight, Heart } from "lucide-react";
import { Axios, baseURL } from "../Helpers/Axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export function RelatedProducts({ slug }) {
  const [products, setProducts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(4);
  const sliderRef = useRef(null);
  const autoSlideInterval = useRef(null);

  useEffect(() => {
    Axios.get(`/products/${slug}/similar`).then((data) => {
      setProducts(data.data.data);
    }, []);

    const handleResize = () => {
      if (window.innerWidth < 640) setItemsPerView(1);
      else if (window.innerWidth < 1024) setItemsPerView(2);
      else setItemsPerView(4);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [slug]);

  useEffect(() => {
    if (products.length <= itemsPerView) return;

    autoSlideInterval.current = setInterval(() => {
      goToNext();
    }, 5000);

    return () => clearInterval(autoSlideInterval.current);
  }, [currentIndex, itemsPerView, products.length]);

  const goToNext = () => {
    setCurrentIndex((prev) => {
      if (prev + 1 > products.length - itemsPerView) return 0;
      return prev + 1;
    });
  };

  const goToPrev = () => {
    setCurrentIndex((prev) => {
      if (prev === 0) return Math.max(0, products.length - itemsPerView);
      return prev - 1;
    });
  };

  const getItemWidth = () => {
    if (!sliderRef.current) return "100%";
    const containerWidth = sliderRef.current.offsetWidth;
    return `${containerWidth / itemsPerView}px`;
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-EG", {
      style: "currency",
      currency: "EGP",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const handleAddToWishlist = async (e, slug, is_favorite) => {
    e.stopPropagation();
    e.preventDefault();
    try {
      if (is_favorite) {
        const response = await Axios.delete(`/wishlist/${slug}`).then(() => {
          toast.success(`Removed From wishlist !`);

          setProducts(
            products.map((prev) =>
              prev.slug == slug ? { ...prev, is_favorite: false } : prev,
            ),
          );
        });
      } else {
        const response = await Axios.post(`/wishlist/${slug}`).then(() => {
          toast.success(`Added to wishlist !`);
          setProducts(
            products.map((prev) =>
              prev.slug == slug ? { ...prev, is_favorite: true } : prev,
            ),
          );
        });
      }
    } catch (error) {
      console.error("Error adding to wishlist:", error);
      toast.error("Failed to add to wishlist. Please try again.");
    }
  };
  const {t , i18n} = useTranslation()

  return (
    <div className="space-y-8 mt-8 relative">
      <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 px-4">
        {t("Related Items")}
      </h2>

      <div className="relative overflow-hidden group">
        <button
          onClick={goToPrev}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white border border-gray-200 rounded-full p-2 hover:bg-gray-50 transition-all opacity-0 group-hover:opacity-100 shadow-md"
          aria-label="Previous products"
        >
          <ChevronLeft className="h-5 w-5 text-gray-700" />
        </button>

        <button
          onClick={goToNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white border border-gray-200 rounded-full p-2 hover:bg-gray-50 transition-all opacity-0 group-hover:opacity-100 shadow-md"
          aria-label="Next products"
        >
          <ChevronRight className="h-5 w-5 text-gray-700" />
        </button>

        <div ref={sliderRef} className="overflow-x-hidden py-4">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`,
            }}
          >
            {products.length === 0 ? (
              <div className="flex justify-center p-20 w-full">
                <p className="text-gray-600">
                  {t("No Related Products For This Product !")}
                </p>
              </div>
            ) : (
              products.map((product) => (
                <Link 
                onClick={()=>window.location.pathname=`/products/${product.slug}`}
                  key={product.id}
                  className="flex-shrink-0 px-2 transition-all duration-300 hover:scale-[1.02]"
                  style={{ width: `calc(100% / ${itemsPerView})` }}
                >
                  <div className="relative group cursor-pointer bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all h-80 lg:h-[408px]">
                    <div className="relative h-full w-full bg-gradient-to-b from-transparent to-black/40">
                      <img
                        src={product.images[0]?.path}
                        alt={
                          i18n.language === "ar"
                            ? product.name?.ar || product.name?.en
                            : product.name?.en
                        }
                        className="w-full h-full object-cover"
                      />

                      {product.sale && (
                        <div className="absolute top-4 left-4 bg-red-500 px-3 py-1 rounded-full text-xs font-bold text-white">
                          SALE
                        </div>
                      )}

                      <button
                        onClick={(e) =>
                          handleAddToWishlist(
                            e,
                            product.slug,
                            product.is_favorite,
                          )
                        }
                        className="absolute top-4 right-4 p-2 bg-white/80 rounded-full hover:bg-white transition-colors"
                      >
                        <Heart
                          className={`h-4 w-4 ${
                            product.is_favorite && "fill-red-500 text-red-500"
                          }`}
                        />
                      </button>

                      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent text-white">
                        <h3 className="text-lg font-bold mb-1 line-clamp-1">
                          {i18n.language === "ar"
                            ? product.name?.ar || product.name?.en
                            : product.name?.en}
                        </h3>
                        <div className="flex items-center gap-2">
                          <span className="text-primary font-bold">
                          ${  product.sizes[0]?.price - +product.discount_price }

                          </span>
                          {product.price && (
                              <span className="original-price text-gray-800">
                              {product.discount_price ? product.sizes[0]?.price : '' }
                              </span>
                            )}
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
