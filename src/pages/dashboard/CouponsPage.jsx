"use client";

import { DashboardHeader } from "../../components/dashboard/DashboardHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Checkbox } from "../../components/ui/checkbox";
// import { Progress } from "../../components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Search, Plus, MoreHorizontal } from "lucide-react";
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

const couponStats = [
  {
    title: "Active coupons",
    value: "256",
    icon: "📋",
    color: "bg-orange-100 text-orange-600",
  },
  {
    title: "Total redemptions",
    value: "256",
    icon: "🎁",
    color: "bg-green-100 text-green-600",
  },
  {
    title: "Revenue impact",
    value: "256",
    icon: "💰",
    color: "bg-purple-100 text-purple-600",
  },
];

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

const recentCoupons = [
  {
    code: "wg15456",
    discount: "25% OFF",
    usage: 60,
    total: 100,
    expiry: "Sep 13, 2025",
    status: "Active",
    academyStatus: "Active",
  },
  {
    code: "wg15456",
    discount: "25% OFF",
    usage: 60,
    total: 100,
    expiry: "Sep 13, 2025",
    status: "Expired",
    academyStatus: "Expired",
  },
];

const subscribedCustomers = [
  {
    code: "wg15456",
    email: "Margo.coldenber4@hotmail.com",
    discount: "20% OFF",
    used: "Yes",
    expiry: "Sep 13, 2025",
    academyStatus: "Active",
  },
  {
    code: "wg15456",
    email: "Margo.coldenber4@hotmail.com",
    discount: "25% OFF",
    used: "No",
    expiry: "Sep 13, 2025",
    academyStatus: "Expired",
  },
  {
    code: "wg15456",
    email: "Margo.coldenber4@hotmail.com",
    discount: "25% OFF",
    used: "No",
    expiry: "Sep 13, 2025",
    academyStatus: "Active",
  },
  {
    code: "wg15456",
    email: "Margo.coldenber4@hotmail.com",
    discount: "25% OFF",
    used: "No",
    expiry: "Sep 13, 2025",
    academyStatus: "Active",
  },
  {
    code: "wg15456",
    email: "Margo.coldenber4@hotmail.com",
    discount: "25% OFF",
    used: "No",
    expiry: "Sep 13, 2025",
    academyStatus: "Active",
  },
];

export default function CouponsPage() {
  return (
    <div className="flex-1 overflow-auto">
      <DashboardHeader title="Coupon Code" />

      <div className="p-6 space-y-6">
        {/* Header with Create Button */}
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Coupon</h2>
          <Button className="bg-orange-500 hover:bg-orange-600">
            <Plus className="h-4 w-4 mr-2" />
            Create new coupon
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {couponStats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div
                    className={`w-12 h-12 rounded-lg flex items-center justify-center ${stat.color}`}
                  >
                    <span className="text-lg">{stat.icon}</span>
                  </div>
                  <div>
                    <div className="text-2xl font-bold">{stat.value}</div>
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
          <Card>
            <CardHeader>
              <CardTitle>Redemptions trends</CardTitle>
              <div className="flex space-x-4 text-sm">
                <span className="text-orange-500 cursor-pointer">7 days</span>
                <span className="text-gray-500 cursor-pointer">30 days</span>
                <span className="text-gray-500 cursor-pointer">90 days</span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} />
                    <YAxis axisLine={false} tickLine={false} />
                    <Line
                      type="monotone"
                      dataKey="value"
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
          <Card>
            <CardHeader>
              <CardTitle>Usage</CardTitle>
              <div className="flex items-center space-x-4 text-xs text-gray-500">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-orange-500 rounded"></div>
                  <span>Out of stock</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-gray-700 rounded"></div>
                  <span>In stock</span>
                </div>
                <span className="ml-auto">12.769</span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={120}
                      paddingAngle={5}
                      dataKey="value"
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
        <Card>
          <CardHeader>
            <CardTitle>Recent coupon</CardTitle>
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Search data, users, or reports"
                className="pl-10"
              />
            </div>
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
                {recentCoupons.map((coupon, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">
                      <div className="flex items-center space-x-2">
                        <span className="text-blue-500 text-sm">📋</span>
                        <span>{coupon.code}</span>
                      </div>
                    </TableCell>
                    <TableCell>{coupon.discount}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        {/* <Progress
                          value={(coupon.usage / coupon.total) * 100}
                          className="w-20 h-2"
                        /> */}
                        <span className="text-sm text-gray-600">
                          {coupon.usage}/{coupon.total}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm">{coupon.expiry}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          coupon.status === "Active" ? "default" : "destructive"
                        }
                        className={
                          coupon.status === "Active"
                            ? "bg-green-100 text-green-700 hover:bg-green-100"
                            : "bg-red-100 text-red-700 hover:bg-red-100"
                        }
                      >
                        {coupon.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          coupon.academyStatus === "Active"
                            ? "default"
                            : "destructive"
                        }
                        className={
                          coupon.academyStatus === "Active"
                            ? "bg-green-100 text-green-700 hover:bg-green-100"
                            : "bg-red-100 text-red-700 hover:bg-red-100"
                        }
                      >
                        {coupon.academyStatus}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {/* Pagination */}
            <div className="flex items-center justify-between mt-6">
              <Button variant="outline" className="text-gray-600">
                ← Previous
              </Button>
              <div className="flex space-x-1">
                <Button
                  size="sm"
                  className="bg-orange-500 text-white hover:bg-orange-600 w-8 h-8"
                >
                  1
                </Button>
                <Button variant="outline" size="sm" className="w-8 h-8">
                  2
                </Button>
                <Button variant="outline" size="sm" className="w-8 h-8">
                  3
                </Button>
                <Button variant="outline" size="sm" className="w-8 h-8">
                  4
                </Button>
                <Button variant="outline" size="sm" className="w-8 h-8">
                  5
                </Button>
                <span className="flex items-center px-2">...</span>
                <Button variant="outline" size="sm" className="w-8 h-8">
                  24
                </Button>
              </div>
              <Button variant="outline" className="text-gray-600">
                Next →
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Subscribed Customers */}
        <Card>
          <CardHeader>
            <CardTitle>Subscribed customers</CardTitle>
            <div className="flex items-center space-x-4 flex-wrap gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search data, users, or reports"
                  className="pl-10 w-80"
                />
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="select-all" />
                <label htmlFor="select-all" className="text-sm">
                  Select all
                </label>
              </div>
              <Button
                variant="destructive"
                size="sm"
                className="bg-red-500 hover:bg-red-600"
              >
                Delete
              </Button>
              <Button
                size="sm"
                className="bg-orange-500 text-white hover:bg-orange-600"
              >
                Export mail
              </Button>
              <Button
                size="sm"
                className="bg-green-500 text-white hover:bg-green-600"
              >
                Import mail
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
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
                {subscribedCustomers.map((customer, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">
                      <div className="flex items-center space-x-2">
                        <span className="text-blue-500 text-sm">📋</span>
                        <span>{customer.code}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm">{customer.email}</TableCell>
                    <TableCell>{customer.discount}</TableCell>
                    <TableCell>{customer.used}</TableCell>
                    <TableCell className="text-sm">{customer.expiry}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          customer.academyStatus === "Active"
                            ? "default"
                            : "destructive"
                        }
                        className={
                          customer.academyStatus === "Active"
                            ? "bg-green-100 text-green-700 hover:bg-green-100"
                            : "bg-red-100 text-red-700 hover:bg-red-100"
                        }
                      >
                        {customer.academyStatus}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {/* Pagination */}
            <div className="flex items-center justify-between mt-6">
              <Button variant="outline" className="text-gray-600">
                ← Previous
              </Button>
              <div className="flex space-x-1">
                <Button
                  size="sm"
                  className="bg-orange-500 text-white hover:bg-orange-600 w-8 h-8"
                >
                  1
                </Button>
                <Button variant="outline" size="sm" className="w-8 h-8">
                  2
                </Button>
                <Button variant="outline" size="sm" className="w-8 h-8">
                  3
                </Button>
                <Button variant="outline" size="sm" className="w-8 h-8">
                  4
                </Button>
                <Button variant="outline" size="sm" className="w-8 h-8">
                  5
                </Button>
                <span className="flex items-center px-2">...</span>
                <Button variant="outline" size="sm" className="w-8 h-8">
                  24
                </Button>
              </div>
              <Button variant="outline" className="text-gray-600">
                Next →
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
