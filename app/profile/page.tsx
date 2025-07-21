"use client";

import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  User,
  MapPin,
  Phone,
  Mail,
  ShoppingBag,
  Heart,
  CreditCard,
  Bell,
  Shield,
  Package,
} from "lucide-react";

export default function ProfilePage() {
  const [profileData, setProfileData] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    address: "123 Main St",
    city: "New York",
    state: "NY",
    zipCode: "10001",
    country: "United States",
  });

  const [notifications, setNotifications] = useState({
    emailMarketing: true,
    smsMarketing: false,
    orderUpdates: true,
    newProducts: true,
  });

  const handleProfileChange = (field: string, value: string) => {
    setProfileData((prev) => ({ ...prev, [field]: value }));
  };

  const handleNotificationChange = (field: string, value: boolean) => {
    setNotifications((prev) => ({ ...prev, [field]: value }));
  };

  const recentOrders = [
    {
      id: "ORD-001",
      date: "Dec 20, 2024",
      status: "Delivered",
      total: 425.99,
      items: 3,
    },
    {
      id: "ORD-002",
      date: "Dec 15, 2024",
      status: "Shipped",
      total: 189.5,
      items: 2,
    },
    {
      id: "ORD-003",
      date: "Dec 10, 2024",
      status: "Processing",
      total: 320.75,
      items: 1,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="py-16 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Page Header */}
          <div className="mb-12">
            <h1 className="text-4xl font-semibold text-gray-900">My Account</h1>
            <p className="text-gray-600 mt-2">
              Manage your account settings and preferences
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                    <User className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {profileData.firstName} {profileData.lastName}
                    </h3>
                    <p className="text-gray-600">{profileData.email}</p>
                  </div>
                </div>

                <nav className="space-y-2">
                  <a
                    href="#profile"
                    className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    <User className="h-5 w-5" />
                    <span>Profile Information</span>
                  </a>
                  <a
                    href="#orders"
                    className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    <Package className="h-5 w-5" />
                    <span>Order History</span>
                  </a>
                  <a
                    href="#wishlist"
                    className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    <Heart className="h-5 w-5" />
                    <span>Wishlist</span>
                  </a>
                  <a
                    href="#payment"
                    className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    <CreditCard className="h-5 w-5" />
                    <span>Payment Methods</span>
                  </a>
                  <a
                    href="#notifications"
                    className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    <Bell className="h-5 w-5" />
                    <span>Notifications</span>
                  </a>
                  <a
                    href="#security"
                    className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    <Shield className="h-5 w-5" />
                    <span>Security</span>
                  </a>
                </nav>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              <Tabs defaultValue="profile" className="space-y-8">
                <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6">
                  <TabsTrigger value="profile">Profile</TabsTrigger>
                  <TabsTrigger value="orders">Orders</TabsTrigger>
                  <TabsTrigger value="wishlist">Wishlist</TabsTrigger>
                  <TabsTrigger value="payment">Payment</TabsTrigger>
                  <TabsTrigger value="notifications">Notifications</TabsTrigger>
                  <TabsTrigger value="security">Security</TabsTrigger>
                </TabsList>

                {/* Profile Tab */}
                <TabsContent value="profile">
                  <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-8">
                      Profile Information
                    </h2>

                    <form className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label
                            htmlFor="firstName"
                            className="block text-sm font-medium text-gray-700 mb-2"
                          >
                            First Name
                          </label>
                          <Input
                            id="firstName"
                            value={profileData.firstName}
                            onChange={(e) =>
                              handleProfileChange("firstName", e.target.value)
                            }
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="lastName"
                            className="block text-sm font-medium text-gray-700 mb-2"
                          >
                            Last Name
                          </label>
                          <Input
                            id="lastName"
                            value={profileData.lastName}
                            onChange={(e) =>
                              handleProfileChange("lastName", e.target.value)
                            }
                          />
                        </div>
                      </div>

                      <div>
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium text-gray-700 mb-2"
                        >
                          Email Address
                        </label>
                        <Input
                          id="email"
                          type="email"
                          value={profileData.email}
                          onChange={(e) =>
                            handleProfileChange("email", e.target.value)
                          }
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="phone"
                          className="block text-sm font-medium text-gray-700 mb-2"
                        >
                          Phone Number
                        </label>
                        <Input
                          id="phone"
                          value={profileData.phone}
                          onChange={(e) =>
                            handleProfileChange("phone", e.target.value)
                          }
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="address"
                          className="block text-sm font-medium text-gray-700 mb-2"
                        >
                          Address
                        </label>
                        <Input
                          id="address"
                          value={profileData.address}
                          onChange={(e) =>
                            handleProfileChange("address", e.target.value)
                          }
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                          <label
                            htmlFor="city"
                            className="block text-sm font-medium text-gray-700 mb-2"
                          >
                            City
                          </label>
                          <Input
                            id="city"
                            value={profileData.city}
                            onChange={(e) =>
                              handleProfileChange("city", e.target.value)
                            }
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="state"
                            className="block text-sm font-medium text-gray-700 mb-2"
                          >
                            State
                          </label>
                          <Input
                            id="state"
                            value={profileData.state}
                            onChange={(e) =>
                              handleProfileChange("state", e.target.value)
                            }
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="zipCode"
                            className="block text-sm font-medium text-gray-700 mb-2"
                          >
                            ZIP Code
                          </label>
                          <Input
                            id="zipCode"
                            value={profileData.zipCode}
                            onChange={(e) =>
                              handleProfileChange("zipCode", e.target.value)
                            }
                          />
                        </div>
                      </div>

                      <div>
                        <Button className="bg-primary hover:bg-primary/90 text-white">
                          Save Changes
                        </Button>
                      </div>
                    </form>
                  </div>
                </TabsContent>

                {/* Orders Tab */}
                <TabsContent value="orders">
                  <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-8">
                      Order History
                    </h2>

                    <div className="space-y-4">
                      {recentOrders.map((order) => (
                        <div
                          key={order.id}
                          className="flex items-center justify-between p-6 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          <div className="flex items-center gap-6">
                            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                              <ShoppingBag className="h-6 w-6 text-primary" />
                            </div>
                            <div>
                              <h3 className="font-semibold text-gray-900">
                                Order {order.id}
                              </h3>
                              <p className="text-gray-600">{order.date}</p>
                              <p className="text-sm text-gray-500">
                                {order.items} item{order.items !== 1 ? "s" : ""}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-gray-900">
                              ${order.total}
                            </p>
                            <span
                              className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                                order.status === "Delivered"
                                  ? "bg-green-100 text-green-800"
                                  : order.status === "Shipped"
                                    ? "bg-blue-100 text-blue-800"
                                    : "bg-yellow-100 text-yellow-800"
                              }`}
                            >
                              {order.status}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                {/* Other tabs content would be implemented similarly */}
                <TabsContent value="wishlist">
                  <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-8">
                      Wishlist
                    </h2>
                    <p className="text-gray-600">
                      Your wishlist items will appear here. Add products to your
                      wishlist to save them for later.
                    </p>
                  </div>
                </TabsContent>

                <TabsContent value="payment">
                  <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-8">
                      Payment Methods
                    </h2>
                    <p className="text-gray-600">
                      Manage your saved payment methods and billing information.
                    </p>
                  </div>
                </TabsContent>

                <TabsContent value="notifications">
                  <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-8">
                      Notification Preferences
                    </h2>
                    <div className="space-y-6">
                      {Object.entries(notifications).map(([key, value]) => (
                        <div
                          key={key}
                          className="flex items-center justify-between"
                        >
                          <div>
                            <h3 className="font-medium text-gray-900">
                              {key
                                .replace(/([A-Z])/g, " $1")
                                .replace(/^./, (str) => str.toUpperCase())}
                            </h3>
                          </div>
                          <input
                            type="checkbox"
                            checked={value}
                            onChange={(e) =>
                              handleNotificationChange(key, e.target.checked)
                            }
                            className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="security">
                  <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-8">
                      Security Settings
                    </h2>
                    <p className="text-gray-600">
                      Manage your password and security preferences.
                    </p>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
