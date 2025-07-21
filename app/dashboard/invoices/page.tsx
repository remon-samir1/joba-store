"use client";

import { DashboardHeader } from "@/components/dashboard/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Search,
  Plus,
  Download,
  Eye,
  MoreHorizontal,
  Filter,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const invoices = [
  {
    id: "INV-001",
    customerId: "#6545",
    customerName: "John Doe",
    date: "01 Oct 11:29 am",
    dueDate: "15 Oct 2024",
    status: "paid",
    amount: "EGP 84.00",
    items: 3,
  },
  {
    id: "INV-002",
    customerId: "#5412",
    customerName: "Jane Smith",
    date: "01 Oct 11:29 am",
    dueDate: "20 Oct 2024",
    status: "unpaid",
    amount: "EGP 587.00",
    items: 5,
  },
  {
    id: "INV-003",
    customerId: "#8622",
    customerName: "Ahmed Hassan",
    date: "01 Oct 11:29 am",
    dueDate: "18 Oct 2024",
    status: "paid",
    amount: "EGP 156.00",
    items: 2,
  },
  {
    id: "INV-004",
    customerId: "#6462",
    customerName: "Sara Mohamed",
    date: "01 Oct 11:29 am",
    dueDate: "25 Oct 2024",
    status: "overdue",
    amount: "EGP 365.00",
    items: 4,
  },
  {
    id: "INV-005",
    customerId: "#7823",
    customerName: "Omar Ali",
    date: "01 Oct 11:29 am",
    dueDate: "30 Oct 2024",
    status: "pending",
    amount: "EGP 299.00",
    items: 3,
  },
];

const getStatusBadge = (status: string) => {
  const statusConfig = {
    paid: { bg: "bg-green-100", text: "text-green-700", label: "Paid" },
    unpaid: { bg: "bg-red-100", text: "text-red-700", label: "Unpaid" },
    pending: { bg: "bg-yellow-100", text: "text-yellow-700", label: "Pending" },
    overdue: { bg: "bg-red-100", text: "text-red-700", label: "Overdue" },
  };

  const config = statusConfig[status as keyof typeof statusConfig];
  return (
    <Badge className={`${config.bg} ${config.text} hover:${config.bg}`}>
      {config.label}
    </Badge>
  );
};

export default function InvoicesPage() {
  return (
    <div className="flex-1 overflow-auto">
      <DashboardHeader title="Invoices" />

      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">Invoices</h2>
          <Button className="bg-orange-500 hover:bg-orange-600 text-white">
            <Plus className="h-4 w-4 mr-2" />
            Create Invoice
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Total Invoices
                  </p>
                  <p className="text-2xl font-bold text-gray-900">1,247</p>
                </div>
                <div className="p-3 bg-blue-100 rounded-lg">
                  <div className="w-6 h-6 bg-blue-500 rounded"></div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Paid</p>
                  <p className="text-2xl font-bold text-green-600">892</p>
                </div>
                <div className="p-3 bg-green-100 rounded-lg">
                  <div className="w-6 h-6 bg-green-500 rounded"></div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Pending</p>
                  <p className="text-2xl font-bold text-yellow-600">245</p>
                </div>
                <div className="p-3 bg-yellow-100 rounded-lg">
                  <div className="w-6 h-6 bg-yellow-500 rounded"></div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Overdue</p>
                  <p className="text-2xl font-bold text-red-600">110</p>
                </div>
                <div className="p-3 bg-red-100 rounded-lg">
                  <div className="w-6 h-6 bg-red-500 rounded"></div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search invoices..."
                  className="pl-10 bg-gray-50 border-gray-200"
                />
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Invoices Table */}
        <Card>
          <CardHeader>
            <CardTitle>All Invoices</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Invoice ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead>Items</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {invoices.map((invoice) => (
                  <TableRow key={invoice.id}>
                    <TableCell className="font-medium">{invoice.id}</TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">
                          {invoice.customerName}
                        </div>
                        <div className="text-sm text-gray-500">
                          {invoice.customerId}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-gray-600">
                      {invoice.date}
                    </TableCell>
                    <TableCell className="text-gray-600">
                      {invoice.dueDate}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{invoice.items} items</Badge>
                    </TableCell>
                    <TableCell>{getStatusBadge(invoice.status)}</TableCell>
                    <TableCell className="font-medium text-orange-600">
                      {invoice.amount}
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Eye className="h-4 w-4 mr-2" />
                            View
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Download className="h-4 w-4 mr-2" />
                            Download PDF
                          </DropdownMenuItem>
                          <DropdownMenuItem>Send Reminder</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
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
