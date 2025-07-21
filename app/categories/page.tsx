"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import {
  Search,
  Filter,
  Grid,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Heart,
  ShoppingCart,
  ArrowRight,
} from "lucide-react";

const categoryTabs = [
  "All",
  "Medical Mixtures",
  "Therapeutic Oils",
  "Creams & Ointments",
  "Custom Formulations",
  "Kids Products",
];

const sidebarCategories = [
  "Therapeutic Oils",
  "Creams & Ointments",
  "Custom Formulations",
  "Kids Products",
];

const tags = [
  "Natural blends",
  "Natural recipes",
  "physical therapy",
  "Skin Allergy",
  "Sleep Aid",
];

const products = [
  {
    id: 1,
    name: "Joint Pain",
    description: "Medium Shoulder Bags",
    price: 384,
    originalPrice: 454,
    image:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/cadd4badf0dd90d25f5e7f4b5a15251a6a065f26?width=296",
    onSale: true,
    category: "Medical Mixtures",
  },
  {
    id: 2,
    name: "Joint Pain",
    description: "Medium Shoulder Bags",
    price: 384,
    originalPrice: 454,
    image:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/cadd4badf0dd90d25f5e7f4b5a15251a6a065f26?width=296",
    onSale: true,
    category: "Therapeutic Oils",
  },
  {
    id: 3,
    name: "Joint Pain",
    description: "Medium Shoulder Bags",
    price: 384,
    originalPrice: 454,
    image:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/cadd4badf0dd90d25f5e7f4b5a15251a6a065f26?width=296",
    onSale: true,
    category: "Creams & Ointments",
  },
  {
    id: 4,
    name: "Joint Pain",
    description: "Medium Shoulder Bags",
    price: 384,
    originalPrice: 454,
    image:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/cadd4badf0dd90d25f5e7f4b5a15251a6a065f26?width=296",
    onSale: true,
    category: "Custom Formulations",
  },
  {
    id: 5,
    name: "Joint Pain",
    description: "Medium Shoulder Bags",
    price: 384,
    originalPrice: 454,
    image:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/cadd4badf0dd90d25f5e7f4b5a15251a6a065f26?width=296",
    onSale: true,
    category: "Kids Products",
  },
  {
    id: 6,
    name: "Joint Pain",
    description: "Medium Shoulder Bags",
    price: 384,
    originalPrice: 454,
    image:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/cadd4badf0dd90d25f5e7f4b5a15251a6a065f26?width=296",
    onSale: true,
    category: "Medical Mixtures",
  },
  {
    id: 7,
    name: "Joint Pain",
    description: "Medium Shoulder Bags",
    price: 384,
    originalPrice: 454,
    image:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/cadd4badf0dd90d25f5e7f4b5a15251a6a065f26?width=296",
    onSale: true,
    category: "Therapeutic Oils",
  },
  {
    id: 8,
    name: "Joint Pain",
    description: "Medium Shoulder Bags",
    price: 384,
    originalPrice: 454,
    image:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/cadd4badf0dd90d25f5e7f4b5a15251a6a065f26?width=296",
    onSale: true,
    category: "Creams & Ointments",
  },
  {
    id: 9,
    name: "Joint Pain",
    description: "Medium Shoulder Bags",
    price: 384,
    originalPrice: 454,
    image:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/cadd4badf0dd90d25f5e7f4b5a15251a6a065f26?width=296",
    onSale: true,
    category: "Custom Formulations",
  },
];

const recommendedProducts = [
  {
    id: 101,
    name: "Queen's Summer",
    price: 384,
    image:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/eddfdc699d8281bb16d0aa99d53c775bc0bb8a30?width=400",
  },
  {
    id: 102,
    name: "Queen's Summer",
    price: 384,
    image:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/eddfdc699d8281bb16d0aa99d53c775bc0bb8a30?width=400",
  },
  {
    id: 103,
    name: "Queen's Summer",
    price: 384,
    image:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/eddfdc699d8281bb16d0aa99d53c775bc0bb8a30?width=400",
  },
  {
    id: 104,
    name: "Queen's Summer",
    price: 384,
    image:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/eddfdc699d8281bb16d0aa99d53c775bc0bb8a30?width=400",
  },
  {
    id: 105,
    name: "Queen's Summer",
    price: 384,
    image:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/eddfdc699d8281bb16d0aa99d53c775bc0bb8a30?width=400",
  },
  {
    id: 106,
    name: "Queen's Summer",
    price: 384,
    image:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/eddfdc699d8281bb16d0aa99d53c775bc0bb8a30?width=400",
  },
];

interface CheckedItems {
  [key: string]: boolean;
}

export default function CategoriesPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [sortBy, setSortBy] = useState("Newest");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [medicalMixturesExpanded, setMedicalMixturesExpanded] = useState(true);
  const [checkedItems, setCheckedItems] = useState<CheckedItems>({
    "For Pain": false,
    "For Skin": false,
    "Medical For Respiratory System": false,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [priceRange, setPriceRange] = useState([50, 2000]);

  const getFilteredProducts = () => {
    let filtered = products;

    if (activeCategory !== "All") {
      filtered = filtered.filter(
        (product) => product.category === activeCategory,
      );
    }

    if (searchQuery.trim()) {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }

    return filtered;
  };

  const filteredProducts = getFilteredProducts();
  const productsPerPage = 9;
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const displayedProducts = filteredProducts.slice(
    startIndex,
    startIndex + productsPerPage,
  );

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
    );
  };

  const toggleCheckbox = (item: string) => {
    setCheckedItems((prev) => ({
      ...prev,
      [item]: !prev[item],
    }));
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative h-64 sm:h-80 lg:h-96 bg-white overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/cadd4badf0dd90d25f5e7f4b5a15251a6a065f26?width=2880"
            alt="Categories Hero"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="text-foreground">
            <nav className="text-lg sm:text-xl lg:text-2xl font-semibold mb-4 sm:mb-6 lg:mb-8">
              <Link href="/" className="hover:text-primary transition-colors">
                Home
              </Link>
              <span className="mx-2">&gt;</span>
              <span>Categories</span>
            </nav>
            <h1 className="text-3xl sm:text-4xl lg:text-6xl font-semibold">
              Categories
            </h1>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
          {/* Sidebar */}
          <aside className="w-full lg:w-80 flex-shrink-0">
            {/* Price Filter */}
            <div className="mb-12">
              <h3 className="text-2xl font-semibold mb-6">Price</h3>
              <div className="relative mb-6">
                <div className="h-2 bg-gray-200 rounded-full">
                  <div
                    className="h-2 bg-gray-300 rounded-full"
                    style={{ width: "75%" }}
                  ></div>
                </div>
                <div className="absolute left-0 top-0 w-4 h-4 bg-gray-300 border-2 border-gray-400 rounded-full -mt-1"></div>
                <div className="absolute right-0 top-0 w-4 h-4 bg-gray-300 border-2 border-gray-400 rounded-full -mt-1"></div>
              </div>
              <div className="flex justify-between text-foreground">
                <span>Range</span>
                <span>EGP 50 - EGP 2000</span>
              </div>
            </div>

            {/* Categories */}
            <div className="mb-12">
              <h3 className="text-2xl font-semibold mb-6">Categories</h3>
              <div className="space-y-4">
                {sidebarCategories.map((category) => (
                  <div
                    key={category}
                    className="flex items-center justify-between"
                  >
                    <span className="text-foreground">{category}</span>
                    <ChevronRight className="h-4 w-4 text-foreground" />
                  </div>
                ))}
              </div>
            </div>

            {/* Medical Mixtures Subcategories */}
            <div className="mb-12">
              <div className="flex items-center justify-between mb-4">
                <span className="text-foreground font-medium">
                  Medical Mixtures
                </span>
                <button
                  onClick={() =>
                    setMedicalMixturesExpanded(!medicalMixturesExpanded)
                  }
                  className={`transition-transform ${
                    medicalMixturesExpanded ? "rotate-90" : "rotate-0"
                  }`}
                >
                  <ChevronDown className="h-4 w-4 text-foreground" />
                </button>
              </div>
              {medicalMixturesExpanded && (
                <div className="space-y-4 ml-4">
                  {Object.entries(checkedItems).map(([item, checked]) => (
                    <div key={item} className="flex items-center gap-2">
                      <button
                        onClick={() => toggleCheckbox(item)}
                        className={`w-4 h-4 rounded border ${
                          checked
                            ? "bg-foreground border-foreground"
                            : "border-foreground bg-transparent"
                        } flex items-center justify-center`}
                      >
                        {checked && (
                          <svg
                            className="w-3 h-3 text-white"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        )}
                      </button>
                      <span className="text-sm text-foreground">{item}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Tags */}
            <div className="mb-12">
              <h3 className="text-2xl font-semibold mb-6">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => toggleTag(tag)}
                    className={`px-3 py-2 rounded-lg text-sm transition-colors ${
                      selectedTags.includes(tag)
                        ? "bg-primary text-white"
                        : "bg-gray-100 text-foreground hover:bg-gray-200"
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Promotional Banner */}
            <div className="bg-primary rounded-lg p-8 text-white">
              <h3 className="text-4xl font-semibold mb-4">March Discount</h3>
              <p className="text-2xl mb-6 leading-relaxed">
                Up to 70% Off for All Items in March
              </p>
              <button className="bg-white text-primary px-6 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors flex items-center gap-2">
                Got it
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            {/* Category Tabs */}
            <div className="flex flex-wrap gap-9 mb-8">
              {categoryTabs.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`pb-2 border-b-4 transition-colors ${
                    activeCategory === category
                      ? "text-primary border-primary font-medium"
                      : "text-gray-500 border-transparent hover:text-foreground"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Search and Sort Bar */}
            <div className="flex flex-col gap-4 mb-8">
              <div className="flex-1">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search products"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-4 pr-12 py-3 sm:py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                  <Search className="absolute right-4 top-3 sm:top-4 h-5 w-5 sm:h-6 sm:w-6 text-gray-400" />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
                  <span className="text-gray-500 text-sm sm:text-base">
                    Showing 1-9 Results
                  </span>

                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                    <span className="text-foreground text-sm sm:text-base">
                      Sort by
                    </span>
                    <div className="relative">
                      <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="appearance-none bg-white border border-foreground rounded-lg px-3 sm:px-4 py-2 pr-8 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm sm:text-base w-full sm:w-auto"
                      >
                        <option value="Newest">Newest</option>
                        <option value="Price Low">Price: Low to High</option>
                        <option value="Price High">Price: High to Low</option>
                        <option value="Featured">Featured</option>
                      </select>
                      <ChevronDown className="absolute right-2 top-2.5 h-4 w-4 sm:h-5 sm:w-5 text-foreground pointer-events-none" />
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 sm:gap-4 ml-auto">
                  <button className="w-8 h-8 sm:w-9 sm:h-9 bg-primary rounded-lg flex items-center justify-center">
                    <Filter className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                  </button>

                  <button className="p-2 border border-gray-300 rounded">
                    <Grid className="h-4 w-4 sm:h-5 sm:w-5 text-foreground" />
                  </button>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-8 sm:mb-12">
              {displayedProducts.map((product) => (
                <div key={product.id} className="relative group">
                  <div className="relative w-full h-[408px] rounded-lg overflow-hidden">
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
                    <button className="absolute top-4 right-4 w-8 h-8 bg-white/50 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/70 transition-colors">
                      <Heart className="h-4 w-4 text-primary stroke-2" />
                    </button>

                    {/* Product Info */}
                    <div className="absolute bottom-6 left-6 right-6 text-white">
                      <div className="text-center mb-6">
                        <h3 className="text-2xl font-bold mb-2">
                          {product.name}
                        </h3>
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
                      <button className="w-full bg-primary text-white py-3 rounded flex items-center justify-center gap-2 font-medium hover:bg-primary/90 transition-colors">
                        <ShoppingCart className="h-4 w-4" />
                        Add to cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-center gap-4 mb-16">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                className="w-8 h-8 flex items-center justify-center rounded disabled:opacity-50"
              >
                <ChevronLeft className="h-4 w-4 text-gray-400" />
              </button>

              {[1, 2, 3, 4, 5].map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-8 h-8 rounded text-sm font-medium transition-colors ${
                    currentPage === page
                      ? "bg-primary text-white"
                      : "text-gray-500 hover:text-foreground"
                  }`}
                >
                  {page}
                </button>
              ))}

              <button
                disabled={currentPage === totalPages}
                onClick={() =>
                  setCurrentPage((prev) => Math.min(totalPages, prev + 1))
                }
                className="w-8 h-8 flex items-center justify-center rounded disabled:opacity-50"
              >
                <ChevronRight className="h-4 w-4 text-primary" />
              </button>
            </div>

            {/* Recommended for you */}
            <section>
              <h2 className="text-4xl font-bold mb-12">Recommended for you</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {recommendedProducts.map((product) => (
                  <div key={product.id} className="relative group">
                    <div className="w-full h-[408px] bg-gray-200 rounded-lg overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>

                      <div className="absolute bottom-6 left-6 right-6 text-center text-white">
                        <h3 className="text-2xl font-bold mb-2">
                          {product.name}
                        </h3>
                        <p className="text-primary text-right text-2xl font-medium">
                          EGP {product.price}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </main>
        </div>
      </div>

      <Footer />
    </div>
  );
}
