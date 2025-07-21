"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Minus, Plus, X, Heart, Loader2 } from "lucide-react";
import {
  useCart,
  useUpdateCartItem,
  useRemoveFromCart,
  useClearCart,
  useAddToWishlist,
} from "@/lib/hooks/use-api";
import { toast } from "sonner";
import { useRouter, useParams } from "next/navigation";

export default function CartPage() {
  const router = useRouter();
  const { cartId } = useParams();
  const [sessionId, setSessionId] = useState<string>("");
  const [promoCode, setPromoCode] = useState("");

  // Get session ID from localStorage
  useEffect(() => {
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
  }, []);

  // API hooks
  const { data: cart, isLoading, error } = useCart(sessionId);
  const updateCartItemMutation = useUpdateCartItem();
  const removeFromCartMutation = useRemoveFromCart();
  const clearCartMutation = useClearCart();
  const addToWishlistMutation = useAddToWishlist();

  const updateQuantity = async (itemId: string, newQuantity: number) => {
    if (newQuantity === 0) {
      removeItem(itemId);
      return;
    }

    try {
      await updateCartItemMutation.mutateAsync({
        itemId,
        quantity: newQuantity,
        sessionId,
      });
    } catch (error) {
      toast.error("Failed to update quantity");
    }
  };

  const removeItem = async (itemId: string) => {
    try {
      await removeFromCartMutation.mutateAsync({ itemId, sessionId });
      toast.success("Item removed from cart");
    } catch (error) {
      toast.error("Failed to remove item");
    }
  };

  const moveToWishlist = async (itemId: string, customerId: string) => {
    const item = cart?.items.find((item) => item.id === itemId);
    if (item && item.product) {
      try {
        await addToWishlistMutation.mutateAsync({
          customerId,
          productId: item.product.id,
        });
        await removeItem(itemId);
        toast.success("Item moved to wishlist");
      } catch (error) {
        toast.error("Failed to move item to wishlist");
      }
    }
  };

  const handleCheckout = () => {
    // In a real app, this would redirect to checkout flow
    window.location.href = "/checkout";
  };

  const applyPromoCode = async (code: string) => {
    // This would validate and apply promo code via API
    toast.info("Promo code functionality will be implemented");
  };

  const cartItems = cart?.items || [];
  const subtotal = cart?.subtotal || 0;
  const shipping = cart?.shipping_amount || 25;
  const tax = cart?.tax_amount || 0;
  const total = cart?.total_amount || subtotal + shipping + tax;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="py-16 px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-orange-500" />
              <span className="ml-2 text-gray-600">Loading cart...</span>
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
                  Failed to load cart
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

  if (!cart || cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="py-16 px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col items-center justify-center py-20">
              <div className="mb-8">
                <img
                  src="https://cdn.builder.io/api/v1/image/assets%2F02282edf997e416ea95b689ea249d822%2F2393f9f91ddf476e8ac128a2661bc93d?format=webp&width=800"
                  alt="Empty cart illustration"
                  className="w-64 h-64 object-contain"
                />
              </div>
              <div className="text-center max-w-lg space-y-4">
                <h2 className="text-2xl font-medium text-gray-900">
                  Your cart is empty!
                </h2>
                <p className="text-lg text-gray-600">
                  Looks like you haven&apos;t added anything to your cart yet.
                  Start shopping to fill it up!
                </p>
                <Link
                  href="/categories"
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
          {/* Page Title */}
          <div className="mb-8 sm:mb-12">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-gray-900">
              Shopping Cart
            </h1>
            <p className="text-gray-600 mt-2 text-sm sm:text-base">
              {cartItems.length} item{cartItems.length !== 1 ? "s" : ""} in your
              cart
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4 sm:space-y-6">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white p-4 sm:p-6 rounded-lg shadow-sm border border-gray-100"
                >
                  <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                    {/* Product Image */}
                    <div className="flex-shrink-0 mx-auto sm:mx-0">
                      <img
                        src={item.product?.images[0] || "/placeholder.svg"}
                        alt={item.product?.name || "Product"}
                        className="w-24 h-24 sm:w-32 sm:h-32 object-cover rounded-lg"
                      />
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 space-y-3 sm:space-y-4">
                      <div className="text-center sm:text-left">
                        <h3 className="text-lg sm:text-xl font-semibold text-gray-900">
                          {item.product?.name}
                        </h3>
                        <p className="text-gray-600 text-sm sm:text-base">
                          {item.product?.description}
                        </p>
                        <p className="text-base sm:text-lg font-bold text-gray-900 mt-2">
                          {item.price} EGP
                        </p>
                      </div>

                      {/* Quantity and Actions */}
                      <div className="flex flex-col gap-4">
                        {/* Quantity Controls */}
                        <div className="flex items-center justify-center sm:justify-start">
                          <div className="flex items-center border border-gray-300 rounded-lg">
                            <button
                              onClick={() =>
                                updateQuantity(item.id, item.quantity - 1)
                              }
                              disabled={updateCartItemMutation.isPending}
                              className="p-2 sm:p-3 hover:bg-gray-50 transition-colors disabled:opacity-50"
                            >
                              <Minus className="h-3 w-3 sm:h-4 sm:w-4" />
                            </button>
                            <span className="px-3 sm:px-4 py-2 sm:py-3 text-base sm:text-lg font-semibold">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateQuantity(item.id, item.quantity + 1)
                              }
                              disabled={updateCartItemMutation.isPending}
                              className="p-2 sm:p-3 hover:bg-gray-50 transition-colors disabled:opacity-50"
                            >
                              <Plus className="h-3 w-3 sm:h-4 sm:w-4" />
                            </button>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center justify-center sm:justify-start gap-3 sm:gap-4">
                          <button
                            onClick={() =>
                              moveToWishlist(item.id, "customer_id")
                            }
                            disabled={addToWishlistMutation.isPending}
                            className="flex items-center gap-2 text-gray-600 hover:text-primary transition-colors text-sm sm:text-base disabled:opacity-50"
                          >
                            <Heart className="h-3 w-3 sm:h-4 sm:w-4" />
                            <span className="hidden sm:inline">
                              Move to Wishlist
                            </span>
                            <span className="sm:hidden">Wishlist</span>
                          </button>
                          <button
                            onClick={() => removeItem(item.id)}
                            disabled={removeFromCartMutation.isPending}
                            className="flex items-center gap-2 text-red-600 hover:text-red-700 transition-colors text-sm sm:text-base disabled:opacity-50"
                          >
                            <X className="h-3 w-3 sm:h-4 sm:w-4" />
                            <span>Remove</span>
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Item Total */}
                    <div className="flex-shrink-0 text-center sm:text-right">
                      <p className="text-lg sm:text-xl font-bold text-gray-900">
                        {item.total} EGP
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 sticky top-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                  Order Summary
                </h2>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-semibold">
                      {subtotal} {cart?.currency || "EGP"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-semibold">
                      {shipping} {cart?.currency || "EGP"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax</span>
                    <span className="font-semibold">
                      {tax} {cart?.currency || "EGP"}
                    </span>
                  </div>
                  <div className="border-t pt-4">
                    <div className="flex justify-between">
                      <span className="text-xl font-semibold text-gray-900">
                        Total
                      </span>
                      <span className="text-xl font-bold text-primary">
                        {total} {cart?.currency || "EGP"}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <Button
                    onClick={handleCheckout}
                    className="w-full bg-primary hover:bg-primary/90 text-white py-6 text-lg font-semibold"
                  >
                    Proceed to Checkout
                  </Button>
                  <Link
                    href="/categories"
                    className="block text-center text-primary hover:text-primary/80 transition-colors font-semibold"
                  >
                    Continue Shopping
                  </Link>
                </div>

                {/* Promo Code */}
                <div className="mt-8 pt-8 border-t">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Promo Code
                  </h3>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      applyPromoCode(promoCode);
                    }}
                    className="flex gap-2"
                  >
                    <input
                      type="text"
                      placeholder="Enter code"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                    <Button
                      type="submit"
                      variant="outline"
                      className="px-6 border-primary text-primary hover:bg-primary hover:text-white"
                    >
                      Apply
                    </Button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
