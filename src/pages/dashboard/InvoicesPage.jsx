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
import { Axios } from "../../../components/Helpers/Axios";
import { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
// ... استيرادات أخرى

export default function InvoicesPage() {
  const [invoices, setInvoices] = useState([]);
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    status: "all",
    search: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Axios.get("/admin/invoices");
        setInvoices(response.data.data.data);
        console.log(response); 
        const total = response.data.data.data.length;
        const paid = response.data.data.data.filter(
          (inv) => inv.status === "Paid",
        ).length;
        const overdue = response.data.data.data.filter(
          (inv) => inv.status === "Overdue",
        ).length;

        // حساب المبالغ المستحقة
        const outstanding = response.data.data.data
          .filter((inv) => inv.status === "Pending" || inv.status === "Overdue")
          .reduce(
            (sum, inv) => sum + parseFloat(inv.amount.replace("EGP ", "")),
            0,
          );

        setStats([
          { title: "Total Invoices", value: total },
          { title: "Paid Invoices", value: paid },
          {
            title: "Outstanding Amount",
            value: `EGP ${outstanding.toFixed(2)}`,
          },
          { title: "Overdue Invoices", value: overdue },
        ]);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // تصفية الفواتير بناءً على البحث والحالة
  const filteredInvoices = useMemo(() => {
    return invoices?.filter((invoice) => {
      const matchesStatus =
        filters.status === "all" || invoice.status === filters.status;
  
      const orderId = invoice?.order_id?.toString().toLowerCase() || "";
      const customerId = invoice?.customer_id?.toString().toLowerCase() || "";
      const search = filters.search.toLowerCase();
  
      const matchesSearch =
        orderId.includes(search) || customerId.includes(search);
  
      return matchesStatus && matchesSearch;
    });
  }, [invoices, filters]);
  
  // معالجة تغيير الفلتر
  const handleFilterChange = (type, value) => {
    setFilters((prev) => ({ ...prev, [type]: value }));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        Loading invoices...
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-auto">
      <DashboardHeader title="Invoice Management" />

      <div className="p-6 space-y-6">
        {/* بطاقات الإحصائيات */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {stats?.map((stat, index) => (
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
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* جدول الفواتير */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Recent Invoices</CardTitle>
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Search invoices..."
                    className="pl-10 w-80"
                    value={filters.search}
                    onChange={(e) =>
                      handleFilterChange("search", e.target.value)
                    }
                  />
                </div>
                <Select
                  value={filters.status}
                  onValueChange={(value) => handleFilterChange("status", value)}
                >
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="Draft">Draft</SelectItem>
                    <SelectItem value="Pending">Pending</SelectItem>
                    <SelectItem value="Paid">Paid</SelectItem>
                    <SelectItem value="Overdue">Overdue</SelectItem>
                  </SelectContent>
                </Select>
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
                  {/* <TableHead>Due Date</TableHead> */}
                  <TableHead>Status</TableHead>
                  {/* <TableHead>Payment Method</TableHead> */}
                  <TableHead>Amount</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredInvoices?.map((invoice) => (
                  <TableRow key={invoice.id}>
                    <TableCell className="font-medium">{invoice.order_id}</TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{invoice.customer_id}</div>
                        <div className="text-sm text-gray-500">
                          {invoice.name}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm">
                      {invoice.date}
                    </TableCell>
                    {/* <TableCell className="text-sm">{invoice.dueDate}</TableCell> */}
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
              
                    <TableCell className="font-medium text-orange-600">
                      {invoice.total}
                    </TableCell>
                    <TableCell>
                      <Link to={`/dashboard/invoices/${invoice.order_id}`} className="flex items-center space-x-1">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {/* الترقيم الصفحي */}
            <div className="flex items-center justify-between mt-6">
              <p className="text-sm text-gray-700">
                Showing <span className="font-medium">1</span> to{" "}
                <span className="font-medium">{invoices.length}</span>{" "}
                of <span className="font-medium">{invoices.length}</span>{" "}
                results
              </p>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm">
                  Previous
                </Button>
                <Button variant="outline" size="sm">
                  1
                </Button>
                <Button variant="outline" size="sm">
                  2
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
