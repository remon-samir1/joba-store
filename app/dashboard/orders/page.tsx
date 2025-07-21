"use client";

import { DashboardHeader } from "@/components/dashboard/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Filter, Download, MoreHorizontal } from "lucide-react";

const orders = [
  {
    id: "#ORD-001",
    customer: "John Doe",
    email: "john@example.com",
    product: "Joint Pain Relief",
    date: "01 Oct 11:29 am",
    status: "Delivered",
    amount: "EGP 84.00",
    paymentStatus: "Paid",
  },
  {
    id: "#ORD-002",
    customer: "Jane Smith",
    email: "jane@example.com",
    product: "Neck & Back Care",
    date: "01 Oct 10:15 am",
    status: "Processing",
    amount: "EGP 120.00",
    paymentStatus: "Paid",
  },
  {
    id: "#ORD-003",
    customer: "Mike Johnson",
    email: "mike@example.com",
    product: "Cough Relief",
    date: "01 Oct 09:45 am",
    status: "Pending",
    amount: "EGP 95.00",
    paymentStatus: "Pending",
  },
  {
    id: "#ORD-004",
    customer: "Sarah Wilson",
    email: "sarah@example.com",
    product: "Nasal Soothing",
    date: "30 Sep 16:30 pm",
    status: "Shipped",
    amount: "EGP 75.00",
    paymentStatus: "Paid",
  },
  {
    id: "#ORD-005",
    customer: "David Brown",
    email: "david@example.com",
    product: "Therapeutic Oil",
    date: "30 Sep 14:20 pm",
    status: "Cancelled",
    amount: "EGP 150.00",
    paymentStatus: "Refunded",
  },
];

const orderStats = [
  {
    title: "Total Orders",
    value: "10.7K",
    change: "+14.5%",
    period: "Last 7 days",
  },
  {
    title: "Pending Orders",
    value: "509",
    change: "+8.2%",
    period: "Last 7 days",
  },
  {
    title: "Completed Orders",
    value: "9.8K",
    change: "+12.1%",
    period: "Last 7 days",
  },
  {
    title: "Cancelled Orders",
    value: "94",
    change: "-5.3%",
    period: "Last 7 days",
  },
];

export default function OrdersPage() {
  return (
    <div className="flex-1 overflow-auto">
      <DashboardHeader title="Order Management" />

      <div className="p-6 space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {orderStats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      {stat.title}
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      {stat.value}
                    </p>
                    <p className="text-xs text-gray-500">{stat.period}</p>
                  </div>
                  <div className="text-right">
                    <p
                      className={`text-sm font-medium ${
                        stat.change.startsWith("+")
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {stat.change}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Orders Table */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Recent Orders</CardTitle>
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Search orders..."
                    className="pl-10 w-80"
                  />
                </div>
                <Select>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="processing">Processing</SelectItem>
                    <SelectItem value="shipped">Shipped</SelectItem>
                    <SelectItem value="delivered">Delivered</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
                <Button variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Product</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Payment</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">{order.id}</TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{order.customer}</div>
                        <div className="text-sm text-gray-500">
                          {order.email}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{order.product}</TableCell>
                    <TableCell className="text-sm">{order.date}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          order.status === "Delivered"
                            ? "default"
                            : order.status === "Processing" ||
                                order.status === "Shipped"
                              ? "secondary"
                              : order.status === "Pending"
                                ? "outline"
                                : "destructive"
                        }
                        className={
                          order.status === "Delivered"
                            ? "bg-green-100 text-green-700"
                            : order.status === "Processing"
                              ? "bg-blue-100 text-blue-700"
                              : order.status === "Shipped"
                                ? "bg-purple-100 text-purple-700"
                                : order.status === "Pending"
                                  ? "bg-yellow-100 text-yellow-700"
                                  : "bg-red-100 text-red-700"
                        }
                      >
                        {order.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          order.paymentStatus === "Paid"
                            ? "default"
                            : order.paymentStatus === "Pending"
                              ? "outline"
                              : "secondary"
                        }
                        className={
                          order.paymentStatus === "Paid"
                            ? "bg-green-100 text-green-700"
                            : order.paymentStatus === "Pending"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-gray-100 text-gray-700"
                        }
                      >
                        {order.paymentStatus}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-medium text-orange-600">
                      {order.amount}
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {/* Pagination */}
            <div className="flex items-center justify-between mt-6">
              <p className="text-sm text-gray-700">
                Showing <span className="font-medium">1</span> to{" "}
                <span className="font-medium">10</span> of{" "}
                <span className="font-medium">97</span> results
              </p>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm">
                  Previous
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-orange-500 text-white"
                >
                  1
                </Button>
                <Button variant="outline" size="sm">
                  2
                </Button>
                <Button variant="outline" size="sm">
                  3
                </Button>
                <Button variant="outline" size="sm">
                  Next
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
