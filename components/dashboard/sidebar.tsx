"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useState } from "react";
import {
  Home,
  ShoppingCart,
  Users,
  Ticket,
  Grid3X3,
  Receipt,
  Megaphone,
  Package,
  Plus,
  Star,
  Settings,
  Store,
  LogOut,
  Menu,
  X,
} from "lucide-react";

// Main menu navigation

const mainNavigation = [
  { name: "Dashboard", href: "/dashboard", icon: Home },
  { name: "Order Management", href: "/dashboard/orders", icon: ShoppingCart },
  { name: "Customers", href: "/dashboard/customers", icon: Users },
  { name: "Coupon Code", href: "/dashboard/coupons", icon: Ticket },
  { name: "Categories", href: "/dashboard/categories", icon: Grid3X3 },
  { name: "Invoices", href: "/dashboard/invoices", icon: Receipt },
];

// Product section navigation
const productNavigation = [
  { name: "Product List", href: "/dashboard/products", icon: Package },
  { name: "Add Products", href: "/dashboard/products/add", icon: Plus },
  { name: "Product Reviews", href: "/dashboard/reviews", icon: Star },
];

// Admin section navigation
const adminNavigation = [
  { name: "Setting", href: "/dashboard/settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const renderNavItem = (item: any, isActive: boolean) => (
    <Link
      key={item.name}
      href={item.href}
      onClick={() => setIsMobileMenuOpen(false)}
      className={cn(
        "flex items-center gap-2 px-4 py-2.5 text-base font-medium rounded-md transition-colors",
        isActive
          ? "bg-[#F15A24] text-white"
          : "text-[#656565] hover:bg-gray-100 hover:text-gray-900",
      )}
    >
      <item.icon className="h-6 w-6 flex-shrink-0" />
      <span className="truncate">{item.name}</span>
    </Link>
  );

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setIsMobileMenuOpen(true)}
          className="bg-white p-2 rounded-md shadow-md border border-gray-200"
        >
          <Menu className="h-6 w-6 text-gray-700" />
        </button>
      </div>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-black/50"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={cn(
          "flex h-full flex-col bg-white shadow-[0px_3px_4px_0px_rgba(0,0,0,0.12)] transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:w-[260px]",
          "fixed inset-y-0 left-0 z-50 w-[260px]",
          isMobileMenuOpen
            ? "translate-x-0"
            : "-translate-x-full lg:translate-x-0",
        )}
      >
        {/* Mobile Close Button */}
        <div className="lg:hidden flex justify-end p-4">
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="p-2 text-gray-500 hover:text-gray-700"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Logo */}
        <div className="flex h-20 items-center px-5">
          <div className="flex items-center">
            <img
              src="/api/placeholder/103/40"
              alt="HubWMS Logo"
              className="h-10 w-[103px]"
            />
          </div>
        </div>

        {/* Navigation */}
        <div className="flex-1 px-0 py-0 overflow-y-auto">
          {/* Main menu section */}
          <div className="px-6 py-3">
            <p className="text-sm font-normal text-[#656565] mb-3">Main menu</p>
            <div className="px-3.5 space-y-2">
              {mainNavigation.map((item) => {
                const isActive = pathname === item.href;
                return renderNavItem(item, isActive);
              })}
            </div>
          </div>

          {/* Product section */}
          <div className="px-6 py-3">
            <p className="text-sm font-normal text-[#656565] mb-3">Product</p>
            <div className="px-3.5 space-y-2">
              {productNavigation.map((item) => {
                const isActive = pathname === item.href;
                return renderNavItem(item, isActive);
              })}
            </div>
          </div>

          {/* Admin section */}
          <div className="px-6 py-3">
            <p className="text-sm font-normal text-[#656565] mb-3">Admin</p>
            <div className="px-3.5 space-y-2">
              {adminNavigation.map((item) => {
                const isActive = pathname === item.href;
                return renderNavItem(item, isActive);
              })}
            </div>
          </div>
        </div>

        {/* User Profile Section */}
        <div className="px-5 py-3">
          <div className="flex items-center gap-4 p-3 rounded-lg bg-white">
            <div className="flex-shrink-0">
              <div className="h-10 w-10 rounded-full overflow-hidden">
                <img
                  src="/api/placeholder/40/40"
                  alt="Profile"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-[#1D1919] truncate">
                Dealport
              </p>
              <p className="text-sm text-[#656565] truncate">
                Mark@thedesigner...
              </p>
            </div>
            <LogOut className="h-5 w-5 text-[#656565]" />
          </div>
        </div>

        {/* Your Shop Section */}
        <div className="px-5 py-3">
          <Link
            href="/"
            onClick={() => setIsMobileMenuOpen(false)}
            className="flex items-center gap-2 p-3 rounded-lg bg-white shadow-[0px_1px_3px_0px_rgba(0,0,0,0.20)]"
          >
            <Store className="h-6 w-6 text-[#F15A24]" />
            <span className="flex-1 text-sm font-medium text-[#F15A24]">
              Your Shop
            </span>
            <svg
              className="h-4 w-4 text-[#656565]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 16 16"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M5.2 2.4h5.6A2.4 2.4 0 0 1 13.2 4.8v6.4a2.4 2.4 0 0 1-2.4 2.4H5.2A2.4 2.4 0 0 1 2.8 11.2V4.8A2.4 2.4 0 0 1 5.2 2.4M9.6 2.4v2.4M9.6 8.8 11.6 10.4M4.4 10.4 6.4 8.8"
              />
            </svg>
          </Link>
        </div>
      </div>
    </>
  );
}
