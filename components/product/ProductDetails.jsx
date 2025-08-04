import { useContext, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  ShoppingCart,
  Heart,
  Paperclip,
  Minus,
  Plus,
  Info,
} from "lucide-react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Notifcation from "../Notification.jsx";
import { Axios } from "../Helpers/Axios.js";
import { CartCh } from "../../Context/CartContext.jsx";
import OrderRequestModal from "../../app/products/[id]/RequestModal.jsx";

export function ProductDetails({
  description,
  name,
  inStock,
  rating,
  reviews,
  setSelectedSize,
  productData,
  attachment_path,
  selectedSize,
  category,
  tags,
  price,
  id,
  sizes,
  slug,
}) {
  const [quantity, setQuantity] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [showDocModal, setShowDocModal] = useState(false);
  const [loading, setLoading] = useState(true);

  console.log(productData.reviews);
  const [sizePrice, setSizePrice] = useState(sizes[0].price);
  const cartcontext = useContext(CartCh);
  const change = cartcontext.setCartChange;
  console.log(sizePrice);
  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = async () => {
    const data = {
      product_size_id: selectedSize,
      quantity :quantity,
      total_price: price * quantity,
    };
    const formdData = new FormData();
    formdData.append("product_size_id", selectedSize);
    formdData.append("total_price", price * quantity);
    console.log(selectedSize);
    try {
      if (!selectedSize) {
        toast.warn("Please select Size or a specific concentration");
        return;
      }

      const response = await Axios.post(
        `/cart/${slug}`,

        data,
      );
      change((prev) => !prev);
      toast.success(`Added ${quantity} items (${selectedSize}) to cart!`);
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert("Failed to add to cart. Please try again.");
    }
  };

  const handleAddToWishlist = async () => {
    try {
      const response = await Axios.post(`/wishlist/${slug}`);
      toast.success(`Added to wishlist !`);
    } catch (error) {
      console.error("Error adding to wishlist:", error);
      toast.error("Failed to add to wishlist. Please try again.");
    }
  };

  const handleViewDocuments = () => {
    if (!attachment_path) {
      toast.error("No document available.");
      return;
    }
    setShowDocModal(true);
  };
  const ratings = productData.reviews
    .map((obj) => obj.rating)
    .filter((r) => typeof r === "number");

  const averageRating =
    ratings.length > 0
      ? (ratings.reduce((sum, r) => sum + r, 0) / ratings.length).toFixed(1)
      : 0;

  return (
    <div className={`${!showDocModal && " "}w-full `}>
      {/* <Notifcation /> */}

      <div className="space-y-6">
        <div>
          <h1 className="text-4xl font-semibold text-gray-900 mb-4">{name}</h1>
          <div className="text-3xl font-semibold text-primary mb-6">
            $ {+price + +sizePrice}
          </div>

          <div className="flex items-center gap-2 mb-6">
            <div className="flex items-center">
              <div className="flex items-center gap-2 mb-6">
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                      key={star}
                      className={`h-4 w-4 ${
                        star <= Math.round(averageRating)
                          ? "text-yellow-400 fill-current"
                          : "text-gray-300 fill-current"
                      }`}
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                  ))}
                </div>
                <span className="text-sm text-gray-600">
                  {averageRating} ({productData.reviews.length} Review
                  {productData.reviews.length !== 1 ? "s" : ""})
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-2">
              <Info className="h-6 w-6 text-primary" />
              <span className="text-gray-900">
                {inStock ? inStock + " in stock" : "Out of stock"}
              </span>
            </div>
          </div>

          {!inStock && (
            <button
              onClick={() => setShowModal(true)}
              className="bg-primary block hover:bg-primary/90 text-white px-6 sm:px-8 py-3 rounded-lg font-semibold transition-colors w-full sm:w-auto"
            >
              Request Now
            </button>
          )}
        </div>
      </div>

      <div className="w-92 overflow-hidden">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
          Description
        </h2>
        <p className="text-gray-600 leading-relaxed whitespace-pre">
          {description}
        </p>
      </div>

      <div className="space-y-6 mt-6">
        <div className="flex gap-11">
          <span className="font-semibold text-gray-900 min-w-fit">
            Category
          </span>
          <span className="text-gray-600">: {category}</span>
        </div>

        <div className="flex gap-11 ">
          <span className="font-semibold text-gray-900 min-w-fit">Tags</span>
          <span className="text-gray-600">: {tags?.join(", ") || "N/A"}</span>
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

      <div className="flex flex-wrap gap-2 sm:gap-4 mt-8">
        {sizes.map((size) => (
          <Button
            key={size.id}
            variant="outline"
            onClick={() => {
              setSizePrice(size.price);
              setSelectedSize(size.id);
            }}
            className={`border-gray-900 text-gray-900 hover:bg-primary/50 px-4 py-2 ${
              selectedSize === size.id
                ? "bg-primary text-white hover:shadow-md"
                : ""
            }`}
          >
            {size.name}
          </Button>
        ))}
      </div>

      <div className="flex flex-wrap  sm:flex-row gap-3 mt-8 sm:gap-4">
        <Button
          onClick={handleAddToCart}
          className="bg-primary hover:bg-primary/90 text-white flex items-center gap-2 px-6 py-3 flex-1 sm:w-[90vw]"
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

      <OrderRequestModal
        id={id}
        isOpen={showModal}
        onClose={() => setShowModal(false)}
      />

      {showDocModal && (
        <div className="fixed inset-0 z-50  flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div
            className="bg-white rounded-lg shadow-lg relative overflow-hidden"
            style={{ width: "80%", height: "80%" }}
          >
            {/* Close Button */}
            <button
              className="absolute top-2 left-3 text-white hover:text-red-600 text-2xl font-bold z-10"
              onClick={() => setShowDocModal(false)}
            >
              ×
            </button>

            {/* Loading Spinner */}
            {loading && (
              <div className="absolute inset-0 bg-white bg-opacity-80 z-10 flex items-center justify-center">
                <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}

            {/* Document Viewer */}
            <iframe
              src={`https://docs.google.com/gview?url=${encodeURIComponent(
                attachment_path,
              )}&embedded=true`}
              title="Document Viewer"
              className="w-full h-full"
              onLoad={() => setLoading(false)}
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
}
