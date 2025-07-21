"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Search,
  Filter,
  Grid,
  List,
  ChevronDown,
  Heart,
  ShoppingCart,
  Star,
} from "lucide-react";

// Mock search results - in a real app, this would be fetched from an API
const searchProducts = (query: string) => {
  const allProducts = [
    {
      id: 1,
      name: "Joint Pain Relief",
      description: "Natural joint pain relief formula",
      price: 384,
      originalPrice: 454,
      image:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/cadd4badf0dd90d25f5e7f4b5a15251a6a065f26?width=400",
      category: "Medical Mixtures",
      onSale: true,
      rating: 4.8,
      reviews: 124,
    },
    {
      id: 2,
      name: "Lavender Essential Oil",
      description: "Pure therapeutic grade lavender oil",
      price: 245,
      originalPrice: 280,
      image:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/bb7ef968f136c3fed24c497b5a163ddd33bd5fb3?width=400",
      category: "Therapeutic Oils",
      onSale: true,
      rating: 4.9,
      reviews: 89,
    },
    {
      id: 3,
      name: "Healing Balm",
      description: "Multi-purpose healing balm",
      price: 156,
      originalPrice: 180,
      image:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/beb4382574e7e50d5f6a30882ab7742309d18026?width=400",
      category: "Creams & Ointments",
      onSale: true,
      rating: 4.7,
      reviews: 67,
    },
    {
      id: 4,
      name: "Pain Relief Cream",
      description: "Fast-acting topical pain relief",
      price: 189,
      originalPrice: 220,
      image:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/66321575463c6e71b0d915b94e851b50f8ad5ceb?width=400",
      category: "Creams & Ointments",
      onSale: true,
      rating: 4.6,
      reviews: 156,
    },
    {
      id: 5,
      name: "Immune Booster",
      description: "Natural immune system support",
      price: 320,
      originalPrice: 375,
      image:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/8d0eff5c0268ad8451be905d756ed12769b5912f?width=400",
      category: "Custom Formulations",
      onSale: true,
      rating: 4.5,
      reviews: 98,
    },
  ];

  if (!query) return allProducts;

  return allProducts.filter(
    (product) =>
      product.name.toLowerCase().includes(query.toLowerCase()) ||
      product.description.toLowerCase().includes(query.toLowerCase()) ||
      product.category.toLowerCase().includes(query.toLowerCase()),
  );
};

export default function SearchPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SearchPageContent />
    </Suspense>
  );
}

function SearchPageContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || "";

  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [sortBy, setSortBy] = useState("relevance");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);

  const [searchResults, setSearchResults] = useState(
    searchProducts(initialQuery),
  );
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      let results = searchProducts(searchQuery);

      // Apply category filter
      if (selectedCategory !== "all") {
        results = results.filter((product) =>
          product.category
            .toLowerCase()
            .includes(selectedCategory.toLowerCase()),
        );
      }

      // Apply price filter
      results = results.filter(
        (product) =>
          product.price >= priceRange[0] && product.price <= priceRange[1],
      );

      // Apply sorting
      switch (sortBy) {
        case "price-low":
          results.sort((a, b) => a.price - b.price);
          break;
        case "price-high":
          results.sort((a, b) => b.price - a.price);
          break;
        case "rating":
          results.sort((a, b) => b.rating - a.rating);
          break;
        case "newest":
          // Keep original order for newest
          break;
        default:
          // Relevance - keep original order
          break;
      }

      setSearchResults(results);
      setIsLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery, sortBy, selectedCategory, priceRange]);

  const categories = [
    "all",
    "Medical Mixtures",
    "Therapeutic Oils",
    "Creams & Ointments",
    "Custom Formulations",
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="py-8 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Search Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Search Results
            </h1>
            {initialQuery && (
              <p className="text-gray-600">
                Showing {searchResults.length} results for &quot;{initialQuery}&quot;
              </p>
            )}
          </div>

          {/* Search and Filters Bar */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 mb-8">
            <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
              {/* Search Input */}
              <div className="flex-1 max-w-md">
                <div className="relative">
                  <Search className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Filters */}
              <div className="flex items-center gap-4">
                {/* Category Filter */}
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category === "all" ? "All Categories" : category}
                    </option>
                  ))}
                </select>

                {/* Sort Filter */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                >
                  <option value="relevance">Relevance</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                  <option value="newest">Newest</option>
                </select>

                {/* View Mode Toggle */}
                <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-2 transition-colors ${
                      viewMode === "grid"
                        ? "bg-primary text-white"
                        : "bg-white text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    <Grid className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-2 transition-colors ${
                      viewMode === "list"
                        ? "bg-primary text-white"
                        : "bg-white text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    <List className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Results */}
          {isLoading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
              <p className="text-gray-600 mt-4">Searching...</p>
            </div>
          ) : searchResults.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="h-12 w-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No results found
              </h3>
              <p className="text-gray-600 mb-6">
                Try adjusting your search terms or filters
              </p>
              <Link href="/categories">
                <Button className="bg-primary hover:bg-primary/90 text-white">
                  Browse All Products
                </Button>
              </Link>
            </div>
          ) : (
            <div
              className={
                viewMode === "grid"
                  ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
                  : "space-y-4"
              }
            >
              {searchResults.map((product) => (
                <div
                  key={product.id}
                  className={
                    viewMode === "grid"
                      ? "group bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-100 overflow-hidden"
                      : "flex bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-100"
                  }
                >
                  {viewMode === "grid" ? (
                    <>
                      <div className="relative">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        {product.onSale && (
                          <Badge className="absolute top-4 left-4 bg-red-500 text-white">
                            Sale
                          </Badge>
                        )}
                        <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-gray-50">
                            <Heart className="h-5 w-5 text-gray-600" />
                          </button>
                          <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-gray-50">
                            <ShoppingCart className="h-5 w-5 text-gray-600" />
                          </button>
                        </div>
                      </div>
                      <div className="p-6">
                        <div className="text-sm text-gray-500 mb-2">
                          {product.category}
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                          {product.name}
                        </h3>
                        <p className="text-gray-600 mb-3">
                          {product.description}
                        </p>
                        <div className="flex items-center mb-3">
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < Math.floor(product.rating)
                                    ? "fill-yellow-400 text-yellow-400"
                                    : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-sm text-gray-600 ml-2">
                            ({product.reviews})
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-xl font-bold text-gray-900">
                              ${product.price}
                            </span>
                            {product.originalPrice && (
                              <span className="text-sm text-gray-500 line-through">
                                ${product.originalPrice}
                              </span>
                            )}
                          </div>
                          <Link href={`/products/${product.id}`}>
                            <Button
                              size="sm"
                              className="bg-primary hover:bg-primary/90 text-white"
                            >
                              View
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-32 h-32 object-cover rounded-lg flex-shrink-0"
                      />
                      <div className="flex-1 ml-6">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <div className="text-sm text-gray-500 mb-1">
                              {product.category}
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">
                              {product.name}
                            </h3>
                            <p className="text-gray-600 mb-3">
                              {product.description}
                            </p>
                            <div className="flex items-center">
                              <div className="flex items-center">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`h-4 w-4 ${
                                      i < Math.floor(product.rating)
                                        ? "fill-yellow-400 text-yellow-400"
                                        : "text-gray-300"
                                    }`}
                                  />
                                ))}
                              </div>
                              <span className="text-sm text-gray-600 ml-2">
                                ({product.reviews})
                              </span>
                            </div>
                          </div>
                          <div className="text-right ml-6">
                            <div className="flex items-center gap-2 mb-4">
                              <span className="text-2xl font-bold text-gray-900">
                                ${product.price}
                              </span>
                              {product.originalPrice && (
                                <span className="text-lg text-gray-500 line-through">
                                  ${product.originalPrice}
                                </span>
                              )}
                            </div>
                            <div className="flex gap-2">
                              <button className="w-10 h-10 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50">
                                <Heart className="h-5 w-5 text-gray-600" />
                              </button>
                              <Link href={`/products/${product.id}`}>
                                <Button className="bg-primary hover:bg-primary/90 text-white">
                                  View Details
                                </Button>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
