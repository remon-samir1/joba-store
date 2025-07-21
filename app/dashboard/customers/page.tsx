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
import { Search, Filter, Download, MoreHorizontal, Users } from "lucide-react";

const customers = [
  {
    id: "CUS-001",
    name: "John Doe",
    email: "john@example.com",
    phone: "+20 123 456 7890",
    location: "Cairo, Egypt",
    orders: 15,
    totalSpent: "EGP 1,250.00",
    status: "Active",
    joinDate: "01 Jan 2024",
  },
  {
    id: "CUS-002",
    name: "Jane Smith",
    email: "jane@example.com",
    phone: "+20 987 654 3210",
    location: "Alexandria, Egypt",
    orders: 23,
    totalSpent: "EGP 2,840.00",
    status: "Active",
    joinDate: "15 Feb 2024",
  },
  {
    id: "CUS-003",
    name: "Mike Johnson",
    email: "mike@example.com",
    phone: "+20 555 123 4567",
    location: "Giza, Egypt",
    orders: 8,
    totalSpent: "EGP 680.00",
    status: "Inactive",
    joinDate: "20 Mar 2024",
  },
  {
    id: "CUS-004",
    name: "Sarah Wilson",
    email: "sarah@example.com",
    phone: "+20 444 987 6543",
    location: "Luxor, Egypt",
    orders: 31,
    totalSpent: "EGP 3,920.00",
    status: "VIP",
    joinDate: "05 Apr 2024",
  },
  {
    id: "CUS-005",
    name: "David Brown",
    email: "david@example.com",
    phone: "+20 333 567 8901",
    location: "Aswan, Egypt",
    orders: 12,
    totalSpent: "EGP 1,560.00",
    status: "Active",
    joinDate: "10 May 2024",
  },
];

const customerStats = [
  {
    title: "Total Customers",
    value: "2,847",
    change: "+18.2%",
    period: "Last 30 days",
    icon: Users,
  },
  {
    title: "Active Customers",
    value: "2,234",
    change: "+12.5%",
    period: "Last 30 days",
    icon: Users,
  },
  {
    title: "New Customers",
    value: "189",
    change: "+24.8%",
    period: "Last 30 days",
    icon: Users,
  },
  {
    title: "VIP Customers",
    value: "98",
    change: "+8.1%",
    period: "Last 30 days",
    icon: Users,
  },
];

export default function CustomersPage() {
  return (
    <div className="flex-1 overflow-auto">
      <DashboardHeader title="Customers" />

      <div className="p-6 space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {customerStats.map((stat, index) => (
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
                  <div className="flex flex-col items-end">
                    <stat.icon className="h-8 w-8 text-orange-500 mb-2" />
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

        {/* Customers Table */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Customer List</CardTitle>
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Search customers..."
                    className="pl-10 w-80"
                  />
                </div>
                <Select>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                    <SelectItem value="vip">VIP</SelectItem>
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
                  <TableHead>Customer ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Orders</TableHead>
                  <TableHead>Total Spent</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Join Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {customers.map((customer) => (
                  <TableRow key={customer.id}>
                    <TableCell className="font-medium">{customer.id}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                          <span className="text-sm font-medium text-orange-600">
                            {customer.name.charAt(0)}
                          </span>
                        </div>
                        <span className="font-medium">{customer.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="text-sm">{customer.email}</div>
                        <div className="text-xs text-gray-500">
                          {customer.phone}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{customer.location}</TableCell>
                    <TableCell>
                      <span className="font-medium">{customer.orders}</span>
                    </TableCell>
                    <TableCell className="font-medium text-orange-600">
                      {customer.totalSpent}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          customer.status === "Active"
                            ? "default"
                            : customer.status === "VIP"
                              ? "secondary"
                              : "outline"
                        }
                        className={
                          customer.status === "Active"
                            ? "bg-green-100 text-green-700"
                            : customer.status === "VIP"
                              ? "bg-purple-100 text-purple-700"
                              : "bg-gray-100 text-gray-700"
                        }
                      >
                        {customer.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm">
                      {customer.joinDate}
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
                <span className="font-medium">2,847</span> results
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
