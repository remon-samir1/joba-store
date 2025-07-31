import { Search, Bell, User, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

const mainNavigation = [
  { name: "Dashboard", href: "/dashboard" },
  { name: "Order Management", href: "/dashboard/orders" },
  { name: "Customers", href: "/dashboard/customers" },
  { name: "Coupon Code", href: "/dashboard/coupons" },
  { name: "Categories", href: "/dashboard/categories" },
  { name: "Invoices", href: "/dashboard/invoices" },
  { name: "Contacts", href: "/dashboard/contacts" },
];

const productNavigation = [
  { name: "Product List", href: "/dashboard/products" },
  { name: "Add Products", href: "/dashboard/products/add" },
  { name: "Product Reviews", href: "/dashboard/reviews" },
];

const adminNavigation = [
  { name: "Setting", href: "/dashboard/settings" },
];

export function DashboardHeader({ title }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isResultsVisible, setIsResultsVisible] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const navigate = useNavigate();
  const desktopSearchRef = useRef(null);
  const mobileSearchRef = useRef(null);
  const [admin, setAdmin] = useState();
  
  useEffect(() => {
    const getData = async() => {
      try {
        Axios.get('admin/profile').then(data => {
          setAdmin(data.data.data);
          console.log(data);
        });
      } catch(err) {
        console.log(err);
      }
    };
    getData();
  }, []);

  const getAllDashboardPages = () => {
    return [...mainNavigation, ...productNavigation, ...adminNavigation];
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    
    if (query.trim() === "") {
      setSearchResults([]);
      setIsResultsVisible(false);
      return;
    }

    const filtered = getAllDashboardPages().filter(page =>
      page.name.toLowerCase().includes(query.toLowerCase())
    );

    setSearchResults(filtered);
    setIsResultsVisible(filtered.length > 0);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      const isOutsideDesktop = desktopSearchRef.current && 
                              !desktopSearchRef.current.contains(event.target);
      const isOutsideMobile = mobileSearchRef.current && 
                             !mobileSearchRef.current.contains(event.target);
      
      if (isOutsideDesktop && isOutsideMobile) {
        setIsResultsVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleResultClick = (href) => {
    navigate(href);
    setSearchQuery("");
    setIsResultsVisible(false);
    setIsMobileSearchOpen(false);
  };

  return (
    <header className="bg-white border-b border-gray-200 px-4 sm:px-6 py-4">
      {isMobileSearchOpen && (
        <div className="flex items-center lg:hidden mb-3">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setIsMobileSearchOpen(false)}
            className="mr-2"
          >
            <X className="h-5 w-5" />
          </Button>
          <div className="relative flex-grow" ref={mobileSearchRef}>
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Search data, users, or reports"
              className="pl-10 w-full"
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              onFocus={() => searchQuery && setIsResultsVisible(true)}
              autoFocus
            />

            {isResultsVisible && searchResults.length > 0 && (
              <div className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md border border-gray-200 max-h-60 overflow-y-auto">
                {searchResults.map((result) => (
                  <div
                    key={result.href}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleResultClick(result.href)}
                  >
                    <span className="text-sm">{result.name}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      <div className="flex items-center justify-between">
        <h1 className="text-xl sm:text-2xl font-semibold text-gray-900 truncate mr-4">
          {title}
        </h1>

        <div className="flex items-center space-x-2 sm:space-x-4">
          <div className="relative hidden lg:block" ref={desktopSearchRef}>
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Search data, users, or reports"
              className="pl-10 w-64 xl:w-80"
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              onFocus={() => searchQuery && setIsResultsVisible(true)}
            />

            {isResultsVisible && searchResults.length > 0 && (
              <div className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md border border-gray-200 max-h-60 overflow-y-auto">
                {searchResults.map((result) => (
                  <div
                    key={result.href}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleResultClick(result.href)}
                  >
                    <span className="text-sm">{result.name}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <Button 
            variant="ghost" 
            size="icon" 
            className="lg:hidden"
            onClick={() => setIsMobileSearchOpen(true)}
          >
            <Search className="h-5 w-5" />
          </Button>

          <div className="flex items-center space-x-2">
            <Link to='/dashboard/settings' variant="ghost" size="icon" className="hidden sm:flex">
              <User className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}