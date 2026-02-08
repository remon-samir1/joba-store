// "use client";
import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Footer } from "@/components/Footer";
import Notification from "../../components/Notification";
import {
  Search,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Heart,
  ShoppingCart,
  ArrowRight,
} from "lucide-react";
import { Axios } from "../../components/Helpers/Axios";
import { toast } from "react-toastify";
import { Header } from "../components/Header";
import StringSlice from "../../components/Helpers/StringSlice";
import { useTranslation } from "react-i18next";

export default function CategoriesPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const slugFromUrl = decodeURIComponent(location.pathname.split("/").pop());

  const [categories, setCategories] = useState([]);
  const [categoryTabs, setCategoryTabs] = useState(["All"]);
  const [sidebarCategories, setSidebarCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);
  const [isLoadingProducts, setIsLoadingProducts] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [wishlist, setWishlist] = useState([]);
  const [openCategory, setOpenCategory] = useState(null);
  console.log(activeCategory);
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const q = params.get("q");
    const page = parseInt(params.get("page")) || 1;
    if (q) setSearchQuery(q);
    setCurrentPage(page);
  }, [location.search]);

  const toggleCategory = (categoryName) => {
    setOpenCategory((prev) => (prev === categoryName ? null : categoryName));
  };

  const handleAddToWishlist = async (e, slug, is_favorite) => {
    e.stopPropagation();
    e.preventDefault();
    try {
      if (is_favorite) {
        await Axios.delete(`/wishlist/${slug}`);
        toast.success(`Removed From wishlist !`);
        setProducts(
          products.map((prev) =>
            prev.slug == slug ? { ...prev, is_favorite: false } : prev,
          ),
        );
      } else {
        await Axios.post(`/wishlist/${slug}`);
        toast.success(`Added to wishlist !`);
        setProducts(
          products.map((prev) =>
            prev.slug == slug ? { ...prev, is_favorite: true } : prev,
          ),
        );
      }
    } catch (error) {
      console.error("Error adding to wishlist:", error);
      toast.error("Failed to add to wishlist. Please try again.");
    }
  };

  useEffect(() => {
    Axios.get("/categories")
      .then((res) => {
        const apiCategories = res.data.data.data;
        const categoryNames = apiCategories.map((cat) => cat.id);
        setCategories(apiCategories);
        setCategoryTabs([...apiCategories]);
        setSidebarCategories(apiCategories);
        if (slugFromUrl) {
          const matchedCategory = apiCategories.find(
            (cat) => cat.slug.toLowerCase() == slugFromUrl.toLowerCase(),
          );
          console.log(slugFromUrl);
          console.log(matchedCategory);
          setActiveCategory(matchedCategory.id || "All");
        } else {
          setActiveCategory("All");
        }
      })
      .finally(() => setIsLoadingCategories(false));
  }, [slugFromUrl]);

  useEffect(() => {
    scrollRef.current.scrollIntoView({ behavior: "smooth" });
    setIsLoadingProducts(true);
    let url = `/products?q=${encodeURIComponent(searchQuery.trim())}`;
    if (activeCategory && activeCategory !== "All") {
      url += `&category=${encodeURIComponent(activeCategory)}`;
    }
    // if (searchQuery.trim()) {
    //   url += `&q=${encodeURIComponent(searchQuery.trim())}`;
    // }
    Axios.get(url)
      .then((res) => {
        console.log();
        console.log(res);
        const responseData = res.data.data;
        setProducts(responseData);

        setTotalPages(res.data.total);
      })
      .finally(() => setIsLoadingProducts(false));
  }, [currentPage, activeCategory, searchQuery]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    params.set("page", currentPage);
    navigate(`?${params.toString()}`, { replace: true });
  }, [currentPage]);

  const scrollRef = useRef();
  const { t, i18n } = useTranslation();
  return (
    <div ref={scrollRef} className="min-h-screen bg-background">
      <Notification />
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative w-full sm:w-1/2">
            <input
              type="text"
              placeholder={t("Search products")}
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-4 pr-12 py-3 sm:py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
            <Search className="absolute right-4 top-3 sm:top-4 h-5 w-5 sm:h-6 sm:w-6 text-gray-400" />
          </div>
        </div>

        <div className="mb-8 flex flex-wrap gap-9">
          <button
            onClick={() => {
              setActiveCategory("All");
            }}
            className={`pb-2 border-b-4 transition-colors ${
              activeCategory === "All"
                ? "text-primary border-primary font-medium"
                : "text-gray-500 border-transparent hover:text-foreground"
            }`}
          >
            All
          </button>
          {categoryTabs.map((category) => (
            <button
              key={category}
              onClick={() => {
                setActiveCategory(category.id);
                setCurrentPage(1);
              }}
              className={`pb-2 border-b-4 transition-colors ${
                activeCategory === category.id
                  ? "text-primary border-primary font-medium"
                  : "text-gray-500 border-transparent hover:text-foreground"
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
          <aside className="w-full lg:w-80 flex-shrink-0">
            <div className="mb-12">
              <h3 className="text-2xl font-semibold mb-6">{t("Categories")}</h3>
              <div className="space-y-4">
                {sidebarCategories?.map((category) => (
                  <div key={category.name}>
                    <div
                      className="flex items-center justify-between cursor-pointer"
                      onClick={() => {
                        setActiveCategory(category.id);
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
                              onClick={() => {
                                setActiveCategory(child.name);
                                setCurrentPage(1);
                              }}
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
              ) : products?.length === 0 ? (
                <div className="w-full flex text-2xl font-semibold flex-1 justify-center text-gray-700  p-8">
                  {t("No Products")}
                </div>
              ) : (
                products?.map((product) => (
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
                        onClick={(e) =>
                          handleAddToWishlist(
                            e,
                            product.slug,
                            product.is_favorite,
                          )
                        }
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
                            {i18n.language === "ar" ? product.name?.ar || product.name?.en : product.name?.en}
                          </h3>
                          <div 
                            className="text-sm opacity-90 mb-4 line-clamp-3"
                            dangerouslySetInnerHTML={{
                              __html: i18n.language === "ar" ? product.description?.ar || product.description?.en : product.description?.en
                            }}
                          />
                          <div className="flex items-center justify-center gap-2 mb-4">
                            <span className="text-primary font-medium">
                              {new Intl.NumberFormat("en-EG", { style: "currency", currency: "EGP", minimumFractionDigits: 0 }).format(
                                (product.sizes[0]?.price || 0) - +product.discount_price
                              )}
                            </span>
                            <span className="text-white/70 line-through text-sm sm:text-base">
                              {product.discount_price != 0
                                ? new Intl.NumberFormat("en-EG", { style: "currency", currency: "EGP", minimumFractionDigits: 0 }).format(product.sizes[0]?.price || 0)
                                : ""}
                            </span>
                          </div>
                          <div className="w-10 h-0.5 bg-white mx-auto"></div>
                        </div>
                        <button className="w-full bg-primary text-white py-3 rounded flex items-center justify-center gap-2 font-medium hover:bg-primary/90 transition-colors">
                          <ShoppingCart className="h-4 w-4" />
                          {t("View Details")}
                        </button>
                      </div>
                    </div>
                  </Link>
                ))
              )}
            </div>

            <div className="flex justify-center items-center gap-4 mt-8">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className={`px-4 py-2 rounded border ${
                  currentPage === 1
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                    : "bg-white text-black hover:bg-gray-100"
                }`}
              >
                <ChevronLeft className="h-4 w-4" />
              </button>

              {Array.from(
                { length: Math.ceil(totalPages / 10) },
                (_, index) => index + 1,
              ).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-4 py-2 rounded border ${
                    currentPage === page
                      ? "bg-primary text-white"
                      : "bg-white hover:bg-gray-100"
                  }`}
                >
                  {page}
                </button>
              ))}

              <button
                onClick={() =>
                  setCurrentPage((prev) =>
                    Math.min(prev + 1, Math.ceil(totalPages / 10)),
                  )
                }
                disabled={currentPage === totalPages / 10}
                className={`px-4 py-2 rounded border ${
                  currentPage === totalPages
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                    : "bg-white text-black hover:bg-gray-100"
                }`}
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </main>
        </div>
      </div>
      <Footer />
    </div>
  );
}
