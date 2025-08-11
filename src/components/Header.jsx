import { useState, useEffect, useRef, useContext } from "react";
import {
  Search,
  Heart,
  ShoppingCart,
  User,
  ChevronDown,
  Globe,
  Menu,
  X,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import juba from '../assets/juba.svg'
import { Link } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTranslation } from 'react-i18next';
import { Axios } from "../../components/Helpers/Axios";
import CartContext, { CartCh } from "../../Context/CartContext";

const arabicToEnglishMap = {
  ض: "d",
  ص: "s",
  ث: "th",
  ق: "k",
  ف: "f",
  غ: "gh",
  ع: "a",
  ه: "h",
  خ: "kh",
  ح: "h",
  ج: "g",
  د: "d",
  ش: "sh",
  س: "s",
  ي: "i",
  ب: "b",
  ل: "l",
  ا: "a",
  ت: "t",
  ن: "n",
  م: "m",
  ك: "c",
  ط: "t",
  ئ: "a",
  ء: "a",
  ؤ: "a",
  ر: "r",
  ﻻ: "la",
  ى: "e",
  ة: "t",
  و: "o",
  ز: "z",
  ظ: "z",
  " ": " ",
};

const englishToArabicMap = Object.fromEntries(
  Object.entries(arabicToEnglishMap).map(([arabic, english]) => [
    english,
    arabic,
  ]),
);

function convertByKeyboardMap(str, map) {
  return str
    .split("")
    .map((char) => map[char] || char)
    .join("");
}

export function Header() {
  const { t, i18n } = useTranslation();

  const location = useLocation();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState(i18n.language === 'ar' ? "AR" : 'EN');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const searchContainerRef = useRef(null);

  const getSearchVariations = (query) => {
    const variations = new Set([query]);
    variations.add(convertByKeyboardMap(query, arabicToEnglishMap));
    variations.add(convertByKeyboardMap(query, englishToArabicMap));
    return Array.from(variations).filter(Boolean).join(' ');
  };

  const fetchSuggestions = async () => {
    if (!searchQuery.trim()) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }
    setIsLoadingSuggestions(true);
    try {
      const searchVariations =searchQuery;
      const response = await Axios.get('/products', {
        params: { q: searchVariations.trim() }
      });
      setSuggestions(response.data.data.slice(0, 5));
    } catch (error) {
      console.error("Search error:", error);
      setSuggestions([]);
    } finally {
      setIsLoadingSuggestions(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target)
      ) {
        // Only hide suggestions if search is empty
        if (searchQuery.trim() === '') {
          setShowSuggestions(false);
        }
      }
    };
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [searchQuery]);

  const handleSearch = (e) => {
    e.preventDefault();
    const query = searchQuery.trim();
    if (query) {
      const searchVariations = getSearchVariations(query);
      navigate(`/categories?q=${encodeURIComponent(searchVariations)}`);
      setShowSuggestions(false);
      setIsMobileSearchOpen(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    navigate(`/products/${suggestion.slug}`);
    setShowSuggestions(false);
    setIsMobileSearchOpen(false);
  };

  console.log(suggestions);
  const languages = [
    { code: "en", name: "English", flag: "EN" },
    { code: "ar", name: "العربية", flag: "AR" },
  ];
  const handelChangeLanguegae =(value)=>{
    i18n.changeLanguage(value);
    document.documentElement.setAttribute("dir" , value === 'ar' ? 'rtl' : 'ltr')
  }

  useEffect(()=>{
    document.documentElement.setAttribute("dir" , i18n.language === 'ar' ? 'rtl' : 'ltr')

  },[i18n.language])
  const [cart, setCart] = useState(0);
  const cartcontext = useContext(CartCh);
  const change = cartcontext.cartChange;

  useEffect(() => {
    Axios.get("/cart").then((data) => {
      setCart(data.data.data.items?.length || 0);
    });
  }, [change]);

  return (
    <header className="w-full">
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20 lg:h-24">
            <div className="flex-shrink-0">
              <Link to="/">
                <div className="w-32 h-20 md:w-36 md:h-24">
                  <img
                    src={juba}
                    alt="Goba Store Logo"
                    className="w-full h-full object-cover"
                  />
                </div>
              </Link>
            </div>

            <div className="hidden lg:flex items-center gap-6 xl:gap-8">
              <form
                onSubmit={handleSearch}
                className="relative"
                ref={searchContainerRef}
              >
                <div className="flex items-center bg-white border border-gray-300 rounded-full px-4 xl:px-6 py-2 xl:py-3 w-64 xl:w-80">
                  <Search className="h-4 xl:h-5 w-4 xl:w-5 text-gray-400 mr-2 xl:mr-3" />
                  <input
                    type="text"
                    placeholder={t("Search our Products..")}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setShowSuggestions(true)}
                    className="bg-transparent border-none outline-none text-sm text-gray-600 flex-1"
                  />
                  {searchQuery && (
                    <button
                      type="submit"
                      className="ml-2 text-primary hover:text-primary/80 transition-colors"
                    >
                      <Search className="h-4 w-4" />
                    </button>
                  )}
                </div>

                {(showSuggestions || searchQuery !== '') && (
                  <div className="absolute top-full left-0 w-full bg-white border border-gray-200 rounded-lg shadow-lg mt-1 z-50">
                    {isLoadingSuggestions ? (
                      <div className="px-4 py-3 flex justify-center">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary"></div>
                      </div>
                    ) : suggestions.length > 0 ? (
                      suggestions.map((suggestion, index) => (
                        <div
                          key={index}
                          className="px-4 py-3 hover:bg-gray-50 cursor-pointer flex flex-col gap-1"
                          onClick={() => handleSuggestionClick(suggestion)}
                        >
                          <div className="flex items-center gap-3">
                            <Search className="h-4 w-4 text-gray-400 flex-shrink-0" />
                            <span className="text-gray-700">
                              {suggestion.name.en}
                            </span>
                          </div>
                          {suggestion.name.ar && (
                            <div className="flex items-center gap-3 text-right mr-7">
                              <span className="text-gray-500 text-sm">
                                {suggestion.name.ar}
                              </span>
                            </div>
                          )}
                        </div>
                      ))
                    ) : suggestions.length === 0 &&   (
                      <div className="px-4 py-3 text-gray-500">
                        {t('No results found')}
                      </div>
                    )}
                  </div>
                )}
              </form>

              <DropdownMenu>
                <DropdownMenuTrigger className="flex outline-none items-center gap-1 hover:bg-gray-50 px-3 py-2 rounded-lg transition-colors">
                  <span className="text-base xl:text-lg font-medium text-gray-900">
                    {selectedLanguage}
                  </span>
                  <ChevronDown className="h-4 xl:h-5 w-4 xl:w-5 text-gray-900" />
                  <Globe className="h-4 xl:h-5 w-4 xl:w-5 text-gray-900 ml-1" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  {languages.map((lang) => (
                    <DropdownMenuItem
                      key={lang.code}
                      onClick={() =>{
                        handelChangeLanguegae(lang.code)
                        setSelectedLanguage(lang.flag)}}
                      className="flex items-center gap-3 cursor-pointer"
                    >
                      <span className="text-lg">{lang.flag}</span>
                      <div className="flex flex-col">
                        <span className="font-medium">{lang.flag}</span>
                        <span className="text-sm text-gray-500">
                          {lang.name}
                        </span>
                      </div>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <div className="lg:hidden flex items-center">
              <button
                className="p-2 text-gray-400 hover:text-gray-600"
                onClick={() => setIsMobileSearchOpen(true)}
              >
                <Search className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {isMobileSearchOpen && (
        <div className="lg:hidden bg-white border-b py-3 px-4">
          <div className="relative" ref={searchContainerRef}>
            <form onSubmit={handleSearch} className="flex items-center">
              <button
                type="button"
                className="mr-2 text-gray-500"
                onClick={() => {
                  setIsMobileSearchOpen(false);
                  setShowSuggestions(false);
                }}
              >
                <X className="h-5 w-5" />
              </button>
              <div className="flex items-center bg-gray-100 rounded-full px-4 py-2 flex-1">
                <Search className="h-5 w-5 text-gray-400 mr-3" />
                <input
                  type="text"
                  placeholder={t("Search our Products..")}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setShowSuggestions(true)}
                  className="bg-transparent border-none outline-none text-base text-gray-700 flex-1"
                  autoFocus
                />
              </div>
              {searchQuery && (
                <button
                  type="submit"
                  className="ml-2 text-primary font-medium"
                  onClick={handleSearch}
                >
                  {t("Search")}
                </button>
              )}
            </form>

            {showSuggestions && (
              <div className="absolute top-full left-0 w-full bg-white border border-gray-200 rounded-lg shadow-lg mt-1 z-50">
                {isLoadingSuggestions ? (
                  <div className="px-4 py-3 flex justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary"></div>
                  </div>
                ) : suggestions.length > 0 ? (
                  suggestions.map((suggestion, index) => (
                    <div
                      key={index}
                      className="px-4 py-3 hover:bg-gray-50 cursor-pointer flex flex-col gap-1 border-b border-gray-100 last:border-0"
                      onClick={() => handleSuggestionClick(suggestion)}
                    >
                      <div className="flex items-center gap-3">
                        <Search className="h-4 w-4 text-gray-400 flex-shrink-0" />
                        <span className="text-gray-700">
                          {suggestion.name.en}
                        </span>
                      </div>
                      {suggestion.name.ar && (
                        <div className="flex items-center gap-3 text-right mr-7">
                          <span className="text-gray-500 text-sm">
                            {suggestion.name.ar}
                          </span>
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="px-4 py-3 text-gray-500">
                    {t("No results found")}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      <div className="bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-18 lg:h-20">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden text-white hover:text-gray-200 transition-colors"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>

            <nav className="hidden lg:flex items-center gap-4 xl:gap-8">
              <Link
                to="/"
                className={`px-3 xl:px-4 py-2 rounded font-semibold transition-colors text-sm xl:text-base ${
                  location.pathname === "/"
                    ? "text-gray-900 bg-white"
                    : "text-white hover:text-gray-200"
                }`}
              >
              {t("Home")}
              </Link>
              <Link
                to="/categories"
                className={`px-3 xl:px-4 py-2 rounded font-semibold transition-colors text-sm xl:text-base ${
                  location.pathname.startsWith("/categories")
                    ? "text-gray-900 bg-white"
                    : "text-white hover:text-gray-200"
                }`}
              >
              {t("Categories")}
              </Link>
              <Link
                to="/about"
                className={`px-3 xl:px-4 py-2 rounded font-semibold transition-colors text-sm xl:text-base ${
                  location.pathname === "/about"
                    ? "text-gray-900 bg-white"
                    : "text-white hover:text-gray-200"
                }`}
              >
              {t("About")}
              </Link>
              <Link
                to="/blog"
                className={`px-3 xl:px-4 py-2 rounded font-semibold transition-colors text-sm xl:text-base ${
                  location.pathname.startsWith("/blog")
                    ? "text-gray-900 bg-white"
                    : "text-white hover:text-gray-200"
                }`}
              >
          {t("Blog")}
              </Link>
              <Link
                to="/contact"
                className={`px-3 xl:px-4 py-2 rounded font-semibold transition-colors text-sm xl:text-base ${
                  location.pathname === "/contact"
                    ? "text-gray-900 bg-white"
                    : "text-white hover:text-gray-200"
                }`}
              >
                {t("Contact us")}
              </Link>
              <Link
                to="/dashboard"
                className={`px-3 xl:px-4 py-2 rounded font-semibold transition-colors text-sm xl:text-base ${
                  location.pathname.startsWith("/dashboard")
                    ? "text-gray-900 bg-white"
                    : "text-white hover:text-gray-200"
                }`}
              >
              {t("Dashboard")}
              </Link>
            </nav>

            <div className="flex items-center gap-3 sm:gap-4 lg:gap-6">
              <div className="hidden md:flex items-center">
                <Link
                  to="/help"
                  className="px-2 lg:px-4 py-2 text-white hover:text-gray-200 font-semibold text-sm lg:text-base"
                >
                {t("help")}
                </Link>
                <div className="w-px h-6 bg-white/30 mx-2"></div>
                <Link
                  to="/support"
                  className={`px-2 lg:px-4 py-2 rounded font-semibold transition-colors text-sm lg:text-base ${
                    location.pathname === "/support"
                      ? "text-gray-900 bg-white"
                      : "text-white hover:text-gray-200"
                  }`}
                >
                  {t("Support")}
                </Link>
              </div>

              <div className="flex items-center gap-2 sm:gap-3 lg:gap-4">
                <Link to="/wishlist" className="relative">
                  <Heart className="h-6 sm:h-7 lg:h-8 w-6 sm:w-7 lg:w-8 text-white hover:text-gray-200 transition-colors" />
                </Link>

                <Link to="/cart" className="relative">
                  <ShoppingCart className="h-6 sm:h-7 lg:h-8 w-6 sm:w-7 lg:w-8 text-white hover:text-gray-200 transition-colors" />
                  {cart > 0 && (
                    <div className="absolute -top-1 sm:-top-2 -right-1 sm:-right-2 bg-gray-900 text-white rounded-full w-5 sm:w-6 h-5 sm:h-6 flex items-center justify-center text-xs font-medium">
                      {cart > 99 ? "99+" : cart}
                    </div>
                  )} 
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 z-50 bg-black/50"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <div
            className="bg-white w-72 sm:w-80 h-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-8">
                <div className="w-36 h-20 shrink-0 ">
                <img src={juba} className="w-full h-full object-cover " />
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-gray-600 hover:text-gray-900"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <nav className="space-y-4">
                <Link
                  to="/"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block py-3 px-4 rounded font-semibold transition-colors ${
                    location.pathname === "/"
                      ? "text-primary bg-primary/10"
                      : "text-gray-700 hover:text-primary hover:bg-gray-50"
                  }`}
                >
              {t("Home")}
                </Link>
                <Link
                  to="/categories"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block py-3 px-4 rounded font-semibold transition-colors ${
                    location.pathname.startsWith("/categories")
                      ? "text-primary bg-primary/10"
                      : "text-gray-700 hover:text-primary hover:bg-gray-50"
                  }`}
                >
                {t("Categories")}
                </Link>
                <Link
                  to="/about"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block py-3 px-4 rounded font-semibold transition-colors ${
                    location.pathname === "/about"
                      ? "text-primary bg-primary/10"
                      : "text-gray-700 hover:text-primary hover:bg-gray-50"
                  }`}
                >
              {t("About")}
                </Link>
                <Link
                  to="/blog"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block py-3 px-4 rounded font-semibold transition-colors ${
                    location.pathname.startsWith("/blog")
                      ? "text-primary bg-primary/10"
                      : "text-gray-700 hover:text-primary hover:bg-gray-50"
                  }`}
                >
              {t("Blog")}
                </Link>
                <Link
                  to="/contact"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block py-3 px-4 rounded font-semibold transition-colors ${
                    location.pathname === "/contact"
                      ? "text-primary bg-primary/10"
                      : "text-gray-700 hover:text-primary hover:bg-gray-50"
                  }`}
                >
                {t("Contact us")}
                </Link>
                <Link
                  to="/help"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block py-3 px-4 rounded font-semibold transition-colors ${
                    location.pathname === "/help"
                      ? "text-primary bg-primary/10"
                      : "text-gray-700 hover:text-primary hover:bg-gray-50"
                  }`}
                >
                  {t("Help")}
                </Link>
                <Link
                  to="/support"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block py-3 px-4 rounded font-semibold transition-colors ${
                    location.pathname === "/support"
                      ? "text-primary bg-primary/10"
                      : "text-gray-700 hover:text-primary hover:bg-gray-50"
                  }`}
                >
                  {t("Support")}
                </Link>
                <Link
                  to="/dashboard"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block py-3 px-4 rounded font-semibold transition-colors ${
                    location.pathname.startsWith("/dashboard")
                      ? "text-primary bg-primary/10"
                      : "text-gray-700 hover:text-primary hover:bg-gray-50"
                  }`}
                >
                {t("Dashboard")}
                </Link>
              </nav>

              <div className="mt-8 pt-8 border-t space-y-4">
                <Link
                  to="/wishlist"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-3 py-3 px-4 text-gray-700 hover:text-primary hover:bg-gray-50 rounded transition-colors"
                >
                  <Heart className="h-5 w-5" />
                  <span>{t("Wishlist")}</span>
                </Link>
                <Link
                  to="/cart"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-3 py-3 px-4 text-gray-700 hover:text-primary hover:bg-gray-50 rounded transition-colors"
                >
                  <ShoppingCart className="h-5 w-5" />
                  <span>{t("Cart")} ({cart})</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}