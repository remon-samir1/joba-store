import { useState } from "react";
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
import { Link } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("EN");
  const [cartItemCount, setCartItemCount] = useState(3);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const languages = [
    { code: "EN", name: "English", flag: "🇺🇸" },
    { code: "ES", name: "Español", flag: "🇪🇸" },
    { code: "FR", name: "Français", flag: "🇫🇷" },
    { code: "DE", name: "Deutsch", flag: "🇩🇪" },
  ];

  return (
    <header className="w-full">
      {/* Top bar with white background */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20 lg:h-24">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link to="/">
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/0aa0d0b8b67264875fdf6d340f16e9e702eb3d4d?width=263"
                  alt="Goba Store Logo"
                  className="h-8 sm:h-10 lg:h-12 w-auto"
                />
              </Link>
            </div>

            {/* Desktop Search and Language */}
            <div className="hidden lg:flex items-center gap-6 xl:gap-8">
              {/* Search Bar */}
              <form onSubmit={handleSearch} className="relative">
                <div className="flex items-center bg-white border border-gray-300 rounded-full px-4 xl:px-6 py-2 xl:py-3 w-64 xl:w-80">
                  <Search className="h-4 xl:h-5 w-4 xl:w-5 text-gray-400 mr-2 xl:mr-3" />
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
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
              </form>

              {/* Language Selector */}
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-1 hover:bg-gray-50 px-3 py-2 rounded-lg transition-colors">
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
                      onClick={() => setSelectedLanguage(lang.code)}
                      className="flex items-center gap-3 cursor-pointer"
                    >
                      <span className="text-lg">{lang.flag}</span>
                      <div className="flex flex-col">
                        <span className="font-medium">{lang.code}</span>
                        <span className="text-sm text-gray-500">
                          {lang.name}
                        </span>
                      </div>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Mobile Search Icon */}
            <div className="lg:hidden">
              <button className="p-2 text-gray-400 hover:text-gray-600">
                <Search className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation bar with orange background */}
      <div className="bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-18 lg:h-20">
            {/* Mobile Menu Button */}
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

            {/* Navigation Links */}
            <nav className="hidden lg:flex items-center gap-4 xl:gap-8">
              <Link
                to="/"
                className={`px-3 xl:px-4 py-2 rounded font-semibold transition-colors text-sm xl:text-base ${
                  location.pathname === "/"
                    ? "text-gray-900 bg-white"
                    : "text-white hover:text-gray-200"
                }`}
              >
                Home
              </Link>
              <Link
                to="/categories"
                className={`px-3 xl:px-4 py-2 rounded font-semibold transition-colors text-sm xl:text-base ${
                  location.pathname.startsWith("/categories")
                    ? "text-gray-900 bg-white"
                    : "text-white hover:text-gray-200"
                }`}
              >
                Categories
              </Link>
              <Link
                to="/about"
                className={`px-3 xl:px-4 py-2 rounded font-semibold transition-colors text-sm xl:text-base ${
                  location.pathname === "/about"
                    ? "text-gray-900 bg-white"
                    : "text-white hover:text-gray-200"
                }`}
              >
                About
              </Link>
              <Link
                to="/blog"
                className={`px-3 xl:px-4 py-2 rounded font-semibold transition-colors text-sm xl:text-base ${
                  location.pathname.startsWith("/blog")
                    ? "text-gray-900 bg-white"
                    : "text-white hover:text-gray-200"
                }`}
              >
                Blog
              </Link>
                            <Link
                to="/contact"
                className={`px-3 xl:px-4 py-2 rounded font-semibold transition-colors text-sm xl:text-base ${
                  location.pathname === "/contact"
                    ? "text-gray-900 bg-white"
                    : "text-white hover:text-gray-200"
                }`}
              >
                Contact us
              </Link>
              <Link
                to="/dashboard"
                className={`px-3 xl:px-4 py-2 rounded font-semibold transition-colors text-sm xl:text-base ${
                  location.pathname.startsWith("/dashboard")
                    ? "text-gray-900 bg-white"
                    : "text-white hover:text-gray-200"
                }`}
              >
                Dashboard
              </Link>
            </nav>

            {/* Right side actions */}
            <div className="flex items-center gap-3 sm:gap-4 lg:gap-6">
              {/* Help and Support - Hidden on small screens */}
              <div className="hidden md:flex items-center">
                <Link
                  to="/help"
                  className="px-2 lg:px-4 py-2 text-white hover:text-gray-200 font-semibold text-sm lg:text-base"
                >
                  Help
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
                  Support team
                </Link>
              </div>

              {/* Icons */}
              <div className="flex items-center gap-2 sm:gap-3 lg:gap-4">
                <Link to="/wishlist" className="relative">
                  <Heart className="h-6 sm:h-7 lg:h-8 w-6 sm:w-7 lg:w-8 text-white hover:text-gray-200 transition-colors" />
                </Link>

                <Link to="/cart" className="relative">
                  <ShoppingCart className="h-6 sm:h-7 lg:h-8 w-6 sm:w-7 lg:w-8 text-white hover:text-gray-200 transition-colors" />
                  {/* Cart badge */}
                  {cartItemCount > 0 && (
                    <div className="absolute -top-1 sm:-top-2 -right-1 sm:-right-2 bg-gray-900 text-white rounded-full w-5 sm:w-6 h-5 sm:h-6 flex items-center justify-center text-xs font-medium">
                      {cartItemCount > 99 ? "99+" : cartItemCount}
                    </div>
                  )}
                </Link>

                <Link to="/profile">
                  <User className="h-6 sm:h-7 lg:h-8 w-6 sm:w-7 lg:w-8 text-white hover:text-gray-200 transition-colors" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
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
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/0aa0d0b8b67264875fdf6d340f16e9e702eb3d4d?width=263"
                  alt="Goba Store Logo"
                  className="h-8 w-auto"
                />
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-gray-600 hover:text-gray-900"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              {/* Mobile Navigation */}
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
                  Home
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
                  Categories
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
                  About
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
                  Blog
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
                  Contact us
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
                  Help
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
                  Support
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
                  Dashboard
                </Link>
              </nav>

              {/* Mobile User Actions */}
              <div className="mt-8 pt-8 border-t space-y-4">
                <Link
                  to="/profile"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-3 py-3 px-4 text-gray-700 hover:text-primary hover:bg-gray-50 rounded transition-colors"
                >
                  <User className="h-5 w-5" />
                  <span>My Account</span>
                </Link>
                <Link
                  to="/wishlist"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-3 py-3 px-4 text-gray-700 hover:text-primary hover:bg-gray-50 rounded transition-colors"
                >
                  <Heart className="h-5 w-5" />
                  <span>Wishlist</span>
                </Link>
                <Link
                  to="/cart"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-3 py-3 px-4 text-gray-700 hover:text-primary hover:bg-gray-50 rounded transition-colors"
                >
                  <ShoppingCart className="h-5 w-5" />
                  <span>Cart ({cartItemCount})</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
