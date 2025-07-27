"use client";

import { DashboardHeader } from "../../components/dashboard/DashboardHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Checkbox } from "../../components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Search, Plus, MoreHorizontal, X, Filter } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "@/components/dashboard/charts";
import { Axios } from "../../../components/Helpers/Axios";
import { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import TransformDate from "../../../components/Helpers/TransformDate";

const chartData = [
  { name: "Jan", value: 10 },
  { name: "Feb", value: 15 },
  { name: "Mar", value: 20 },
  { name: "Apr", value: 25 },
  { name: "May", value: 30 },
  { name: "Jun", value: 20 },
  { name: "Jul", value: 25 },
  { name: "Aug", value: 35 },
  { name: "Sep", value: 30 },
  { name: "Oct", value: 25 },
  { name: "Nov", value: 30 },
  { name: "Dec", value: 40 },
];

const pieData = [
  { name: "Out of stock", value: 30, color: "#F15A24" },
  { name: "In stock", value: 70, color: "#2D3748" },
];

export default function CouponsPage() {
  const [stats, setStats] = useState({});
  const [coupons, setCoupons] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [academyFilter, setAcademyFilter] = useState("all");
  const [usageFilter, setUsageFilter] = useState("all");
  const [selectedCustomers, setSelectedCustomers] = useState([]);
  const [couponSearch, setCouponSearch] = useState("");
  const [couponStatusFilter, setCouponStatusFilter] = useState("all");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [page, setPage] = useState(1);
  useEffect(() => {
    Axios.get(`/admin/coupons?page=${page}`).then((data) => {
      console.log(data);
      setStats(data.data.data.stats);
      setCoupons(data.data.data.coupons.data);
    });
  }, [page]);

  // حساب العملاء المشتركين من جميع الكوبونات
  const allSubscribedCustomers = useMemo(() => {
    return coupons.flatMap((coupon) => {
      if (
        !coupon.subscribed_customers ||
        !Array.isArray(coupon.subscribed_customers)
      )
        return [];

      return coupon.subscribed_customers.map((customer) => ({
        ...customer,
        couponCode: coupon.code,
        couponDiscount: coupon.value,
        couponType: coupon.type,
        couponExpiry: coupon.expires_at,
        couponAcademyStatus: coupon.active_from_academy,
        couponId: coupon.id,
      }));
    });
  }, [coupons]);

  // تصفية العملاء المشتركين
  const filteredSubscribedCustomers = useMemo(() => {
    return allSubscribedCustomers.filter((customer) => {
      // البحث حسب البريد الإلكتروني أو كود الكوبون
      const matchesSearch =
        (customer.email &&
          customer.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (customer.couponCode &&
          customer.couponCode.toLowerCase().includes(searchTerm.toLowerCase()));

      // التصفية حسب حالة الأكاديمية
      const matchesAcademyFilter =
        academyFilter === "all" ||
        (academyFilter === "active" && customer.couponAcademyStatus == 1) ||
        (academyFilter === "unactive" && customer.couponAcademyStatus != 1);

      // التصفية حسب حالة الاستخدام
      const matchesUsageFilter =
        usageFilter === "all" ||
        (usageFilter === "used" && customer.orders?.length > 0) ||
        (usageFilter === "unused" &&
          (!customer.orders || customer.orders.length === 0));

      return matchesSearch && matchesAcademyFilter && matchesUsageFilter;
    });
  }, [allSubscribedCustomers, searchTerm, academyFilter, usageFilter]);

  // تصفية الكوبونات
  const filteredCoupons = useMemo(() => {
    return coupons.filter((coupon) => {
      // البحث حسب كود الكوبون
      const matchesSearch =
        couponSearch === "" ||
        (coupon.code &&
          coupon.code.toLowerCase().includes(couponSearch.toLowerCase()));

      // التصفية حسب حالة الكوبون
      const matchesStatusFilter =
        couponStatusFilter === "all" ||
        (couponStatusFilter === "active" && coupon.is_active) ||
        (couponStatusFilter === "inactive" && !coupon.is_active);

      return matchesSearch && matchesStatusFilter;
    });
  }, [coupons, couponSearch, couponStatusFilter]);

  // إحصائيات الكوبونات
  const couponStats = [
    {
      title: "Active coupons",
      value: stats?.active,
      icon: "📋",
      color: "bg-orange-100 text-orange-600",
    },
    {
      title: "Total redemptions",
      value: stats?.total_redemptions,
      icon: "🎁",
      color: "bg-green-100 text-green-600",
    },
    {
      title: "Revenue impact",
      value: stats?.revenue_impact,
      icon: "💰",
      color: "bg-purple-100 text-purple-600",
    },
  ];

  // معالجة تحديد/إلغاء تحديد جميع العملاء
  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedCustomers(filteredSubscribedCustomers.map((c) => c.id));
    } else {
      setSelectedCustomers([]);
    }
  };

  // معالجة تحديد/إلغاء تحديد عميل واحد
  const handleSelectCustomer = (id, checked) => {
    if (checked) {
      setSelectedCustomers([...selectedCustomers, id]);
    } else {
      setSelectedCustomers(
        selectedCustomers.filter((customerId) => customerId !== id),
      );
    }
  };

  // حذف العملاء المحددين
  const handleDeleteSelected = () => {
    // هنا سيتم تنفيذ عملية الحذف الفعلية
    alert(`Deleting ${selectedCustomers.length} customers...`);
    setSelectedCustomers([]);
  };

  // إعادة تعيين الفلاتر
  const resetFilters = () => {
    setCouponSearch("");
    setCouponStatusFilter("all");
    setIsFilterOpen(false);
  };

  return (
    <div className="flex-1 overflow-auto bg-gray-50">
      <DashboardHeader title="Coupon Code" />

      <div className="p-6 space-y-6">
        {/* Header with Create Button */}
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-800">Coupon</h2>
          <Link
            to="add"
            className="bg-orange-500 flex items-center text-white gap-2 px-5 py-2 rounded-lg hover:bg-orange-600 transition-colors shadow-md"
          >
            <Plus className="h-4 w-4 mr-2" />
            Create new coupon
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {couponStats.map((stat, index) => (
            <Card
              key={index}
              className="shadow-sm hover:shadow-md transition-shadow"
            >
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div
                    className={`w-12 h-12 rounded-lg flex items-center justify-center ${stat.color}`}
                  >
                    <span className="text-lg">{stat.icon}</span>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-800">
                      {stat.value || 0}
                    </div>
                    <div className="text-sm text-gray-500">{stat.title}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Redemptions Trends */}
          <Card className="border rounded-lg">
            <CardHeader>
              <CardTitle className="text-gray-800">
                Redemptions trends
              </CardTitle>
              <div className="flex space-x-4 text-sm">
                <span className="text-orange-500 cursor-pointer font-medium">
                  7 days
                </span>
                <span className="text-gray-500 cursor-pointer hover:text-gray-700">
                  30 days
                </span>
                <span className="text-gray-500 cursor-pointer hover:text-gray-700">
                  90 days
                </span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={stats?.redemptions_trends || chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="date" axisLine={false} tickLine={false} />
                    <YAxis axisLine={false} tickLine={false} />
                    <Line
                      type="monotone"
                      dataKey="redemption"
                      stroke="#F15A24"
                      strokeWidth={3}
                      dot={false}
                      activeDot={{ r: 6, fill: "#F15A24" }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Usage Chart */}
          <Card className="border rounded-lg">
            <CardHeader>
              <CardTitle className="text-gray-800">Usage</CardTitle>
              <div className="flex items-center space-x-4 text-xs text-gray-500">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-orange-500 rounded"></div>
                  <span>Unused</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-gray-700 rounded"></div>
                  <span>Used</span>
                </div>
                <span className="ml-auto">12.769</span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={stats?.usage_chart || pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={120}
                      paddingAngle={5}
                      dataKey="value"
                      label={({ name, percent }) =>
                        `${name}: ${(percent * 100).toFixed(0)}%`
                      }
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Coupons */}
        <Card className="border rounded-lg">
          <CardHeader>
            <div className="flex flex-wrap items-center justify-between gap-4">
              <CardTitle className="text-gray-800">Recent coupon</CardTitle>

              <div className="flex flex-wrap items-center gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Search coupons..."
                    className="pl-10 w-48 md:w-64"
                    value={couponSearch}
                    onChange={(e) => setCouponSearch(e.target.value)}
                  />
                  {couponSearch && (
                    <X
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 cursor-pointer"
                      onClick={() => setCouponSearch("")}
                    />
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    className="flex items-center gap-2 border-gray-300"
                    onClick={() => setIsFilterOpen(!isFilterOpen)}
                  >
                    <Filter className="h-4 w-4" />
                    Filters
                  </Button>

                  {(couponSearch || couponStatusFilter !== "all") && (
                    <Button
                      variant="ghost"
                      className="text-orange-600 hover:bg-orange-50"
                      onClick={resetFilters}
                    >
                      Clear filters
                      <X className="h-4 w-4 ml-1" />
                    </Button>
                  )}
                </div>
              </div>
            </div>

            {/* Filter Dropdown */}
            {isFilterOpen && (
              <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Status
                    </label>
                    <select
                      value={couponStatusFilter}
                      onChange={(e) => setCouponStatusFilter(e.target.value)}
                      className="w-full rounded-md border border-gray-300 bg-white py-2 px-3 focus:outline-none focus:ring-1 focus:ring-orange-500"
                    >
                      <option value="all">All Status</option>
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  </div>
                </div>
              </div>
            )}
          </CardHeader>

          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-xs font-medium text-gray-500">
                    Code
                  </TableHead>
                  <TableHead className="text-xs font-medium text-gray-500">
                    Discount
                  </TableHead>
                  <TableHead className="text-xs font-medium text-gray-500">
                    Usage
                  </TableHead>
                  <TableHead className="text-xs font-medium text-gray-500">
                    Expiry
                  </TableHead>
                  <TableHead className="text-xs font-medium text-gray-500">
                    Status
                  </TableHead>
                  <TableHead className="text-xs font-medium text-gray-500">
                    Active from academy
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCoupons.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8">
                      <div className="flex flex-col items-center justify-center">
                        <Search className="h-12 w-12 text-gray-400 mb-3" />
                        <h3 className="text-lg font-medium text-gray-900">
                          No coupons found
                        </h3>
                        <p className="text-gray-500 mt-1">
                          Try adjusting your search or filter to find what
                          you're looking for.
                        </p>
                        <Button
                          variant="ghost"
                          className="mt-3 text-orange-600 hover:bg-orange-50"
                          onClick={resetFilters}
                        >
                          Clear filters
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredCoupons.map((coupon, index) => (
                    <TableRow key={index} className="hover:bg-gray-50">
                      <TableCell className="font-medium">
                        <div className="flex items-center space-x-2">
                          <span className="text-blue-500 text-sm">📋</span>
                          <span className="font-medium">{coupon.code}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="font-medium">
                          {coupon.type === "percentage"
                            ? `${coupon.value}% OFF`
                            : `$${coupon.value} OFF`}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <div className="w-20 h-2 bg-gray-200 rounded-full">
                            <div
                              className={`h-full rounded-full ${
                                coupon.used / coupon.max_uses > 0.7
                                  ? "bg-green-500"
                                  : "bg-orange-500"
                              }`}
                              style={{
                                width: `${Math.min(
                                  100,
                                  (coupon.used / coupon.max_uses) * 100,
                                )}%`,
                              }}
                            />
                          </div>
                          <span className="text-sm text-gray-600">
                            {coupon.used}/{coupon.max_uses || "∞"}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm text-gray-600">
                        {TransformDate(coupon.expires_at)}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={coupon.is_active ? "default" : "destructive"}
                          className={
                            coupon.is_active
                              ? "bg-green-100 text-green-700 hover:bg-green-100"
                              : "bg-red-100 text-red-700 hover:bg-red-100"
                          }
                        >
                          {coupon.is_active ? "Active" : "Inactive"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            coupon.active_from_academy === 1
                              ? "default"
                              : "destructive"
                          }
                          className={
                            coupon.active_from_academy === 1
                              ? "bg-green-100 text-green-700 hover:bg-green-100"
                              : "bg-red-100 text-red-700 hover:bg-red-100"
                          }
                        >
                          {coupon.active_from_academy === 1
                            ? "Active"
                            : "Inactive"}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>

            {/* Pagination */}
            <div className="flex items-center justify-between mt-6">
              <Button
                onClick={() => setPage((prev) => prev !== 1 && prev - 1)}
                variant="outline"
                className="text-gray-600 border rounded-md px-4 py-2"
              >
                ← Previous
              </Button>

              <Button
                variant="outline"
                onClick={()=>setPage(prev =>prev + 1)}

                className="text-gray-600 border rounded-md px-4 py-2"
              >
                Next →
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Subscribed Customers */}
        <Card className="border rounded-lg">
          <CardHeader>
            <CardTitle className="text-gray-800">
              Subscribed customers
            </CardTitle>
            <div className="flex flex-wrap items-center gap-4">
              <div className="relative w-full md:w-80">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search by email or code..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                {searchTerm && (
                  <X
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 cursor-pointer"
                    onClick={() => setSearchTerm("")}
                  />
                )}
              </div>

              <div className="flex flex-wrap gap-3">
                {/* Academy Status Filter */}
                <div className="flex items-center space-x-2">
                  <label className="text-sm text-gray-600">
                    Academy Status:
                  </label>
                  <select
                    value={academyFilter}
                    onChange={(e) => setAcademyFilter(e.target.value)}
                    className="border rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500"
                  >
                    <option value="all">All</option>
                    <option value="active">Active</option>
                    <option value="unactive">Inactive</option>
                  </select>
                </div>

                {/* Usage Status Filter */}
                <div className="flex items-center space-x-2">
                  <label className="text-sm text-gray-600">Usage:</label>
                  <select
                    value={usageFilter}
                    onChange={(e) => setUsageFilter(e.target.value)}
                    className="border rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500"
                  >
                    <option value="all">All</option>
                    <option value="used">Used</option>
                    <option value="unused">Unused</option>
                  </select>
                </div>

                {/* Actions */}
                <div className="flex items-center space-x-3 ml-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="select-all"
                      checked={
                        selectedCustomers.length ===
                          filteredSubscribedCustomers.length &&
                        filteredSubscribedCustomers.length > 0
                      }
                      onCheckedChange={handleSelectAll}
                    />
                    <label
                      htmlFor="select-all"
                      className="text-sm text-gray-600"
                    >
                      Select all
                    </label>
                  </div>

                  {/* <Button
                    variant="destructive"
                    size="sm"
                    className="bg-red-500 hover:bg-red-600 px-3 py-1.5"
                    disabled={selectedCustomers.length === 0}
                    onClick={handleDeleteSelected}
                  >
                    Delete ({selectedCustomers.length})
                  </Button> */}

                  {/* <Button
                    size="sm"
                    className="bg-orange-500 text-white hover:bg-orange-600 px-3 py-1.5"
                  >
                    Export mail
                  </Button> */}
                </div>
              </div>
            </div>
          </CardHeader>

          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-8">
                    <span className="sr-only">Select</span>
                  </TableHead>
                  <TableHead className="text-xs font-medium text-gray-500">
                    Code
                  </TableHead>
                  <TableHead className="text-xs font-medium text-gray-500">
                    Email
                  </TableHead>
                  <TableHead className="text-xs font-medium text-gray-500">
                    Discount
                  </TableHead>
                  <TableHead className="text-xs font-medium text-gray-500">
                    Used
                  </TableHead>
                  <TableHead className="text-xs font-medium text-gray-500">
                    Expiry
                  </TableHead>
                  <TableHead className="text-xs font-medium text-gray-500">
                    Active from academy
                  </TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {filteredSubscribedCustomers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8">
                      <div className="flex flex-col items-center justify-center">
                        <Search className="h-12 w-12 text-gray-400 mb-3" />
                        <h3 className="text-lg font-medium text-gray-900">
                          No customers found
                        </h3>
                        <p className="text-gray-500 mt-1">
                          No customers match your search or filter criteria.
                        </p>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredSubscribedCustomers.map((customer, index) => (
                    <TableRow key={index} className="hover:bg-gray-50">
                      <TableCell>
                        <Checkbox
                          checked={selectedCustomers.includes(customer.id)}
                          onCheckedChange={(checked) =>
                            handleSelectCustomer(customer.id, checked)
                          }
                        />
                      </TableCell>
                      <TableCell className="font-medium">
                        <div className="flex items-center space-x-2">
                          <span className="text-blue-500 text-sm">📋</span>
                          <span>{customer.couponCode}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm text-gray-800">
                        {customer.email || "N/A"}
                      </TableCell>
                      <TableCell>
                        <span className="font-medium">
                          {customer.couponType === "percentage"
                            ? `${customer.couponDiscount}% OFF`
                            : `$${customer.couponDiscount} OFF`}
                        </span>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            customer.orders?.length > 0
                              ? "default"
                              : "secondary"
                          }
                          className={
                            customer.orders?.length > 0
                              ? "bg-green-100 text-green-700 hover:bg-green-100"
                              : "bg-gray-100 text-gray-700 hover:bg-gray-100"
                          }
                        >
                          {customer.orders?.length > 0 ? "Yes" : "No"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm text-gray-600">
                        {TransformDate(customer.couponExpiry)}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            customer.couponAcademyStatus == 1
                              ? "default"
                              : "destructive"
                          }
                          className={
                            customer.couponAcademyStatus == 1
                              ? "bg-green-100 text-green-700 hover:bg-green-100"
                              : "bg-red-100 text-red-700 hover:bg-red-100"
                          }
                        >
                          {customer.couponAcademyStatus == 1
                            ? "Active"
                            : "Inactive"}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>

            {/* Pagination */}
            {/* <div className="flex items-center justify-between mt-6">
              <Button
                variant="outline"
                className="text-gray-600 border rounded-md px-4 py-2"
              >
                ← Previous
              </Button>
              <div className="flex space-x-1">
                <Button
                  size="sm"
                  className="bg-orange-500 text-white hover:bg-orange-600 w-8 h-8 rounded-md"
                >
                  1
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-8 h-8 rounded-md"
                >
                  2
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-8 h-8 rounded-md"
                >
                  3
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-8 h-8 rounded-md"
                >
                  4
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-8 h-8 rounded-md"
                >
                  5
                </Button>
                <span className="flex items-center px-2 text-gray-500">
                  ...
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-8 h-8 rounded-md"
                >
                  24
                </Button>
              </div>
              <Button
                variant="outline"
                className="text-gray-600 border rounded-md px-4 py-2"
              >
                Next →
              </Button>
            </div> */}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
