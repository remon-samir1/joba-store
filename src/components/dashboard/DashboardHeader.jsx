// import { Search, Bell, User } from "lucide-react";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";

// export function DashboardHeader({ title }) {
//   return (
//     <header className="bg-white border-b border-gray-200 px-4 sm:px-6 py-4">
//       <div className="flex items-center justify-between">
//         {/* Title - responsive sizing */}
//         <h1 className="text-xl sm:text-2xl font-semibold text-gray-900 truncate mr-4">
//           {title}
//         </h1>

//         <div className="flex items-center space-x-2 sm:space-x-4">
//           {/* Search - hidden on mobile */}
//           <div className="relative hidden lg:block">
//             <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
//             <Input
//               type="text"
//               placeholder="Search data, users, or reports"
//               className="pl-10 w-64 xl:w-80"
//             />
//           </div>

//           {/* Search button on mobile */}
//           <Button variant="ghost" size="icon" className="lg:hidden">
//             <Search className="h-5 w-5" />
//           </Button>

//           {/* Notifications */}
//           <Button variant="ghost" size="icon">
//             <Bell className="h-5 w-5" />
//             <span className="absolute top-2 right-2 h-2 w-2 bg-red-500 rounded-full"></span>
//           </Button>

//           {/* User Menu */}
//           <div className="flex items-center space-x-2">
//             <Button variant="ghost" size="icon" className="hidden sm:flex">
//               <User className="h-5 w-5" />
//             </Button>
//             <div className="h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center">
//               <span className="text-sm font-medium text-gray-700">U</span>
//             </div>
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// }
import { Search, Bell, User } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const mainNavigation = [
  { name: "Dashboard", href: "/dashboard" },
  { name: "Order Management", href: "/dashboard/orders" },
  { name: "Customers", href: "/dashboard/customers" },
  { name: "Coupon Code", href: "/dashboard/coupons" },
  { name: "Categories", href: "/dashboard/categories" },
  { name: "Invoices", href: "/dashboard/invoices" },
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
  const navigate = useNavigate();
  const searchRef = useRef(null);

  const getAllDashboardPages = () => {
    return [
      ...mainNavigation,
      ...productNavigation,
      ...adminNavigation
    ];
  };

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setSearchResults([]);
      return;
    }

    const filtered = getAllDashboardPages().filter(page =>
      page.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    setSearchResults(filtered);
    setIsResultsVisible(filtered.length > 0);
  }, [searchQuery]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsResultsVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleResultClick = (href) => {
    navigate(href);
    setSearchQuery("");
    setIsResultsVisible(false);
  };

  return (
    <header className="bg-white border-b border-gray-200 px-4 sm:px-6 py-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl sm:text-2xl font-semibold text-gray-900 truncate mr-4">
          {title}
        </h1>

        <div className="flex items-center space-x-2 sm:space-x-4">
          <div className="relative hidden lg:block" ref={searchRef}>
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Search data, users, or reports"
              className="pl-10 w-64 xl:w-80"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
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

          <Button variant="ghost" size="icon" className="lg:hidden">
            <Search className="h-5 w-5" />
          </Button>

          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
            <span className="absolute top-2 right-2 h-2 w-2 bg-red-500 rounded-full"></span>
          </Button>

          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon" className="hidden sm:flex">
              <User className="h-5 w-5" />
            </Button>
            <div className="h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center">
              <span className="text-sm font-medium text-gray-700">U</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
