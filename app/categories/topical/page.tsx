"use client";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import Link from "next/link";
import { Heart, ShoppingCart, ChevronRight } from "lucide-react";

const products = [
  {
    id: 31,
    name: "Healing Balm",
    description: "Natural healing balm for cuts and scrapes",
    price: 24,
    image:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/53d2a1e21575bc400651458cdd0f744e51d895ac?width=400",
    onSale: false,
  },
  {
    id: 32,
    name: "Soothing Cream",
    description: "Moisturizing cream for sensitive skin",
    price: 32,
    originalPrice: 40,
    image:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/53d2a1e21575bc400651458cdd0f744e51d895ac?width=400",
    onSale: true,
  },
  {
    id: 33,
    name: "Anti-Inflammatory Gel",
    description: "Natural gel for muscle and joint pain",
    price: 28,
    image:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/53d2a1e21575bc400651458cdd0f744e51d895ac?width=400",
    onSale: false,
  },
];

export default function TopicalPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative h-96 bg-primary overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/53d2a1e21575bc400651458cdd0f744e51d895ac?width=696"
            alt="Topical Care"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 h-full flex items-center">
          <div className="text-white">
            <nav className="text-lg mb-4">
              <Link href="/" className="hover:text-gray-200 transition-colors">
                Home
              </Link>
              <span className="mx-2">&gt;</span>
              <Link
                href="/categories"
                className="hover:text-gray-200 transition-colors"
              >
                Categories
              </Link>
              <span className="mx-2">&gt;</span>
              <span>Topical Care</span>
            </nav>
            <h1 className="text-6xl font-bold mb-6">Topical Care</h1>
            <p className="text-xl max-w-2xl">
              Nourish and protect your skin with our natural topical care
              products, formulated with healing botanicals and essential
              nutrients.
            </p>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-4xl font-bold text-foreground">
              Topical Care Products
            </h2>
            <Link href="/categories">
              <button className="text-primary text-xl font-bold hover:text-primary/80 flex items-center gap-2">
                View All Categories
                <ChevronRight className="h-5 w-5" />
              </button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <Link
                key={product.id}
                href={`/products/${product.id}`}
                className="relative w-full h-[408px] rounded-lg overflow-hidden group cursor-pointer"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>

                {/* Sale Badge */}
                {product.onSale && (
                  <div className="absolute top-4 left-4 bg-gray-100 text-primary px-3 py-1 rounded text-sm font-medium">
                    SALE
                  </div>
                )}

                {/* Heart Icon */}
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                  className="absolute top-4 right-4 w-8 h-8 bg-white/50 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/70 transition-colors"
                >
                  <Heart className="h-4 w-4 text-primary stroke-2" />
                </button>

                {/* Product Info */}
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold mb-2">{product.name}</h3>
                    <p className="text-sm opacity-90 mb-4">
                      {product.description}
                    </p>
                    <div className="flex items-center justify-center gap-2 mb-4">
                      <span className="text-primary font-medium">
                        ${product.price}
                      </span>
                      {product.originalPrice && (
                        <span className="text-white/70 line-through">
                          ${product.originalPrice}
                        </span>
                      )}
                    </div>
                    <div className="w-10 h-0.5 bg-white mx-auto"></div>
                  </div>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                    className="w-full bg-primary text-white py-3 rounded flex items-center justify-center gap-2 font-medium hover:bg-primary/90 transition-colors"
                  >
                    <ShoppingCart className="h-4 w-4" />
                    Add to cart
                  </button>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
