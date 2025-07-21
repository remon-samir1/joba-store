import { useEffect, useState } from "react";
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
const [suggestions , setSuggestions]= useState([])
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (searchQuery.trim()) {
        Axios.get(`/products?q=${searchQuery}`)
          .then((res) => {
            console.log(res.data.data);
            // setSuggestions(res.data.data)
          }
            )
          .catch((err) => console.error("Search error:", err));
      } else {
        setSuggestions([]);
      }
    }, 300); // تأخير لمنع كثرة الطلبات

    return () => clearTimeout(delayDebounce);
  }, [searchQuery]);
  console.log(searchQuery);
  console.log(suggestions);
  const languages = [
    { code: "EN", name: "English", flag: "\uD83C\uDDFA\uD83C\uDDF8" },
    { code: "ES", name: "Espa\u00f1ol", flag: "\uD83C\uDDEA\uD83C\uDDF8" },
    { code: "FR", name: "Fran\u00e7ais", flag: "\uD83C\uDDEB\uD83C\uDDF7" },
    { code: "DE", name: "Deutsch", flag: "\uD83C\uDDE9\uD83C\uDDEA" },
  ];

  const pathname = location.pathname;
  return (
    <header className="w-full">
      {/* Top bar with white background */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20 lg:h-24">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link href="/">
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
      <div className="flex items-center bg-white border border-gray-300 rounded-full px-4 py-2 w-80">
        <Search className="h-5 w-5 text-gray-400 mr-2" />
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
            className="ml-2 text-primary hover:text-primary/80"
          >
            <Search className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* 👇 قائمة الاقتراحات */}
      {searchQuery && suggestions?.length > 0 && (
        <div className="absolute top-full mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg z-50 max-h-96 overflow-y-auto">
          {suggestions?.map((product) => (
            <Link
              to={`/product/${product.id}`}
              key={product.id}
              onClick={() => setSearchQuery("")}
              className="flex items-start gap-3 p-3 hover:bg-gray-100 transition-colors"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-16 h-16 object-cover rounded"
              />
              <div>
                <p className="font-medium text-sm">{product.name}</p>
                <p className="text-xs text-gray-500 line-clamp-2">{product.description}</p>
                <p className="text-sm font-bold text-primary mt-1">${product.price}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
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
                href="/"
                className={`px-3 xl:px-4 py-2 rounded font-semibold transition-colors text-sm xl:text-base ${
                  pathname === "/"
                    ? "text-gray-900 bg-white"
                    : "text-white hover:text-gray-200"
                }`}
              >
                Home
              </Link>
              <Link
                href="/categories"
                className={`px-3 xl:px-4 py-2 rounded font-semibold transition-colors text-sm xl:text-base ${
                  pathname.startsWith("/categories")
                    ? "text-gray-900 bg-white"
                    : "text-white hover:text-gray-200"
                }`}
              >
                Categories
              </Link>
              <Link
                href="/about"
                className={`px-3 xl:px-4 py-2 rounded font-semibold transition-colors text-sm xl:text-base ${
                  pathname === "/about"
                    ? "text-gray-900 bg-white"
                    : "text-white hover:text-gray-200"
                }`}
              >
                About
              </Link>
              <Link
                href="/blog"
                className={`px-3 xl:px-4 py-2 rounded font-semibold transition-colors text-sm xl:text-base ${
                  pathname.startsWith("/blog")
                    ? "text-gray-900 bg-white"
                    : "text-white hover:text-gray-200"
                }`}
              >
                Blog
              </Link>
              <Link
                href="/contact"
                className={`px-3 xl:px-4 py-2 rounded font-semibold transition-colors text-sm xl:text-base ${
                  pathname === "/contact"
                    ? "text-gray-900 bg-white"
                    : "text-white hover:text-gray-200"
                }`}
              >
                Contact us
              </Link>
            </nav>

            {/* Right side actions */}
            <div className="flex items-center gap-3 sm:gap-4 lg:gap-6">
              {/* Help and Support - Hidden on small screens */}
              <div className="hidden md:flex items-center">
                <Link
                  href="/help"
                  className="px-2 lg:px-4 py-2 text-white hover:text-gray-200 font-semibold text-sm lg:text-base"
                >
                  Help
                </Link>
                <div className="w-px h-6 bg-white/30 mx-2"></div>
                <Link
                  href="/support"
                  className={`px-2 lg:px-4 py-2 rounded font-semibold transition-colors text-sm lg:text-base ${
                    pathname === "/support"
                      ? "text-gray-900 bg-white"
                      : "text-white hover:text-gray-200"
                  }`}
                >
                  Support team
                </Link>
              </div>

              {/* Icons */}
              <div className="flex items-center gap-2 sm:gap-3 lg:gap-4">
                <Link href="/wishlist" className="relative">
                  <Heart className="h-6 sm:h-7 lg:h-8 w-6 sm:w-7 lg:w-8 text-white hover:text-gray-200 transition-colors" />
                </Link>

                <Link href="/cart" className="relative">
                  <ShoppingCart className="h-6 sm:h-7 lg:h-8 w-6 sm:w-7 lg:w-8 text-white hover:text-gray-200 transition-colors" />
                  {/* Cart badge */}
                  {cartItemCount > 0 && (
                    <div className="absolute -top-1 sm:-top-2 -right-1 sm:-right-2 bg-gray-900 text-white rounded-full w-5 sm:w-6 h-5 sm:h-6 flex items-center justify-center text-xs font-medium">
                      {cartItemCount > 99 ? "99+" : cartItemCount}
                    </div>
                  )}
                </Link>

                <Link href="/profile">
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
                  href="/"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block py-3 px-4 rounded font-semibold transition-colors ${
                    pathname === "/"
                      ? "text-primary bg-primary/10"
                      : "text-gray-700 hover:text-primary hover:bg-gray-50"
                  }`}
                >
                  Home
                </Link>
                <Link
                  href="/categories"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block py-3 px-4 rounded font-semibold transition-colors ${
                    pathname.startsWith("/categories")
                      ? "text-primary bg-primary/10"
                      : "text-gray-700 hover:text-primary hover:bg-gray-50"
                  }`}
                >
                  Categories
                </Link>
                <Link
                  href="/about"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block py-3 px-4 rounded font-semibold transition-colors ${
                    pathname === "/about"
                      ? "text-primary bg-primary/10"
                      : "text-gray-700 hover:text-primary hover:bg-gray-50"
                  }`}
                >
                  About
                </Link>
                <Link
                  href="/blog"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block py-3 px-4 rounded font-semibold transition-colors ${
                    pathname.startsWith("/blog")
                      ? "text-primary bg-primary/10"
                      : "text-gray-700 hover:text-primary hover:bg-gray-50"
                  }`}
                >
                  Blog
                </Link>
                <Link
                  href="/contact"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block py-3 px-4 rounded font-semibold transition-colors ${
                    pathname === "/contact"
                      ? "text-primary bg-primary/10"
                      : "text-gray-700 hover:text-primary hover:bg-gray-50"
                  }`}
                >
                  Contact us
                </Link>
                <Link
                  href="/help"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block py-3 px-4 rounded font-semibold transition-colors ${
                    pathname === "/help"
                      ? "text-primary bg-primary/10"
                      : "text-gray-700 hover:text-primary hover:bg-gray-50"
                  }`}
                >
                  Help
                </Link>
                <Link
                  href="/support"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block py-3 px-4 rounded font-semibold transition-colors ${
                    pathname === "/support"
                      ? "text-primary bg-primary/10"
                      : "text-gray-700 hover:text-primary hover:bg-gray-50"
                  }`}
                >
                  Support
                </Link>
              </nav>

              {/* Mobile User Actions */}
              <div className="mt-8 pt-8 border-t space-y-4">
                <Link
                  href="/profile"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-3 py-3 px-4 text-gray-700 hover:text-primary hover:bg-gray-50 rounded transition-colors"
                >
                  <User className="h-5 w-5" />
                  <span>My Account</span>
                </Link>
                <Link
                  href="/wishlist"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-3 py-3 px-4 text-gray-700 hover:text-primary hover:bg-gray-50 rounded transition-colors"
                >
                  <Heart className="h-5 w-5" />
                  <span>Wishlist</span>
                </Link>
                <Link
                  href="/cart"
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

// import { useState } from "react";
// import {
//   Search,
//   Heart,
//   ShoppingCart,
//   User,
//   ChevronDown,
//   Globe,
//   Menu,
//   X,
// } from "lucide-react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { Link } from "react-router-dom";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";

// export function Header() {
//   const [searchQuery, setSearchQuery] = useState("");
//   const [suggestions, setSuggestions] = useState([]);
//   const navigate = useNavigate();

//   const handleSearch = (e) => {
//     e.preventDefault();
//     if (searchQuery.trim()) {
//       navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
//     }
//   };

//   useEffect(() => {
//     const delayDebounce = setTimeout(() => {
//       if (searchQuery.trim()) {
//         Axios.get(`/products?q=${searchQuery}`)
//           .then((res) => {
//             console.log(res.data.data);
//             setSuggestions(res.data.data)})
//           .catch((err) => console.error("Search error:", err));
//       } else {
//         setSuggestions([]);
//       }
//     }, 300); // تأخير لمنع كثرة الطلبات

//     return () => clearTimeout(delayDebounce);
//   }, [searchQuery]);
//   return (
//     <header className="w-full">
//       {/* Top bar with white background */}
//       <div className="bg-white border-b">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex items-center justify-between h-16 sm:h-20 lg:h-24">
//             {/* Logo */}
//             <div className="flex-shrink-0">
//               <Link href="/">
//                 <img
//                   src="https://cdn.builder.io/api/v1/image/assets/TEMP/0aa0d0b8b67264875fdf6d340f16e9e702eb3d4d?width=263"
//                   alt="Goba Store Logo"
//                   className="h-8 sm:h-10 lg:h-12 w-auto"
//                 />
//               </Link>
//             </div>

//             {/* Desktop Search and Language */}
//             <div className="hidden lg:flex items-center gap-6 xl:gap-8">
//               {/* Search Bar */}
//               <form onSubmit={handleSearch} className="relative">
//       <div className="flex items-center bg-white border border-gray-300 rounded-full px-4 py-2 w-80">
//         <Search className="h-5 w-5 text-gray-400 mr-2" />
//         <input
//           type="text"
//           placeholder="Search products..."
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//           className="bg-transparent border-none outline-none text-sm text-gray-600 flex-1"
//         />
//         {searchQuery && (
//           <button
//             type="submit"
//             className="ml-2 text-primary hover:text-primary/80"
//           >
//             <Search className="h-4 w-4" />
//           </button>
//         )}
//       </div>

//       {/* 👇 قائمة الاقتراحات */}
//       {searchQuery && suggestions.length > 0 && (
//         <div className="absolute top-full mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg z-50 max-h-96 overflow-y-auto">
//           {suggestions.map((product) => (
//             <Link
//               to={`/product/${product.id}`}
//               key={product.id}
//               onClick={() => setSearchQuery("")}
//               className="flex items-start gap-3 p-3 hover:bg-gray-100 transition-colors"
//             >
//               <img
//                 src={product.image}
//                 alt={product.name}
//                 className="w-16 h-16 object-cover rounded"
//               />
//               <div>
//                 <p className="font-medium text-sm">{product.name}</p>
//                 <p className="text-xs text-gray-500 line-clamp-2">{product.description}</p>
//                 <p className="text-sm font-bold text-primary mt-1">${product.price}</p>
//               </div>
//             </Link>
//           ))}
//         </div>
//       )}
//     </form>

//               {/* Language Selector */}
//               <DropdownMenu>
//                 <DropdownMenuTrigger className="flex items-center gap-1 hover:bg-gray-50 px-3 py-2 rounded-lg transition-colors">
//                   <span className="text-base xl:text-lg font-medium text-gray-900">
//                     {selectedLanguage}
//                   </span>
//                   <ChevronDown className="h-4 xl:h-5 w-4 xl:w-5 text-gray-900" />
//                   <Globe className="h-4 xl:h-5 w-4 xl:w-5 text-gray-900 ml-1" />
//                 </DropdownMenuTrigger>
//                 <DropdownMenuContent align="end" className="w-48">
//                   {languages.map((lang) => (
//                     <DropdownMenuItem
//                       key={lang.code}
//                       onClick={() => setSelectedLanguage(lang.code)}
//                       className="flex items-center gap-3 cursor-pointer"
//                     >
//                       <span className="text-lg">{lang.flag}</span>
//                       <div className="flex flex-col">
//                         <span className="font-medium">{lang.code}</span>
//                         <span className="text-sm text-gray-500">
//                           {lang.name}
//                         </span>
//                       </div>
//                     </DropdownMenuItem>
//                   ))}
//                 </DropdownMenuContent>
//               </DropdownMenu>
//             </div>

//             {/* Mobile Search Icon */}
//             <div className="lg:hidden">
//               <button className="p-2 text-gray-400 hover:text-gray-600">
//                 <Search className="h-5 w-5" />
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Navigation bar with orange background */}
//       <div className="bg-primary">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex items-center justify-between h-16 sm:h-18 lg:h-20">
//             {/* Mobile Menu Button */}
//             <button
//               onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//               className="lg:hidden text-white hover:text-gray-200 transition-colors"
//             >
//               {isMobileMenuOpen ? (
//                 <X className="h-6 w-6" />
//               ) : (
//                 <Menu className="h-6 w-6" />
//               )}
//             </button>

//             {/* Navigation Links */}
//             <nav className="hidden lg:flex items-center gap-4 xl:gap-8">
//               <Link
//                 href="/"
//                 className={`px-3 xl:px-4 py-2 rounded font-semibold transition-colors text-sm xl:text-base ${
//                   pathname === "/"
//                     ? "text-gray-900 bg-white"
//                     : "text-white hover:text-gray-200"
//                 }`}
//               >
//                 Home
//               </Link>
//               <Link
//                 href="/categories"
//                 className={`px-3 xl:px-4 py-2 rounded font-semibold transition-colors text-sm xl:text-base ${
//                   pathname.startsWith("/categories")
//                     ? "text-gray-900 bg-white"
//                     : "text-white hover:text-gray-200"
//                 }`}
//               >
//                 Categories
//               </Link>
//               <Link
//                 href="/about"
//                 className={`px-3 xl:px-4 py-2 rounded font-semibold transition-colors text-sm xl:text-base ${
//                   pathname === "/about"
//                     ? "text-gray-900 bg-white"
//                     : "text-white hover:text-gray-200"
//                 }`}
//               >
//                 About
//               </Link>
//               <Link
//                 href="/blog"
//                 className={`px-3 xl:px-4 py-2 rounded font-semibold transition-colors text-sm xl:text-base ${
//                   pathname.startsWith("/blog")
//                     ? "text-gray-900 bg-white"
//                     : "text-white hover:text-gray-200"
//                 }`}
//               >
//                 Blog
//               </Link>
//               <Link
//                 href="/contact"
//                 className={`px-3 xl:px-4 py-2 rounded font-semibold transition-colors text-sm xl:text-base ${
//                   pathname === "/contact"
//                     ? "text-gray-900 bg-white"
//                     : "text-white hover:text-gray-200"
//                 }`}
//               >
//                 Contact us
//               </Link>
//             </nav>

//             {/* Right side actions */}
//             <div className="flex items-center gap-3 sm:gap-4 lg:gap-6">
//               {/* Help and Support - Hidden on small screens */}
//               <div className="hidden md:flex items-center">
//                 <Link
//                   href="/help"
//                   className="px-2 lg:px-4 py-2 text-white hover:text-gray-200 font-semibold text-sm lg:text-base"
//                 >
//                   Help
//                 </Link>
//                 <div className="w-px h-6 bg-white/30 mx-2"></div>
//                 <Link
//                   href="/support"
//                   className={`px-2 lg:px-4 py-2 rounded font-semibold transition-colors text-sm lg:text-base ${
//                     pathname === "/support"
//                       ? "text-gray-900 bg-white"
//                       : "text-white hover:text-gray-200"
//                   }`}
//                 >
//                   Support team
//                 </Link>
//               </div>

//               {/* Icons */}
//               <div className="flex items-center gap-2 sm:gap-3 lg:gap-4">
//                 <Link href="/wishlist" className="relative">
//                   <Heart className="h-6 sm:h-7 lg:h-8 w-6 sm:w-7 lg:w-8 text-white hover:text-gray-200 transition-colors" />
//                 </Link>

//                 <Link href="/cart" className="relative">
//                   <ShoppingCart className="h-6 sm:h-7 lg:h-8 w-6 sm:w-7 lg:w-8 text-white hover:text-gray-200 transition-colors" />
//                   {/* Cart badge */}
//                   {cartItemCount > 0 && (
//                     <div className="absolute -top-1 sm:-top-2 -right-1 sm:-right-2 bg-gray-900 text-white rounded-full w-5 sm:w-6 h-5 sm:h-6 flex items-center justify-center text-xs font-medium">
//                       {cartItemCount > 99 ? "99+" : cartItemCount}
//                     </div>
//                   )}
//                 </Link>

//                 <Link href="/profile">
//                   <User className="h-6 sm:h-7 lg:h-8 w-6 sm:w-7 lg:w-8 text-white hover:text-gray-200 transition-colors" />
//                 </Link>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Mobile Menu Overlay */}
//       {isMobileMenuOpen && (
//         <div
//           className="lg:hidden fixed inset-0 z-50 bg-black/50"
//           onClick={() => setIsMobileMenuOpen(false)}
//         >
//           <div
//             className="bg-white w-72 sm:w-80 h-full"
//             onClick={(e) => e.stopPropagation()}
//           >
//             <div className="p-6">
//               <div className="flex items-center justify-between mb-8">
//                 <img
//                   src="https://cdn.builder.io/api/v1/image/assets/TEMP/0aa0d0b8b67264875fdf6d340f16e9e702eb3d4d?width=263"
//                   alt="Goba Store Logo"
//                   className="h-8 w-auto"
//                 />
//                 <button
//                   onClick={() => setIsMobileMenuOpen(false)}
//                   className="text-gray-600 hover:text-gray-900"
//                 >
//                   <X className="h-6 w-6" />
//                 </button>
//               </div>

//               {/* Mobile Navigation */}
//               <nav className="space-y-4">
//                 <Link
//                   href="/"
//                   onClick={() => setIsMobileMenuOpen(false)}
//                   className={`block py-3 px-4 rounded font-semibold transition-colors ${
//                     pathname === "/"
//                       ? "text-primary bg-primary/10"
//                       : "text-gray-700 hover:text-primary hover:bg-gray-50"
//                   }`}
//                 >
//                   Home
//                 </Link>
//                 <Link
//                   href="/categories"
//                   onClick={() => setIsMobileMenuOpen(false)}
//                   className={`block py-3 px-4 rounded font-semibold transition-colors ${
//                     pathname.startsWith("/categories")
//                       ? "text-primary bg-primary/10"
//                       : "text-gray-700 hover:text-primary hover:bg-gray-50"
//                   }`}
//                 >
//                   Categories
//                 </Link>
//                 <Link
//                   href="/about"
//                   onClick={() => setIsMobileMenuOpen(false)}
//                   className={`block py-3 px-4 rounded font-semibold transition-colors ${
//                     pathname === "/about"
//                       ? "text-primary bg-primary/10"
//                       : "text-gray-700 hover:text-primary hover:bg-gray-50"
//                   }`}
//                 >
//                   About
//                 </Link>
//                 <Link
//                   href="/blog"
//                   onClick={() => setIsMobileMenuOpen(false)}
//                   className={`block py-3 px-4 rounded font-semibold transition-colors ${
//                     pathname.startsWith("/blog")
//                       ? "text-primary bg-primary/10"
//                       : "text-gray-700 hover:text-primary hover:bg-gray-50"
//                   }`}
//                 >
//                   Blog
//                 </Link>
//                 <Link
//                   href="/contact"
//                   onClick={() => setIsMobileMenuOpen(false)}
//                   className={`block py-3 px-4 rounded font-semibold transition-colors ${
//                     pathname === "/contact"
//                       ? "text-primary bg-primary/10"
//                       : "text-gray-700 hover:text-primary hover:bg-gray-50"
//                   }`}
//                 >
//                   Contact us
//                 </Link>
//                 <Link
//                   href="/help"
//                   onClick={() => setIsMobileMenuOpen(false)}
//                   className={`block py-3 px-4 rounded font-semibold transition-colors ${
//                     pathname === "/help"
//                       ? "text-primary bg-primary/10"
//                       : "text-gray-700 hover:text-primary hover:bg-gray-50"
//                   }`}
//                 >
//                   Help
//                 </Link>
//                 <Link
//                   href="/support"
//                   onClick={() => setIsMobileMenuOpen(false)}
//                   className={`block py-3 px-4 rounded font-semibold transition-colors ${
//                     pathname === "/support"
//                       ? "text-primary bg-primary/10"
//                       : "text-gray-700 hover:text-primary hover:bg-gray-50"
//                   }`}
//                 >
//                   Support
//                 </Link>
//               </nav>

//               {/* Mobile User Actions */}
//               <div className="mt-8 pt-8 border-t space-y-4">
//                 <Link
//                   href="/profile"
//                   onClick={() => setIsMobileMenuOpen(false)}
//                   className="flex items-center gap-3 py-3 px-4 text-gray-700 hover:text-primary hover:bg-gray-50 rounded transition-colors"
//                 >
//                   <User className="h-5 w-5" />
//                   <span>My Account</span>
//                 </Link>
//                 <Link
//                   href="/wishlist"
//                   onClick={() => setIsMobileMenuOpen(false)}
//                   className="flex items-center gap-3 py-3 px-4 text-gray-700 hover:text-primary hover:bg-gray-50 rounded transition-colors"
//                 >
//                   <Heart className="h-5 w-5" />
//                   <span>Wishlist</span>
//                 </Link>
//                 <Link
//                   href="/cart"
//                   onClick={() => setIsMobileMenuOpen(false)}
//                   className="flex items-center gap-3 py-3 px-4 text-gray-700 hover:text-primary hover:bg-gray-50 rounded transition-colors"
//                 >
//                   <ShoppingCart className="h-5 w-5" />
//                   <span>Cart ({cartItemCount})</span>
//                 </Link>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </header>
//   );
// }
