 import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import {
  ChevronRight,
  ChevronLeft,
  Heart,
  ShoppingCart,
  Star,
  Loader2
} from "lucide-react";
import axios from "axios";
import { Axios, baseURL } from "../../components/Helpers/Axios";
import { toast } from "react-toastify";
import Notifcation from "../../components/Notification";
import Testimonials from "./Testmonials";

// Hero slides data
const heroSlides = [
  {
    id: 1,
    title: "Sort out Your Spring Look",
    subtitle:
      "We will help to develop every smallest thing into a big one for your company.",
    image:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/b75262aa522b68f50318332a046e2f24447b13ba?width=2880",
    buttonText: "SHOP NOW",
    buttonLink: "/categories",
  },
  {
    id: 2,
    title: "Discover Natural Wellness",
    subtitle:
      "Premium natural health products and supplements designed to support your wellness journey with proven results.",
    image:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/e93acb395af83e4dfe38743a56243625c349d4cd?width=2880",
    buttonText: "EXPLORE NOW",
    buttonLink: "/categories",
  },
  {
    id: 3,
    title: "Pure Essential Oils",
    subtitle:
      "Experience the therapeutic power of nature with our premium collection of pure, therapeutic-grade essential oils.",
    image:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/cadd4badf0dd90d25f5e7f4b5a15251a6a065f26?width=2880",
    buttonText: "SHOP OILS",
    buttonLink: "/categories",
  },
];

// Hero Section Component
function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-slide every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + heroSlides.length) % heroSlides.length,
    );
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <section className="relative h-[400px] sm:h-[500px] lg:h-[664px] bg-gray-900 overflow-hidden">
      {/* Slides */}
      {heroSlides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-transform duration-500 ease-in-out ${
            index === currentSlide
              ? "translate-x-0"
              : index < currentSlide
              ? "-translate-x-full"
              : "translate-x-full"
          }`}
        >
          {/* Background Image with Overlay */}
          <div className="absolute inset-0">
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/70"></div>
          </div>

          {/* Content */}
          <div className="relative z-10 flex items-center justify-center h-full px-4 sm:px-6">
            <div className="text-center max-w-4xl">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 leading-tight">
                {slide.title}
              </h1>
              <p className="text-white text-base sm:text-lg mb-8 sm:mb-10 lg:mb-14 max-w-2xl mx-auto px-4">
                {slide.subtitle}
              </p>
              <Link to={slide.buttonLink}>
                <button className="inline-flex items-center gap-2 bg-primary text-white px-4 sm:px-6 py-3 sm:py-4 rounded-lg font-bold text-base sm:text-lg hover:bg-primary/90 transition-colors">
                  {slide.buttonText}
                  <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
                </button>
              </Link>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows - Hidden on mobile */}
      <button
        onClick={prevSlide}
        className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 bg-white/20 hover:bg-white/30 rounded-full md:flex items-center justify-center transition-colors backdrop-blur-sm hidden sm:flex"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 bg-white/20 hover:bg-white/30 rounded-full md:flex items-center justify-center transition-colors backdrop-blur-sm hidden sm:flex"
        aria-label="Next slide"
      >
        <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full transition-colors ${
              index === currentSlide ? "bg-white" : "bg-white/50"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}

// Loading Skeleton Component
function SkeletonLoader({ type = "card", count = 4 }) {
  if (type === "category") {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 lg:grid-rows-2 gap-4 auto-rows-fr lg:h-[800px]">
        {Array.from({ length: count }).map((_, index) => (
          <div
            key={index}
            className={`relative overflow-hidden rounded-lg bg-gray-200 animate-pulse ${
              index === 0
                ? "sm:col-span-2 lg:col-span-2 lg:row-span-2 h-64 sm:h-80 lg:h-full"
                : "h-48 sm:h-56 lg:h-full"
            }`}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <div className="absolute bottom-4 sm:bottom-6 lg:bottom-8 left-4 sm:left-6 lg:left-8">
              <div
                className={`h-6 bg-gray-300 rounded ${
                  index === 0 ? "w-3/4 mb-4" : "w-1/2"
                }`}
              ></div>
              {index === 0 && (
                <>
                  <div className="h-4 bg-gray-300 rounded w-5/6 mb-4"></div>
                  <div className="h-4 bg-gray-300 rounded w-4/6 mb-4"></div>
                  <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (type === "product") {
    return (
      <div className="overflow-x-auto pb-4">
        <div className="flex gap-3 sm:gap-4 w-fit">
          {Array.from({ length: count }).map((_, index) => (
            <div key={index} className="w-64 sm:w-72 flex-shrink-0">
              <div className="relative w-full h-80 sm:h-96 lg:h-[408px] rounded-lg overflow-hidden bg-gray-200 animate-pulse">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute top-4 right-4 w-8 h-8 bg-gray-300 rounded-full"></div>
                <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6 text-white">
                  <div className="text-center mb-4 sm:mb-6">
                    <div className="h-6 bg-gray-300 rounded w-3/4 mx-auto mb-2"></div>
                    <div className="h-4 bg-gray-300 rounded w-1/2 mx-auto mb-3"></div>
                    <div className="h-4 bg-gray-300 rounded w-1/3 mx-auto mb-4"></div>
                    <div className="w-8 h-0.5 bg-gray-300 mx-auto"></div>
                  </div>
                  <div className="w-full h-10 bg-gray-300 rounded"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center h-64">
      <Loader2 className="h-12 w-12 text-primary animate-spin" />
    </div>
  );
}

// Empty State Component
function EmptyState({ message, icon: Icon = ShoppingCart }) {
  return (
    <div className="flex flex-col items-center justify-center py-12 bg-gray-50 rounded-lg">
      <div className="bg-gray-200 rounded-full p-4 mb-4">
        <Icon className="h-12 w-12 text-gray-500" />
      </div>
      <h3 className="text-xl font-medium text-gray-700 mb-2">No data available</h3>
      <p className="text-gray-500 text-center max-w-md">{message}</p>
    </div>
  );
}

// Categories Section Component
function Categories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const response = await Axios.get("/categories");
        setCategories(response.data.data.data.slice(-4));
      } catch (err) {
        console.error("Error fetching categories:", err);
        setError("Failed to load categories. Please try again later.");
        toast.error("Failed to load categories");
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground">
            Categories
          </h2>
          <Link to="/categories">
            <button className="text-primary text-lg sm:text-xl lg:text-2xl font-bold hover:text-primary/80">
              See All
            </button>
          </Link>
        </div>

        {/* Loading State */}
        {loading && <SkeletonLoader type="category" />}

        {/* Error State */}
        {error && !loading && (
          <EmptyState 
            message="We encountered an issue loading categories. Please try again later." 
            icon={Loader2}
          />
        )}

        {/* Empty State */}
        {!loading && !error && categories.length === 0 && (
          <EmptyState 
            message="No categories available at the moment. Check back soon!" 
          />
        )}

        {/* Dynamic Categories Grid */}
        {!loading && !error && categories.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 lg:grid-rows-2 gap-4 auto-rows-fr lg:h-[800px]">
            {categories?.map((category, index) => (
              <Link
                to={`/categories/${category.slug || category.id}`}
                key={category.id}
                className={`relative overflow-hidden rounded-lg group cursor-pointer 
                  ${
                    index === 0
                      ? "sm:col-span-2 lg:col-span-2 lg:row-span-2 h-64 sm:h-80 lg:h-full"
                      : "h-48 sm:h-56 lg:h-full"
                  }`}
              >
                <img
                  src={category.image || "https://via.placeholder.com/300"}
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 sm:bottom-6 lg:bottom-8 left-4 sm:left-6 lg:left-8 text-white">
                  <h3
                    className={`font-bold leading-tight ${
                      index === 0
                        ? "text-2xl sm:text-3xl lg:text-4xl xl:text-5xl mb-2 sm:mb-4 lg:mb-6"
                        : "text-lg sm:text-xl"
                    }`}
                  >
                    {category.name}
                  </h3>
                  {index === 0 && (
                    <>
                      <p className="text-sm sm:text-base lg:text-lg mb-4 sm:mb-6 lg:mb-8 max-w-md opacity-90">
                        {category.description ||
                          "Lorem Ipsum is simply dummy text of the printing and typesetting industry."}
                      </p>
                      <button className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-primary rounded-full text-white hover:bg-primary/90 transition-colors">
                        <ChevronRight className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8" />
                      </button>
                    </>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

// Product Card Component
function ProductCard({
  name,
  category,
  id,
  isWishlisted,
  images,
  setIsWishlisted,
  product_size_id,
  is_favorite,
  handleAddToCart,
  slug,
  price,
  originalPrice,
  handleAddToWishlist,
  image,
  onSale = false,
  variant = "overlay",
}) {
  if (variant === "overlay") {
    return (
      <div className="relative w-full h-80 sm:h-96 lg:h-[408px] rounded-lg overflow-hidden group cursor-pointer">
        <img
          src={images?.[0]?.path || "https://via.placeholder.com/300"}
          alt={name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>

        {/* Sale Badge */}
        {onSale && (
          <div className="absolute top-3 sm:top-4 left-3 sm:left-4 bg-gray-100 text-primary px-2 sm:px-3 py-1 rounded text-xs sm:text-sm font-medium">
            SALE
          </div>
        )}

        {/* Heart Icon */}
        <button
          onClick={(e) => {
            handleAddToWishlist(e, slug, is_favorite);
          }}
          className="absolute top-3 sm:top-4 right-3 sm:right-4 w-7 h-7 sm:w-8 sm:h-8 bg-white/50 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/70 transition-colors"
        >
          <Heart
            className={`h-4 w-4 ${is_favorite && "fill-red-500 text-red-500"}`}
          />
        </button>

        {/* Product Info */}
        <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6 text-white">
          <div className="text-center mb-4 sm:mb-6">
            <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-1 sm:mb-2">
              {name}
            </h3>
            <p className="text-xs sm:text-sm opacity-90 mb-3 sm:mb-4">
              {category}
            </p>
            <div className="flex items-center justify-center gap-2 mb-3 sm:mb-4">
              <span className="text-primary font-medium text-sm sm:text-base">
                ${price}
              </span>
              {originalPrice && (
                <span className="text-white/70 line-through text-sm sm:text-base">
                  ${originalPrice}
                </span>
              )}
            </div>
            <div className="w-8 sm:w-10 h-0.5 bg-white mx-auto"></div>
          </div>
          <button className="w-full bg-primary text-white py-2.5 sm:py-3 rounded flex items-center justify-center gap-2 font-medium hover:bg-primary/90 transition-colors text-sm sm:text-base">
            <ShoppingCart className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            Show Details
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg overflow-hidden group cursor-pointer">
      <div className="relative">
        <img
          src={image || "https://via.placeholder.com/300"}
          alt={name}
          className="w-full h-80 sm:h-96 lg:h-[408px] object-cover"
        />

        {/* Sale Badge */}
        {onSale && (
          <div className="absolute top-4 sm:top-6 left-4 sm:left-6 bg-gray-100 text-primary px-2 sm:px-3 py-1 rounded text-xs sm:text-sm font-medium">
            SALE
          </div>
        )}

        {/* Heart Icon */}
        <button className="absolute top-4 sm:top-6 right-4 sm:right-6 w-7 h-7 sm:w-8 sm:h-8 bg-white/50 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/70 transition-colors">
          {is_favorite ? (
            <Heart className="h-4 w-4 fill-red-500 text-red-500" />
          ) : (
            <Heart className="h-4 w-4" />
          )}
        </button>

        {/* Product Info Overlay */}
        <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6">
          <div className="bg-black/40 backdrop-blur-sm rounded-lg p-3 sm:p-4 text-white">
            <div className="text-center mb-3 sm:mb-4">
              <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-1 sm:mb-2">
                {name}
              </h3>
              <p className="text-xs sm:text-sm opacity-90">{category}</p>
            </div>
            <div className="flex items-center justify-between">
              <button className="w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors">
                <ShoppingCart className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
              </button>
              <div className="text-right">
                <span className="text-base sm:text-lg font-medium">
                  EGP {price}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// New Products Section
function NewProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await Axios.get("/products");
        setProducts(response.data.data);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Failed to load new products. Please try again later.");
        toast.error("Failed to load new products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const [isWishlisted, setIsWishlisted] = useState([]);

  const handleAddToWishlist = async (e, slug, is_favorite) => {
    e.stopPropagation();
    e.preventDefault();
    setIsWishlisted(slug);
    try {
      if (is_favorite) {
        await Axios.delete(`/wishlist/${slug}`).then(() => {
          toast.success(`Removed From wishlist!`);

          setProducts(
            products.map((prev) =>
              prev.slug == slug ? { ...prev, is_favorite: false } : prev,
            ),
          );
        });
      } else {
        await Axios.post(`/wishlist/${slug}`).then(() => {
          toast.success(`Added to wishlist!`);
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

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-background">
      <Notifcation />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground">
            New Products
          </h2>
          <Link to="/products">
            <button className="text-primary text-lg sm:text-xl lg:text-2xl font-bold hover:text-primary/80">
              See All
            </button>
          </Link>
        </div>

        {/* Loading State */}
        {loading && <SkeletonLoader type="product" count={4} />}

        {/* Error State */}
        {error && !loading && (
          <EmptyState 
            message="We encountered an issue loading new products. Please try again later." 
            icon={Loader2}
          />
        )}

        {/* Empty State */}
        {!loading && !error && products.length === 0 && (
          <EmptyState 
            message="No new products available at the moment. Check back soon!" 
          />
        )}

        {/* Products Scroll */}
        {!loading && !error && products.length > 0 && (
          <div className="overflow-x-auto pb-4">
            <div className="flex gap-3 sm:gap-4 w-fit">
              {products?.map((product, index) => (
                <div key={index} className="w-64 sm:w-72 flex-shrink-0">
                  <Link to={`/products/${product?.id}`}>
                    <ProductCard
                      setIsWishlisted={setIsWishlisted}
                      isWishlisted={isWishlisted}
                      handleAddToWishlist={handleAddToWishlist}
                      slug={product.slug}
                      id={product.id}
                      images={product?.images}
                      is_favorite={product.is_favorite}
                      name={product.name.en}
                      price={product.price}
                      originalPrice={product.price}
                      image={product.image}
                      title={product.title}
                      category={product.category?.name || "Uncategorized"}
                      variant="overlay"
                    />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

// Best Seller Section
function BestSeller() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchBestSellers = async () => {
      try {
        setLoading(true);
        const response = await Axios.get("/best-sellers");
        setProducts(response.data.data);
      } catch (err) {
        console.error("Error fetching best sellers:", err);
        setError("Failed to load best sellers. Please try again later.");
        toast.error("Failed to load best sellers");
      } finally {
        setLoading(false);
      }
    };

    fetchBestSellers();
  }, []);

  const handleAddToWishlist = async (e, slug, is_favorite) => {
    e.stopPropagation();
    e.preventDefault();
    try {
      if (is_favorite) {
        await Axios.delete(`/wishlist/${slug}`).then(() => {
          toast.success(`Removed From wishlist!`);

          setProducts(
            products.map((prev) =>
              prev.slug == slug ? { ...prev, is_favorite: false } : prev,
            ),
          );
        });
      } else {
        await Axios.post(`/wishlist/${slug}`).then(() => {
          toast.success(`Added to wishlist!`);
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

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground">
            Best Seller
          </h2>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="bg-gray-200 rounded-lg overflow-hidden animate-pulse h-80 sm:h-96 lg:h-[408px]"></div>
            ))}
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <EmptyState 
            message="We encountered an issue loading best sellers. Please try again later." 
            icon={Loader2}
          />
        )}

        {/* Empty State */}
        {!loading && !error && products.length === 0 && (
          <EmptyState 
            message="No best sellers available at the moment. Check back soon!" 
          />
        )}

        {/* Products Grid */}
        {!loading && !error && products.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {products?.map((product, index) => (
              <Link key={index} to={`/products/${product?.id}`}>
                <ProductCard
                  handleAddToWishlist={handleAddToWishlist}
                  slug={product.slug}
                  id={product.id}
                  is_favorite={product.is_favorite}
                  name={product.name.en}
                  price={product.price}
                  originalPrice={product.price}
                  image={product.image}
                  title={product.title}
                  category={product.category?.name || "Uncategorized"}
                  variant="overlay"
                />
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

// Discount Section
function DiscountSection() {
  return (
    <section className="h-64 sm:h-80 lg:h-[496px] bg-gray-200 relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/e93acb395af83e4dfe38743a56243625c349d4cd?width=2880"
          alt="March discount background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-2xl">
            <p className="text-white text-lg sm:text-xl lg:text-2xl font-semibold mb-4 sm:mb-6 lg:mb-8">
              March Discount
            </p>
            <h2 className="text-white text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6 lg:mb-8 leading-tight">
              Up to 70% off
            </h2>
            <p className="text-white text-sm sm:text-base lg:text-xl mb-6 sm:mb-8 lg:mb-10 leading-relaxed max-w-xl">
              Lorem ipsum dolor sit amet consectetur. Suscipit quisque et ac
              velit viverra commodo diam. Adipiscing viverra integer blandit
              rutrum tellus tempus.
            </p>
            <button className="inline-flex items-center gap-2 bg-white text-primary px-4 sm:px-6 py-3 sm:py-4 rounded-lg font-bold text-base sm:text-lg hover:bg-gray-100 transition-colors">
              Got it
              <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

// Main Homepage Component
export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <Categories />
      <NewProducts />
      <DiscountSection />
      <BestSeller />
      <Testimonials />
      <Footer />
    </div>
  );
}