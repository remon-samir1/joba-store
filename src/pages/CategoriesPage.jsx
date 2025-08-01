"use client";
import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Footer } from "@/components/Footer";
import Notification from "../../components/Notification";
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
import { Axios } from "../../components/Helpers/Axios";
import axios from "axios";
import { toast } from "react-toastify";
import { Header } from "../components/Header";
import StringSlice from "../../components/Helpers/StringSlice";

const tags = [
  "Natural blends",
  "Natural recipes",
  "physical therapy",
  "Skin Allergy",
  "Sleep Aid",
];

const checkedItemsData = {
  "For Pain": false,
  "For Skin": false,
  "Medical For Respiratory System": false,
};

export default function CategoriesPage() {
  
  const location = useLocation();   
  
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const q = params.get("q");
    if (q) {
      setSearchQuery(q);
    }
  }, [location.search]);
  const [openCategory, setOpenCategory] = useState(null);

  const toggleCategory = (categoryName) => {
    setOpenCategory((prev) => (prev === categoryName ? null : categoryName));
  };
  // const location = useLocation();
  const slugFromUrl = decodeURIComponent(location.pathname.split("/").pop());

  const [categories, setCategories] = useState([]);
  const [categoryTabs, setCategoryTabs] = useState(["All"]);
  const [sidebarCategories, setSidebarCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [recommendedProducts, setRecommendedProducts] = useState([]);
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);
  const [isLoadingProducts, setIsLoadingProducts] = useState(true);
  const [isLoadingRecommended, setIsLoadingRecommended] = useState(true);
  const [activeCategory, setActiveCategory] = useState(null);
  const [sortBy, setSortBy] = useState("Newest");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [checkedItems, setCheckedItems] = useState(checkedItemsData);
  const [medicalMixturesExpanded, setMedicalMixturesExpanded] = useState(true);
  const [wishlist, setWishlist] = useState([]);

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

  useEffect(() => {
    Axios.get("tags").then((data) => console.log(data));
  }, []);
  useEffect(() => {
    Axios.get("/categories")
      .then((res) => {
        console.log(res);

        const apiCategories = res.data.data.data;
        const categoryNames = apiCategories.map((cat) => cat.name);
        setCategories(apiCategories);
        setCategoryTabs(["All", ...categoryNames]);
        setSidebarCategories(apiCategories);

        if (slugFromUrl) {
          const matchedCategory = categoryNames.find(
            (cat) =>
              cat.toLowerCase().replace(/\s+/g, "-") ===
              slugFromUrl.toLowerCase(),
          );
          setActiveCategory(matchedCategory || "All");
        } else {
          setActiveCategory("All");
        }
      })
      .finally(() => setIsLoadingCategories(false));

    Axios.get("/products")
      .then((res) => {
        const allProducts = res.data.data;
        console.log(res);
        setProducts(allProducts);
        setRecommendedProducts(allProducts.slice(0, 6));
      })
      .finally(() => {
        setIsLoadingProducts(false);
        setIsLoadingRecommended(false);
      });
  }, [slugFromUrl]);

  const getFilteredProducts = () => {
    let filtered = products;
    if (activeCategory && activeCategory !== "All") {
      filtered = filtered.filter(
        (product) => product.category?.name === activeCategory,
      );
    }
    if (searchQuery.trim()) {
      filtered = filtered.filter(
        (product) =>
          product.name?.en?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description?.en
            ?.toLowerCase()
            .includes(searchQuery.toLowerCase()),
      );
    }
    return filtered;
  };

  const toggleTag = (tag) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
    );
  };

  const toggleCheckbox = (item) => {
    setCheckedItems((prev) => ({
      ...prev,
      [item]: !prev[item],
    }));
  };

  const filteredProducts = getFilteredProducts();
  const productsPerPage = 9;
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const displayedProducts = filteredProducts.slice(
    startIndex,
    startIndex + productsPerPage,
  );

  const scrollRef = useRef();
  useEffect(()=>{
    scrollRef.current.scrollIntoView()
  },[])
  return (
    <div ref={scrollRef} className="min-h-screen bg-background">
      <Notification />
      <Header />
      {/* <section className="relative h-64 sm:h-80 lg:h-96 bg-white overflow-hidden">
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
              <Link to="/" className="hover:text-primary transition-colors">
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
      </section> */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative w-full sm:w-1/2">
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

        <div className="mb-8 flex flex-wrap gap-9">
          {categoryTabs.map((category) => (
            <button
              key={category}
              onClick={() => {
                setActiveCategory(category);
                setCurrentPage(1);
              }}
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

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
          <aside className="w-full lg:w-80 flex-shrink-0">
            <div className="mb-12">
              <h3 className="text-2xl font-semibold mb-6">Categories</h3>
              <div className="space-y-4">
                {sidebarCategories?.map((category) => (
                  <div key={category.name}>
                    <div
                      className="flex items-center justify-between cursor-pointer"
                      onClick={() => {
                        setActiveCategory(category.name);
                        setCurrentPage(1);
                        toggleCategory(category.name);
                      }}
                    >
                      <span className="text-foreground">{category.name}</span>
                      {category.children?.length > 0 ? (
                        openCategory === category.name ? (
                          <ChevronDown className="h-4 w-4 text-foreground" />
                        ) : (
                          <ChevronRight className="h-4 w-4 text-foreground" />
                        )
                      ) : null}
                    </div>

                    {openCategory === category.name &&
                      category.children?.length > 0 && (
                        <div className="ml-4 mt-1 space-y-1">
                          {category.children?.map((child, index) => (
                            <div
                              key={index}
                              onClick={() => setActiveCategory(child.name)}
                              className="text-sm text-muted-foreground cursor-pointer hover:text-foreground"
                            >
                              {child.name}
                            </div>
                          ))}
                        </div>
                      )}
                  </div>
                ))}
              </div>
            </div>
            <div className="mb-12">
              {/* <div className="flex items-center justify-between mb-4">
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
              )} */}
            </div>
            <div className="mb-12">
              <h3 className="text-2xl font-semibold mb-6">Tags</h3>
              {/* <div className="flex flex-wrap gap-2">
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
              </div> */}
            </div>
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
          <main className="flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-8 sm:mb-12">
              {isLoadingProducts ? (
                Array(9)
                  .fill(0)
                  .map((_, i) => (
                    <div
                      key={i}
                      className="w-full h-[408px] bg-gray-200 rounded-lg animate-pulse"
                    ></div>
                  ))
              ) : displayedProducts.length === 0 ? (
                <div className="w-full flex text-2xl font-semibold flex-1 justify-center text-gray-700  p-8">
                  No Products
                </div>
              ) : (
                displayedProducts.map((product) => (
                  <Link
                    to={`/products/${product.slug}`}
                    key={product.id}
                    className="relative group"
                  >
                    <div className="relative w-full h-[408px] rounded-lg overflow-hidden">
                      <img
                        src={product.images[0].path}
                        alt={product.name?.en}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleAddToWishlist(
                            e,
                            product.slug,
                            product.is_favorite,
                          );
                        }}
                        className="absolute top-4 right-4 w-8 h-8 bg-white/50 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/70 transition-colors"
                      >
                        {product.is_favorite ? (
                          <Heart className="h-4 w-4 fill-red-500 text-red-500" />
                        ) : (
                          <Heart className="h-4 w-4" />
                        )}
                      </button>

                      <div className="absolute bottom-6 left-6 right-6 text-white">
                        <div className="text-center mb-6">
                          <h3 className="text-2xl font-bold mb-2">
                            {product.name?.en}
                          </h3>
                          <p className="text-sm opacity-90 mb-4">
                            {StringSlice(product.description?.en , 100)}
                          </p>
                          <div className="flex items-center justify-center gap-2 mb-4">
                            <span className="text-primary font-medium">
                              ${product.price}
                            </span>
                          </div>
                          <div className="w-10 h-0.5 bg-white mx-auto"></div>
                        </div>
                        <button className="w-full bg-primary text-white py-3 rounded flex items-center justify-center gap-2 font-medium hover:bg-primary/90 transition-colors">
                          <ShoppingCart className="h-4 w-4" />
                          View Details
                        </button>
                      </div>
                    </div>
                  </Link>
                ))
              )}
            </div>
            {/* <section>
              <h2 className="text-4xl font-bold mb-12">Recommended for you</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {isLoadingRecommended
                  ? Array(6)
                      .fill(0)
                      .map((_, i) => (
                        <div
                          key={i}
                          className="w-full h-[408px] bg-gray-200 rounded-lg animate-pulse"
                        ></div>
                      ))
                  : recommendedProducts.map((product) => (
                      <Link
                        to={`/products/${product.slug}`}
                        key={product.id}
                        className="relative group"
                      >
                        <div className="w-full h-[408px] bg-gray-200 rounded-lg overflow-hidden">
                          <img
                            src={product.images[0].path}
                            alt={product.name?.en}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                          <div className="absolute bottom-6 left-6 right-6 text-center text-white">
                            <h3 className="text-2xl font-bold mb-2">
                              {product.name?.en}
                            </h3>
                            <p className="text-primary text-right text-2xl font-medium">
                              EGP {product.price}
                            </p>
                          </div>
                        </div>
                      </Link>
                    ))}
              </div>
            </section> */}
          </main>
        </div>
      </div>
      <Footer />
    </div>
  );
}
