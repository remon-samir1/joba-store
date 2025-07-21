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
import { Search, Filter, Download, Eye, Plus, Calendar } from "lucide-react";
import { useEffect } from "react";
import { Axios } from "../../../components/Helpers/Axios";

const invoices = [
  {
    id: "#INV-001",
    customer: "John Doe",
    email: "john@example.com",
    issueDate: "01 Oct 2024",
    dueDate: "15 Oct 2024",
    status: "Paid",
    amount: "EGP 84.00",
    paymentMethod: "Credit Card",
  },
  {
    id: "#INV-002",
    customer: "Jane Smith",
    email: "jane@example.com",
    issueDate: "01 Oct 2024",
    dueDate: "16 Oct 2024",
    status: "Pending",
    amount: "EGP 120.00",
    paymentMethod: "Bank Transfer",
  },
  {
    id: "#INV-003",
    customer: "Mike Johnson",
    email: "mike@example.com",
    issueDate: "30 Sep 2024",
    dueDate: "14 Oct 2024",
    status: "Overdue",
    amount: "EGP 95.00",
    paymentMethod: "PayPal",
  },
  {
    id: "#INV-004",
    customer: "Sarah Wilson",
    email: "sarah@example.com",
    issueDate: "30 Sep 2024",
    dueDate: "13 Oct 2024",
    status: "Paid",
    amount: "EGP 75.00",
    paymentMethod: "Credit Card",
  },
  {
    id: "#INV-005",
    customer: "David Brown",
    email: "david@example.com",
    issueDate: "29 Sep 2024",
    dueDate: "12 Oct 2024",
    status: "Draft",
    amount: "EGP 150.00",
    paymentMethod: "Bank Transfer",
  },
];

const invoiceStats = [
  {
    title: "Total Invoices",
    value: "1,247",
    change: "+18.3%",
    period: "Last 30 days",
  },
  {
    title: "Paid Invoices",
    value: "892",
    change: "+12.5%",
    period: "Last 30 days",
  },
  {
    title: "Outstanding Amount",
    value: "EGP 24,500",
    change: "+8.7%",
    period: "Last 30 days",
  },
  {
    title: "Overdue Invoices",
    value: "23",
    change: "-15.2%",
    period: "Last 30 days",
  },
];

export default function InvoicesPage() {
  useEffect(()=>{
    Axios.get('/admin/invoices').then(data=>console.log(data))
  },[])
  return (
    <div className="flex-1 overflow-auto">
      <DashboardHeader title="Invoice Management" />

      <div className="p-6 space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {invoiceStats.map((stat, index) => (
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

        {/* Invoices Table */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Recent Invoices</CardTitle>
              <div className="flex items-center space-x-2">
                <Button className="bg-orange-500 hover:bg-orange-600 text-white">
                  <Plus className="h-4 w-4 mr-2" />
                  Create Invoice
                </Button>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Search invoices..."
                    className="pl-10 w-80"
                  />
                </div>
                <Select>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="paid">Paid</SelectItem>
                    <SelectItem value="overdue">Overdue</SelectItem>
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
                  <TableHead>Invoice ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Issue Date</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Payment Method</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {invoices.map((invoice) => (
                  <TableRow key={invoice.id}>
                    <TableCell className="font-medium">{invoice.id}</TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{invoice.customer}</div>
                        <div className="text-sm text-gray-500">
                          {invoice.email}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm">{invoice.issueDate}</TableCell>
                    <TableCell className="text-sm">{invoice.dueDate}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          invoice.status === "Paid"
                            ? "default"
                            : invoice.status === "Pending"
                              ? "secondary"
                              : invoice.status === "Draft"
                                ? "outline"
                                : "destructive"
                        }
                        className={
                          invoice.status === "Paid"
                            ? "bg-green-100 text-green-700"
                            : invoice.status === "Pending"
                              ? "bg-blue-100 text-blue-700"
                              : invoice.status === "Draft"
                                ? "bg-gray-100 text-gray-700"
                                : "bg-red-100 text-red-700"
                        }
                      >
                        {invoice.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm">
                      {invoice.paymentMethod}
                    </TableCell>
                    <TableCell className="font-medium text-orange-600">
                      {invoice.amount}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-1">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
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
                <span className="font-medium">1,247</span> results
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
