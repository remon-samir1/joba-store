"use client";

import { useEffect, useState } from "react";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
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
import { Axios } from "../../../components/Helpers/Axios";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [stats, setStats] = useState({
    total: { count: 0, change_percent: 0 },
    pending: { count: 0, change_percent: 0 },
    completed: { count: 0, change_percent: 0 },
    canceled: { count: 0, change_percent: 0 },
  });

  useEffect(() => {
    Axios.get("/admin/orders")
      .then((res) => {
        const { data } = res;
        setOrders(data.data.orders.data);
        setStats(data.data.stats);
      })
      .catch((err) => console.error("Error fetching orders:", err));
  }, []);

  useEffect(() => {
    let filtered = [...orders];

    if (searchTerm.trim()) {
      filtered = filtered.filter((order) =>
        order.customer?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.order_number?.toString().includes(searchTerm)
      );
    }

    if (selectedStatus !== "all") {
      filtered = filtered.filter((order) => order.status?.toLowerCase() === selectedStatus);
    }

    setFilteredOrders(filtered);
  }, [orders, searchTerm, selectedStatus]);

  const orderStats = [
    {
      title: "Total Orders",
      value: stats?.total?.count,
      change: `${stats?.total?.change_percent > 0 ? "+" : ""}${stats?.total?.change_percent}%`,
      period: "Last 7 days",
    },
    {
      title: "Pending Orders",
      value: stats?.pending?.count,
      change: `${stats?.pending?.change_percent > 0 ? "+" : ""}${stats?.pending?.change_percent}%`,
      period: "Last 7 days",
    },
    {
      title: "Completed Orders",
      value: stats?.completed?.count,
      change: `${stats?.completed?.change_percent > 0 ? "+" : ""}${stats?.completed?.change_percent}%`,
      period: "Last 7 days",
    },
    {
      title: "Cancelled Orders",
      value: stats?.canceled?.count,
      change: `${stats?.canceled?.change_percent > 0 ? "+" : ""}${stats?.canceled?.change_percent}%`,
      period: "Last 7 days",
    },
  ];

  function getStatusBadge(status) {
    switch (status.toLowerCase()) {
      case "delivered":
        return { variant: "default", className: "bg-green-100 text-green-700" };
      case "processing":
        return { variant: "secondary", className: "bg-blue-100 text-blue-700" };
      case "shipped":
        return { variant: "secondary", className: "bg-purple-100 text-purple-700" };
      case "pending":
        return { variant: "outline", className: "bg-yellow-100 text-yellow-700" };
      case "cancelled":
        return { variant: "destructive", className: "bg-red-100 text-red-700" };
      default:
        return { variant: "outline", className: "bg-gray-100 text-gray-700" };
    }
  }

  return (
    <div className="flex-1 overflow-auto">
      <DashboardHeader title="Order Management" />
      <div className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {orderStats?.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    <p className="text-xs text-gray-500">{stat.period}</p>
                  </div>
                  <p className={`text-sm font-medium ${stat.change.startsWith("+") ? "text-green-600" : "text-red-600"}`}>
                    {stat.change}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

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
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Select onValueChange={(value) => setSelectedStatus(value)} defaultValue="all">
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
                <Button variant="outline"><Filter className="h-4 w-4 mr-2" /> Filter</Button>
                <Button variant="outline"><Download className="h-4 w-4 mr-2" /> Export</Button>
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
                {filteredOrders?.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">#{order.order_number}</TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{order.customer?.name}</div>
                        <div className="text-sm text-gray-500">{order.customer?.email}</div>
                      </div>
                    </TableCell>
                    <TableCell>{order.items?.[0]?.product_name}</TableCell>
                    <TableCell>{new Date(order.created_at).toLocaleString("en-GB")}</TableCell>
                    <TableCell>
                      <Badge {...getStatusBadge(order.status)}>{order.status}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={order.payment_status === "paid" ? "default" : "outline"}
                        className={order.payment_status === "paid"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"}
                      >
                        {order.payment_status}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-medium text-orange-600">EGP {order.total}</TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}