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
import { useEffect, useState, useMemo } from "react";
import { Axios } from "../../../components/Helpers/Axios";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
// Helper functions
function handleExport(customersToExport) {
  if (!customersToExport.length) return;

  const data = customersToExport.map((customer) => ({
    "Customer ID": customer.id,
    Name: customer.name,
    Email: customer.email,
    Phone: customer.phone || "N/A",
    Status: customer.status,
    "Order Count": customer.order_count,
    "Total Spent": customer.total_spend,
    "Join Date": formatDate(customer.created_at),
  }));

  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Customers");

  const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
  const file = new Blob([excelBuffer], { type: "application/octet-stream" });
  saveAs(file, "customers.xlsx");
}

const formatDate = (dateString) => {
  if (!dateString) return "N/A";
  return new Date(dateString).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const DashboardHeader = ({ title }) => (
  <div className="p-6 border-b">
    <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
  </div>
);

export default function CustomersPage() {
  const [customers, setCustomers] = useState([]);
  const [stats, setStats] = useState(null);
  const [pagination, setPagination] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Search and filter states
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [locationFilter, setLocationFilter] = useState("all");

  // Fetch data
  useEffect(() => {
    setIsLoading(true);
    Axios.get("/admin/customers")
      .then((response) => {
        const { data } = response;
        setCustomers(data.data.customers.data);
        setStats(data.data.stats);
        setPagination({
          from: data.data.customers.from,
          to: data.data.customers.to,
          total: data.data.customers.total,
          next_page_url: data.data.customers.next_page_url,
          prev_page_url: data.data.customers.prev_page_url,
        });
        setError(null);
      })
      .catch((err) => {
        console.error("Failed to fetch customer data:", err);
        setError("Failed to load data. Please try again later.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  // Filter customers based on search and filters
  const filteredCustomers = useMemo(() => {
    return customers.filter((customer) => {
      const matchesSearch =
        customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (customer.phone && customer.phone.includes(searchTerm));

      const matchesStatus =
        statusFilter === "all" || customer.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [customers, searchTerm, statusFilter]);

  // Prepare stats data
  const customerStats = stats
    ? [
        {
          title: "Total Customers",
          value: stats.total.count,
          change: `${stats.total.change_percent}%`,
          icon: Users,
        },
        {
          title: "Active Customers",
          value: stats.customer_overview.active_customers,
          change: `${stats.customer_overview.conversion_rate}%`,
          icon: Users,
        },
        {
          title: "New Customers",
          value: stats.new.count,
          change: `${stats.new.change_percent}%`,
          icon: Users,
        },
        {
          title: "Shop Visitors",
          value: stats.customer_overview.shop_visitor,
          change: `${stats.customer_overview.repeat_customers}%`,
          icon: Users,
        },
      ]
    : [];

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <p>Loading customers...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

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
                  </div>
                  <div className="flex flex-col items-end">
                    <stat.icon className="h-8 w-8 text-orange-500 mb-2" />
                    <p
                      className={`text-sm font-medium ${
                        stat.change.startsWith("+") ||
                        parseFloat(stat.change) >= 0
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

        {/* Customers Table with Search & Filters */}
        <Card>
          <CardHeader>
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <CardTitle>Customer List</CardTitle>
              <div className="flex flex-col md:flex-row items-start md:items-center space-y-2 md:space-y-0 md:space-x-2 w-full md:w-auto">
                <div className="relative w-full md:w-80">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Search by name, email, or phone..."
                    className="pl-10 w-full"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

                <div className="flex flex-row space-x-2 w-full md:w-auto">
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-full md:w-40">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>

                  <Button
                    variant="outline"
                    onClick={() => handleExport(filteredCustomers)}
                  >
                    <Download className="h-4 w-4 mr-2" /> Export
                  </Button>
                </div>
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
                {filteredCustomers.length > 0 ? (
                  filteredCustomers.map((customer) => (
                    <TableRow key={customer.id}>
                      <TableCell className="font-medium">
                        {customer.id}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                            <span className="text-sm font-medium text-orange-600">
                              {customer.name.charAt(0).toUpperCase()}
                            </span>
                          </div>
                          <span className="font-medium">{customer.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="text-sm">{customer.email}</div>
                          <div className="text-xs text-gray-500">
                            {customer.phone || "N/A"}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{"N/A"}</TableCell>
                      <TableCell>
                        <span className="font-medium">
                          {customer.order_count}
                        </span>
                      </TableCell>
                      <TableCell className="font-medium text-orange-600">
                        {customer.total_spend}
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={
                            customer.status === "active"
                              ? "bg-green-100 text-green-700"
                              : "bg-gray-100 text-gray-700"
                          }
                        >
                          {customer.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm">
                        {formatDate(customer.created_at)}
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={9} className="text-center py-8">
                      <div className="flex flex-col items-center justify-center space-y-2">
                        <Users className="h-12 w-12 text-gray-400" />
                        <p className="text-gray-500">No customers found</p>
                        <p className="text-sm text-gray-400">
                          Try adjusting your search or filters
                        </p>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>

            {/* Pagination */}
            {pagination && filteredCustomers.length > 0 && (
              <div className="flex flex-col md:flex-row items-center justify-between mt-6 gap-4">
                <p className="text-sm text-gray-700">
                  Showing{" "}
                  <span className="font-medium">
                    {filteredCustomers.length}
                  </span>{" "}
                  of <span className="font-medium">{pagination.total}</span>{" "}
                  customers
                </p>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={!pagination.prev_page_url}
                  >
                    Previous
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={!pagination.next_page_url}
                  >
                    Next
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
