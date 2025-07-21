"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Heart,
  ShoppingCart,
  X,
  Star,
  Loader2,
  Grid,
  List,
} from "lucide-react";
import {
  useWishlist,
  useRemoveFromWishlist,
  useAddToCart,
} from "@/lib/hooks/use-api";
import { toast } from "sonner";

export default function WishlistPage() {
  const [customerId, setCustomerId] = useState<string>("");
  const [sessionId, setSessionId] = useState<string>("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Get customer ID and session ID from localStorage
  useEffect(() => {
    const storedCustomerId =
      typeof window !== "undefined"
        ? localStorage.getItem("customer_id") || ""
        : "";
    const storedSessionId =
      typeof window !== "undefined"
        ? localStorage.getItem("session_id") || ""
        : "";

    if (!storedSessionId) {
      const newSessionId = Math.random().toString(36).substr(2, 9);
      localStorage.setItem("session_id", newSessionId);
      setSessionId(newSessionId);
    } else {
      setSessionId(storedSessionId);
    }

    if (!storedCustomerId) {
      // For demo purposes, create a demo customer ID
      const demoCustomerId =
        "demo_customer_" + Math.random().toString(36).substr(2, 9);
      localStorage.setItem("customer_id", demoCustomerId);
      setCustomerId(demoCustomerId);
    } else {
      setCustomerId(storedCustomerId);
    }
  }, []);

  // API hooks
  const { data: wishlist, isLoading, error } = useWishlist(customerId);
  const removeFromWishlistMutation = useRemoveFromWishlist();
  const addToCartMutation = useAddToCart();

  const handleRemoveFromWishlist = async (productId: string) => {
    try {
      await removeFromWishlistMutation.mutateAsync({ customerId, productId });
      toast.success("Item removed from wishlist");
    } catch (error) {
      toast.error("Failed to remove item from wishlist");
    }
  };

  const handleAddToCart = async (productId: string) => {
    try {
      await addToCartMutation.mutateAsync({
        product_id: productId,
        quantity: 1,
        session_id: sessionId,
      });
      toast.success("Item added to cart!");
    } catch (error) {
      toast.error("Failed to add item to cart");
    }
  };

  const handleMoveToCart = async (productId: string) => {
    try {
      await addToCartMutation.mutateAsync({
        product_id: productId,
        quantity: 1,
        session_id: sessionId,
      });
      await removeFromWishlistMutation.mutateAsync({ customerId, productId });
      toast.success("Item moved to cart!");
    } catch (error) {
      toast.error("Failed to move item to cart");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="py-16 px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-orange-500" />
              <span className="ml-2 text-gray-600">Loading wishlist...</span>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="py-16 px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col items-center justify-center py-20">
              <div className="text-center">
                <h2 className="text-2xl font-medium text-gray-900 mb-4">
                  Failed to load wishlist
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                  Please check your connection and try again.
                </p>
                <Button onClick={() => window.location.reload()}>Retry</Button>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const wishlistItems = wishlist?.items || [];

  if (wishlistItems.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="py-16 px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col items-center justify-center py-20">
              <div className="mb-8">
                <Heart className="w-24 h-24 text-gray-300" />
              </div>
              <div className="text-center max-w-lg space-y-4">
                <h2 className="text-2xl font-medium text-gray-900">
                  Your wishlist is empty!
                </h2>
                <p className="text-lg text-gray-600">
                  Save items you love for later. Browse our products and add
                  them to your wishlist.
                </p>
                <Link
                  href="/products"
                  className="inline-block bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors mt-6"
                >
                  Start Shopping
                </Link>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Main Content */}
      <main className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Page Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-gray-900">
                My Wishlist
              </h1>
              <p className="text-gray-600 mt-2 text-sm sm:text-base">
                {wishlistItems.length} item
                {wishlistItems.length !== 1 ? "s" : ""} saved for later
              </p>
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

          {/* Wishlist Items */}
          {viewMode === "grid" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {wishlistItems.map((item) => (
                <Card
                  key={item.id}
                  className="group hover:shadow-lg transition-shadow"
                >
                  <CardContent className="p-4">
                    <div className="relative mb-4">
                      <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                        <Image
                          src={item.product?.images[0] || "/placeholder.svg"}
                          alt={item.product?.name || "Product"}
                          width={300}
                          height={300}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() =>
                          handleRemoveFromWishlist(item.product?.id || "")
                        }
                        disabled={removeFromWishlistMutation.isPending}
                        className="absolute top-2 right-2 p-2 bg-white/80 hover:bg-white"
                      >
                        <X className="h-4 w-4 text-red-500" />
                      </Button>
                      {item.product?.discounted_price && (
                        <Badge className="absolute top-2 left-2 bg-red-500">
                          Sale
                        </Badge>
                      )}
                    </div>

                    <div className="space-y-2">
                      <h3 className="font-semibold text-lg line-clamp-2">
                        <Link
                          href={`/products/${item.product?.id}`}
                          className="hover:text-orange-500 transition-colors"
                        >
                          {item.product?.name}
                        </Link>
                      </h3>

                      <div className="flex items-center space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < (item.product?.average_rating || 0)
                                ? "text-yellow-400 fill-current"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                        <span className="text-sm text-gray-500">
                          ({item.product?.total_reviews || 0})
                        </span>
                      </div>

                      <div className="flex items-center space-x-2">
                        <span className="text-xl font-bold text-orange-500">
                          {item.product?.price} EGP
                        </span>
                        {item.product?.discounted_price && (
                          <span className="text-sm text-gray-500 line-through">
                            {item.product?.discounted_price} EGP
                          </span>
                        )}
                      </div>

                      <div className="flex items-center justify-between pt-2">
                        <Badge
                          variant={
                            item.product?.stock_status === "in-stock"
                              ? "default"
                              : item.product?.stock_status === "low-stock"
                                ? "secondary"
                                : "destructive"
                          }
                          className={
                            item.product?.stock_status === "in-stock"
                              ? "bg-green-100 text-green-700"
                              : item.product?.stock_status === "low-stock"
                                ? "bg-yellow-100 text-yellow-700"
                                : "bg-red-100 text-red-700"
                          }
                        >
                          {item.product?.stock_status === "in-stock"
                            ? "In Stock"
                            : item.product?.stock_status === "low-stock"
                              ? "Low Stock"
                              : "Out of Stock"}
                        </Badge>
                      </div>

                      <div className="flex space-x-2 pt-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() =>
                            handleAddToCart(item.product?.id || "")
                          }
                          disabled={
                            item.product?.stock_status === "out-of-stock" ||
                            addToCartMutation.isPending
                          }
                          className="flex-1"
                        >
                          <ShoppingCart className="h-4 w-4 mr-1" />
                          Add to Cart
                        </Button>
                        <Button
                          size="sm"
                          onClick={() =>
                            handleMoveToCart(item.product?.id || "")
                          }
                          disabled={
                            item.product?.stock_status === "out-of-stock" ||
                            addToCartMutation.isPending
                          }
                          className="flex-1 bg-orange-500 hover:bg-orange-600"
                        >
                          Move to Cart
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {wishlistItems.map((item) => (
                <Card
                  key={item.id}
                  className="hover:shadow-md transition-shadow"
                >
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-6">
                      <div className="flex-shrink-0">
                        <div className="w-32 h-32 bg-gray-100 rounded-lg overflow-hidden">
                          <Image
                            src={item.product?.images[0] || "/placeholder.svg"}
                            alt={item.product?.name || "Product"}
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
                                href={`/products/${item.product?.id}`}
                                className="hover:text-orange-500 transition-colors"
                              >
                                {item.product?.name}
                              </Link>
                            </h3>
                            <p className="text-gray-600 mb-4 line-clamp-2">
                              {item.product?.description}
                            </p>
                            <div className="flex items-center space-x-1 mb-4">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${
                                    i < (item.product?.average_rating || 0)
                                      ? "text-yellow-400 fill-current"
                                      : "text-gray-300"
                                  }`}
                                />
                              ))}
                              <span className="text-sm text-gray-500 ml-2">
                                ({item.product?.total_reviews || 0} reviews)
                              </span>
                            </div>
                          </div>

                          <div className="text-right">
                            <div className="flex items-center space-x-2 mb-4">
                              <span className="text-2xl font-bold text-orange-500">
                                {item.product?.price} EGP
                              </span>
                              {item.product?.discounted_price && (
                                <span className="text-lg text-gray-500 line-through">
                                  {item.product?.discounted_price} EGP
                                </span>
                              )}
                            </div>

                            <div className="flex items-center space-x-2 mb-4">
                              <Badge
                                variant={
                                  item.product?.stock_status === "in-stock"
                                    ? "default"
                                    : item.product?.stock_status === "low-stock"
                                      ? "secondary"
                                      : "destructive"
                                }
                                className={
                                  item.product?.stock_status === "in-stock"
                                    ? "bg-green-100 text-green-700"
                                    : item.product?.stock_status === "low-stock"
                                      ? "bg-yellow-100 text-yellow-700"
                                      : "bg-red-100 text-red-700"
                                }
                              >
                                {item.product?.stock_status === "in-stock"
                                  ? "In Stock"
                                  : item.product?.stock_status === "low-stock"
                                    ? "Low Stock"
                                    : "Out of Stock"}
                              </Badge>
                            </div>

                            <div className="flex items-center space-x-2">
                              <Button
                                variant="outline"
                                onClick={() =>
                                  handleRemoveFromWishlist(
                                    item.product?.id || "",
                                  )
                                }
                                disabled={removeFromWishlistMutation.isPending}
                              >
                                <X className="h-4 w-4 mr-2 text-red-500" />
                                Remove
                              </Button>
                              <Button
                                onClick={() =>
                                  handleAddToCart(item.product?.id || "")
                                }
                                disabled={
                                  item.product?.stock_status ===
                                    "out-of-stock" ||
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

          {/* Continue Shopping */}
          <div className="text-center mt-12">
            <Link
              href="/products"
              className="inline-block bg-gray-100 text-gray-900 px-8 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
