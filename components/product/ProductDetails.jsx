"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Heart, Paperclip, Minus, Plus } from "lucide-react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Notifcation from "../Notification.jsx";
import { Axios } from "../Helpers/Axios.js";

export function ProductDetails({ description,setSelectedSize ,selectedSize,category, tags, price , id,sizes , slug }) {
  const [quantity, setQuantity] = useState(2);

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };
console.log(selectedSize);
  const handleAddToCart = async () => {
    const data = {
    
      product_size_id: selectedSize,
      total_price: price * quantity,
    };

    try {
      const response = await Axios.post(`https://goba-ecommerce.sunmedagency.com/api/cart/${slug}`, data);
      console.log("API response:", response.data);
      toast.success(`Added ${quantity} items (${selectedSize}) to cart!`);
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert("Failed to add to cart. Please try again.");
    }
  };

  const handleAddToWishlist = async() => {
    try {
      const response = await axios.post(`https://goba-ecommerce.sunmedagency.com/api/wishlist/${slug}`);
      console.log("API response:", response.data);
      toast.success(`Added to wishlist !`);
    } catch (error) {
      console.error("Error adding to wishlist:", error);
      toast.error("Failed to add to wishlist. Please try again.");
    }
  };

  const handleViewDocuments = () => {
    console.log("Viewing documents");
    toast.error("Documents feature coming soon!");
  };

  return (
    <div className="space-y-8">
      <Notifcation/>
      {/* Description */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
          Description
        </h2>
        <p className="text-gray-600 leading-relaxed">{description}</p>
      </div>

      {/* Product Info */}
      <div className="space-y-4">
        <div className="flex gap-11">
          <span className="font-semibold text-gray-900 min-w-fit">
            Category
          </span>
          <span className="text-gray-600">: {category}</span>
        </div>

        <div className="flex gap-11">
          <span className="font-semibold text-gray-900 min-w-fit">Tags</span>
          <span className="text-gray-600">: {""}</span>
        </div>

        <div className="flex items-center gap-12">
          <span className="font-semibold text-gray-900">Quantity</span>
          <div className="flex items-center bg-white border border-gray-200 rounded">
            <button
              onClick={() => handleQuantityChange(-1)}
              className="p-2 hover:bg-gray-50 transition-colors"
              disabled={quantity <= 1}
            >
              <Minus className="h-4 w-4" />
            </button>
            <span className="px-6 py-2 font-medium text-gray-900">
              {quantity}
            </span>
            <button
              onClick={() => handleQuantityChange(1)}
              className="p-2 hover:bg-gray-50 transition-colors"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Size Options */}
      <div className="flex flex-wrap gap-2 sm:gap-4">
        {sizes.map((size) => (
          <Button
            key={size.id}
            variant="outline"
            onClick={() => setSelectedSize(size.id)}
            className={`border-gray-900 text-gray-900 hover:bg-gray-50 px-4 py-2 ${
              selectedSize === size.id
                ? "bg-gray-900 text-white hover:bg-gray-800"
                : ""
            }`}
          >
            {size.name}
          </Button>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
        <Button
          onClick={handleAddToCart}
          className="bg-primary hover:bg-primary/90 text-white flex items-center gap-2 px-6 py-3 flex-1 sm:flex-none"
        >
          <span>Add to Cart</span>
          <ShoppingCart className="h-5 w-5" />
        </Button>

        <Button
          onClick={handleAddToWishlist}
          variant="outline"
          className="border-primary text-primary hover:bg-primary hover:text-white flex items-center gap-2 px-6 py-3 flex-1 sm:flex-none"
        >
          <span>Wishlist</span>
          <Heart className="h-5 w-5" />
        </Button>

        <Button
          onClick={handleViewDocuments}
          variant="outline"
          className="border-primary text-primary hover:bg-primary hover:text-white flex items-center gap-2 px-6 py-3 flex-1 sm:flex-none"
        >
          <span>Documents</span>
          <Paperclip className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}
