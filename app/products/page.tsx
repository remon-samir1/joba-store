"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Search,
  Filter,
  Grid,
  List,
  Star,
  Heart,
  ShoppingCart,
  ChevronDown,
  Loader2,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useProducts, useCategories, useAddToCart } from "@/lib/hooks/use-api";
import { toast } from "sonner";

const ITEMS_PER_PAGE = 12;

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("relevance");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [priceRange, setPriceRange] = useState<{ min: number; max: number }>({
    min: 0,
    max: 1000,
  });

  // API hooks
  const {
    data: productsResponse,
    isLoading: productsLoading,
    error: productsError,
  } = useProducts({
    page: currentPage,
    limit: ITEMS_PER_PAGE,
    search: searchQuery || undefined,
    category: selectedCategory || undefined,
  });

  const { data: categories, isLoading: categoriesLoading } = useCategories();
  const addToCartMutation = useAddToCart();

  const products = productsResponse?.data || [];
  const totalPages = productsResponse?.pagination.total_pages || 1;

  const handleAddToCart = async (productId: string) => {
    try {
      await addToCartMutation.mutateAsync({
        product_id: productId,
        quantity: 1,
        session_id:
          typeof window !== "undefined"
            ? localStorage.getItem("session_id") || undefined
            : undefined,
      });
      toast.success("Product added to cart!");
    } catch (error) {
      toast.error("Failed to add product to cart");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold text-gray-900">Products</h1>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-80"
                />
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant={viewMode === "grid" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="flex items-center space-x-4 mb-6">
            <Select
              value={selectedCategory}
              onValueChange={setSelectedCategory}
            >
              <SelectTrigger className="w-48">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Categories</SelectItem>
                {categories?.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="relevance">Relevance</SelectItem>
                <SelectItem value="price_asc">Price: Low to High</SelectItem>
                <SelectItem value="price_desc">Price: High to Low</SelectItem>
                <SelectItem value="date">Newest First</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              More Filters
            </Button>
          </div>

          {/* Results count */}
          {productsResponse && (
            <p className="text-gray-600 mb-6">
              Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1}-
              {Math.min(
                currentPage * ITEMS_PER_PAGE,
                productsResponse.pagination.total_items,
              )}{" "}
              of {productsResponse.pagination.total_items} products
            </p>
          )}
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Loading State */}
        {productsLoading && (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-orange-500" />
            <span className="ml-2 text-gray-600">Loading products...</span>
          </div>
        )}

        {/* Error State */}
        {productsError && (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <p className="text-red-500 text-lg">Failed to load products</p>
              <p className="text-gray-400 text-sm mt-1">
                Please check your connection and try again
              </p>
            </div>
          </div>
        )}

        {/* Products Grid */}
        {!productsLoading && !productsError && (
          <>
            {viewMode === "grid" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
                {products.map((product) => (
                  <Card
                    key={product.id}
                    className="group hover:shadow-lg transition-shadow"
                  >
                    <CardContent className="p-4">
                      <div className="relative mb-4">
                        <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                          <Image
                            src={product.images[0] || "/placeholder.svg"}
                            alt={product.name}
                            width={300}
                            height={300}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                          />
                        </div>
                        <Button
                          size="sm"
                          variant="outline"
                          className="absolute top-2 right-2 p-2"
                        >
                          <Heart className="h-4 w-4" />
                        </Button>
                        {product.discounted_price && (
                          <Badge className="absolute top-2 left-2 bg-red-500">
                            Sale
                          </Badge>
                        )}
                      </div>

                      <div className="space-y-2">
                        <h3 className="font-semibold text-lg line-clamp-2">
                          <Link
                            href={`/products/${product.id}`}
                            className="hover:text-orange-500 transition-colors"
                          >
                            {product.name}
                          </Link>
                        </h3>

                        <div className="flex items-center space-x-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < (product.average_rating || 0)
                                  ? "text-yellow-400 fill-current"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                          <span className="text-sm text-gray-500">
                            ({product.total_reviews || 0})
                          </span>
                        </div>

                        <div className="flex items-center space-x-2">
                          <span className="text-xl font-bold text-orange-500">
                            {product.price} EGP
                          </span>
                          {product.discounted_price && (
                            <span className="text-sm text-gray-500 line-through">
                              {product.discounted_price} EGP
                            </span>
                          )}
                        </div>

                        <div className="flex items-center justify-between">
                          <Badge
                            variant={
                              product.stock_status === "in-stock"
                                ? "default"
                                : product.stock_status === "low-stock"
                                  ? "secondary"
                                  : "destructive"
                            }
                            className={
                              product.stock_status === "in-stock"
                                ? "bg-green-100 text-green-700"
                                : product.stock_status === "low-stock"
                                  ? "bg-yellow-100 text-yellow-700"
                                  : "bg-red-100 text-red-700"
                            }
                          >
                            {product.stock_status === "in-stock"
                              ? "In Stock"
                              : product.stock_status === "low-stock"
                                ? "Low Stock"
                                : "Out of Stock"}
                          </Badge>

                          <Button
                            size="sm"
                            onClick={() => handleAddToCart(product.id)}
                            disabled={
                              product.stock_status === "out-of-stock" ||
                              addToCartMutation.isPending
                            }
                            className="bg-orange-500 hover:bg-orange-600"
                          >
                            <ShoppingCart className="h-4 w-4 mr-1" />
                            Add to Cart
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="space-y-4 mb-8">
                {products.map((product) => (
                  <Card
                    key={product.id}
                    className="hover:shadow-md transition-shadow"
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-6">
                        <div className="flex-shrink-0">
                          <div className="w-32 h-32 bg-gray-100 rounded-lg overflow-hidden">
                            <Image
                              src={product.images[0] || "/placeholder.svg"}
                              alt={product.name}
                              width={128}
                              height={128}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </div>

                        <div className="flex-1">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="text-xl font-semibold mb-2">
                                <Link
                                  href={`/products/${product.id}`}
                                  className="hover:text-orange-500 transition-colors"
                                >
                                  {product.name}
                                </Link>
                              </h3>
                              <p className="text-gray-600 mb-4 line-clamp-2">
                                {product.description}
                              </p>
                              <div className="flex items-center space-x-1 mb-4">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`h-4 w-4 ${
                                      i < (product.average_rating || 0)
                                        ? "text-yellow-400 fill-current"
                                        : "text-gray-300"
                                    }`}
                                  />
                                ))}
                                <span className="text-sm text-gray-500 ml-2">
                                  ({product.total_reviews || 0} reviews)
                                </span>
                              </div>
                            </div>

                            <div className="text-right">
                              <div className="flex items-center space-x-2 mb-4">
                                <span className="text-2xl font-bold text-orange-500">
                                  {product.price} EGP
                                </span>
                                {product.discounted_price && (
                                  <span className="text-lg text-gray-500 line-through">
                                    {product.discounted_price} EGP
                                  </span>
                                )}
                              </div>

                              <div className="flex items-center space-x-2">
                                <Badge
                                  variant={
                                    product.stock_status === "in-stock"
                                      ? "default"
                                      : product.stock_status === "low-stock"
                                        ? "secondary"
                                        : "destructive"
                                  }
                                  className={
                                    product.stock_status === "in-stock"
                                      ? "bg-green-100 text-green-700"
                                      : product.stock_status === "low-stock"
                                        ? "bg-yellow-100 text-yellow-700"
                                        : "bg-red-100 text-red-700"
                                  }
                                >
                                  {product.stock_status === "in-stock"
                                    ? "In Stock"
                                    : product.stock_status === "low-stock"
                                      ? "Low Stock"
                                      : "Out of Stock"}
                                </Badge>
                              </div>

                              <div className="flex items-center space-x-2 mt-4">
                                <Button variant="outline" size="sm">
                                  <Heart className="h-4 w-4" />
                                </Button>
                                <Button
                                  onClick={() => handleAddToCart(product.id)}
                                  disabled={
                                    product.stock_status === "out-of-stock" ||
                                    addToCartMutation.isPending
                                  }
                                  className="bg-orange-500 hover:bg-orange-600"
                                >
                                  <ShoppingCart className="h-4 w-4 mr-2" />
                                  Add to Cart
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {/* Pagination */}
            <div className="flex items-center justify-center space-x-2">
              <Button
                variant="outline"
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1 || productsLoading}
              >
                Previous
              </Button>

              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                const page = i + 1;
                return (
                  <Button
                    key={page}
                    variant={currentPage === page ? "default" : "outline"}
                    onClick={() => setCurrentPage(page)}
                    disabled={productsLoading}
                    className={
                      currentPage === page
                        ? "bg-orange-500 hover:bg-orange-600"
                        : ""
                    }
                  >
                    {page}
                  </Button>
                );
              })}

              {totalPages > 5 && (
                <>
                  <span>...</span>
                  <Button
                    variant="outline"
                    onClick={() => setCurrentPage(totalPages)}
                    disabled={productsLoading}
                  >
                    {totalPages}
                  </Button>
                </>
              )}

              <Button
                variant="outline"
                onClick={() =>
                  setCurrentPage(Math.min(totalPages, currentPage + 1))
                }
                disabled={currentPage === totalPages || productsLoading}
              >
                Next
              </Button>
            </div>
          </>
        )}

        {/* Empty State */}
        {!productsLoading && !productsError && products.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No products found
            </h3>
            <p className="text-gray-600 mb-6">
              Try adjusting your search criteria or browse all categories.
            </p>
            <Button onClick={() => setSearchQuery("")}>Clear Search</Button>
          </div>
        )}
      </div>
    </div>
  );
}
