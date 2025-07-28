import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Cookies from "cookie-universal";

import {
  TrendingUp,
  TrendingDown,
  MoreHorizontal,
  Plus,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "@/components/dashboard/charts";
import { useEffect, useState } from "react";
import { Axios } from "../../components/Helpers/Axios";
import { Link } from "react-router-dom";



const weeklyData = {
  customers: "52k",
  totalProducts: "3.5k",
  stockProducts: "2.5k",
  outOfStock: "0.5k",
  revenue: "250k",
};

const chartData = [
  { name: "Sun", value: 10 },
  { name: "Mon", value: 20 },
  { name: "Tue", value: 15 },
  { name: "Wed", value: 35 },
  { name: "Thu", value: 25 },
  { name: "Fri", value: 30 },
  { name: "Sat", value: 20 },
];

const usersChartData = [
  { time: "1", users: 15 },
  { time: "2", users: 25 },
  { time: "3", users: 20 },
  { time: "4", users: 30 },
  { time: "5", users: 35 },
  { time: "6", users: 20 },
  { time: "7", users: 25 },
  { time: "8", users: 40 },
];

const salesByCountry = [
  { country: "Egypt", flag: "🇪🇬", percentage: "30%", change: "+2.85%" },
  { country: "Saudi Arabia", flag: "🇸🇦", percentage: "30%", change: "+9.65%" },
  { country: "Lebanon", flag: "🇱🇧", percentage: "30%", change: "+7.84%" },
];

const topProducts = [
  {
    name: "Joint Pain",
    image: "/placeholder.svg",
    price: "EGP 35.40",
    code: "Item: #YZ-452",
  },
  {
    name: "Neck & Back",
    image: "/placeholder.svg",
    price: "EGP 35.40",
    code: "Item: #YZ-452",
  },
  {
    name: "Cough Relief",
    image: "/placeholder.svg",
    price: "EGP 35.40",
    code: "Item: #YZ-452",
  },
  {
    name: "Nasal Soothing",
    image: "/placeholder.svg",
    price: "EGP 35.40",
    code: "Item: #YZ-452",
  },
];

const invoices = [
  {
    id: "1",
    customerId: "#6545",
    date: "01 Oct 11:29 am",
    status: "Paid",
    amount: "EGP 84",
  },
  {
    id: "2",
    customerId: "#5412",
    date: "01 Oct 11:29 am",
    status: "Unpaid",
    amount: "EGP 587",
  },
  {
    id: "3",
    customerId: "#8622",
    date: "01 Oct 11:29 am",
    status: "Paid",
    amount: "EGP 156",
  },
  {
    id: "4",
    customerId: "#6462",
    date: "01 Oct 11:29 am",
    status: "Paid",
    amount: "EGP 365",
  },
  {
    id: "5",
    customerId: "#6462",
    date: "01 Oct 11:29 am",
    status: "Paid",
    amount: "EGP 365",
  },
];

const bestSellingProducts = [
  {
    name: "Joint Pain",
    orders: 266,
    status: "Stock",
    price: "EGP 999.00",
    image: "/placeholder.svg",
  },
  {
    name: "Joint Pain",
    orders: 56,
    status: "Stock out",
    price: "EGP 999.00",
    image: "/placeholder.svg",
  },
  {
    name: "Joint Pain",
    orders: 266,
    status: "Stock",
    price: "EGP 999.00",
    image: "/placeholder.svg",
  },
  {
    name: "Joint Pain",
    orders: 506,
    status: "Stock",
    price: "EGP 999.00",
    image: "/placeholder.svg",
  },
];

const newProducts = [
  {
    name: "Medical Mixtures",
    image: "/placeholder.svg",
  },
  {
    name: "Therapeutic Oils",
    image: "/placeholder.svg",
  },
  {
    name: "Creams & Ointments",
    image: "/placeholder.svg",
  },
];

const products = [
  {
    name: "Smart Watch",
    price: "EGP 39.99",
    image: "/placeholder.svg",
  },
  {
    name: "Leather Wallet",
    price: "EGP 19.99",
    image: "/placeholder.svg",
  },
  {
    name: "Watch SMM",
    price: "EGP 34.99",
    image: "/placeholder.svg",
  },
];

export default function Dashboard() {
  function formatDate(dateString) {
    const date = new Date(dateString);
  
    const day = String(date.getDate()).padStart(2, '0');
    const month = date.toLocaleString('en-US', { month: 'short' }); // Oct
    const hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, '0');
  
    const ampm = hours >= 12 ? 'pm' : 'am';
  
    const hour12 = hours % 12 || 12;
  
    return `${day} ${month} ${hour12}:${minutes} ${ampm}`;
  }
  
  
const [data , setData] = useState([])
const [productsData , setProductsData] = useState([])
const [categoriesData , setCategoriesData] = useState([])
  useEffect(()=>{
    Axios.get('/admin/dashboard').then(data => {
      setData(data.data.data)
      console.log(data)});
    Axios.get('/products').then(data => {
      setProductsData(data.data.data)
      console.log(data)});
    Axios.get('/categories').then(data => {
      setCategoriesData(data.data.data.data)
      console.log(data)});
  },[])
  const orderStats = [
    {
      title: "Total Orders",
      value: data?.order_stats?.last_7_days    ,
      change: data?.order_stats?.change_percent,
      trend: data?.order_stats?.change_percent < 0 ? 'up' : "down",
      period: "Last 7 days",
      previousValue: "Last 7days"+  data?.order_stats?.last_7_days ,
    },
    {
      title: "Total Orders",
      value:  data?.order_stats?.previous_7_days ,
      change: data?.order_stats?.change_percent,
      trend: data?.order_stats?.change_percent < 0 ? 'up' : "down",
      
      period: "Prevoius 7 days",
      previousValue: "Previous 7 days" +data?.order_stats?.previous_7_days 
    },
    {
      title: "Pending & Canceled",
      pending: data.order_stats?.pending    ,
      canceled:  data.order_stats?.cancelled  ,
      change: data?.order_stats?.change_percent,
      trend: data?.order_stats?.change_percent < 0 ? 'up' : "down",
  
    },
  ];
  return (
    <div className="flex-1 overflow-auto">
      <DashboardHeader title="Dashboard" />

      <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
        {/* Order Statistics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {orderStats.map((stat, index) => (
            <Card key={index} className="border border-gray-200">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  {stat.title}
                </CardTitle>
                <MoreHorizontal className="h-4 w-4 text-gray-400" />
              </CardHeader>
              <CardContent>
                {stat.pending && stat.canceled ? (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>Pending</span>
                      <span>Canceled</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-orange-500">
                        {stat.pending}
                      </span>
                      <span className="text-2xl font-bold">
                        {stat.canceled}
                      </span>
                    </div>
                    <div className="text-xs text-gray-500">{stat.period}</div>
                    <div className="flex items-center text-xs text-red-500">
                      <TrendingDown className="h-3 w-3 mr-1" />
                      {stat.change}
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <div className="text-2xl font-bold text-orange-500">
                      {stat.value}
                    </div>
                    <div className="text-xs text-gray-500">{stat.period}</div>
                    <div className="flex items-center text-xs text-green-500">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      {stat.change}
                    </div>
                    <div className="text-xs text-gray-500">
                      {stat.previousValue}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Charts and Analytics */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6">
          {/* Weekly Report */}
          <Card className="xl:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Report for this week</CardTitle>
              <div className="flex space-x-4 text-sm">
                <span className="text-orange-500 cursor-pointer">
                  This week
                </span>
                <span className="text-gray-500 cursor-pointer">Last week</span>
                <MoreHorizontal className="h-4 w-4 text-gray-400" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-4 mb-4 sm:mb-6">
                <div className="text-center">
                  <div className="text-xl font-bold">
                    {weeklyData.customers}
                  </div>
                  <div className="text-xs text-gray-500">Customers</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold">
                    {weeklyData.totalProducts}
                  </div>
                  <div className="text-xs text-gray-500">Total Products</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold">
                    {weeklyData.stockProducts}
                  </div>
                  <div className="text-xs text-gray-500">Stock Products</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold">
                    {weeklyData.outOfStock}
                  </div>
                  <div className="text-xs text-gray-500">Out of Stock</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold">{weeklyData.revenue}</div>
                  <div className="text-xs text-gray-500">Revenue</div>
                </div>
              </div>

              {/* Chart */}
              <div className="h-64">
                <div className="w-full h-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} />
                      <YAxis axisLine={false} tickLine={false} />
                      <Tooltip
                        content={({ active, payload, label }) => {
                          if (active && payload && payload.length) {
                            return (
                              <div className="bg-orange-500 text-white p-2 rounded shadow">
                                <p>{`Thursday: ${payload[0].value}k`}</p>
                              </div>
                            );
                          }
                          return null;
                        }}
                      />
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
              </div>
            </CardContent>
          </Card>

          {/* Users and Sales by Country */}
          <div className="space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Users in last 50 minutes</CardTitle>
                <MoreHorizontal className="h-4 w-4 text-gray-400" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">21.5K</div>
                <div className="text-sm text-gray-500 mb-4">
                  Users per minute
                </div>
                <div className="h-16">
                  <div className="w-full h-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={usersChartData}>
                        <Bar dataKey="users" fill="#F15A24" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Sales by Country</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {data?.sales_by_country?.map((country, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-6 h-6 rounded-full overflow-hidden flex items-center justify-center">
                        <span className="text-sm">{country.country.slice(0 ,2).toUpperCase()}</span>
                      </div>
                      <span className="text-sm font-medium">{country.change_percent}</span>
                      <span className="text-sm text-gray-500">
                        {country.country}
                      </span>
                    </div>
                    <span className="text-xs text-green-500 font-medium">
                      {country.sales}
                    </span>
                  </div>
                ))}
                <Button
                  variant="outline"
                  className="w-full mt-4 text-orange-500 border-orange-500 hover:bg-orange-50"
                >
                  View Insight
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
          {/* Invoices */}
          <Card>
            <CardHeader>
              <CardTitle>Invoices</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-xs font-medium text-gray-500">
                      No.
                    </TableHead>
                    <TableHead className="text-xs font-medium text-gray-500">
                      Id Customer
                    </TableHead>
                    <TableHead className="text-xs font-medium text-gray-500">
                      Order Date
                    </TableHead>
                    <TableHead className="text-xs font-medium text-gray-500">
                      Status
                    </TableHead>
                    <TableHead className="text-xs font-medium text-gray-500">
                      Amount
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data?.invoices?.map((invoice) => (
                    <TableRow key={invoice.id}>
                      <TableCell className="text-sm">{invoice.id}</TableCell>
                      <TableCell className="text-sm font-medium">
                        {invoice.user.id}
                      </TableCell>
                      <TableCell className="text-xs text-gray-500">
                        {formatDate(invoice.created_at)}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            invoice.status === "completed"
                              ? "default"
                              : "destructive"
                          }
                          className={
                            invoice.status === "completed"
                              ? "bg-green-100 text-green-700 hover:bg-green-100"
                              : "bg-red-100 text-red-700 hover:bg-red-100"
                          }
                        >
                          ● {invoice.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm font-medium">
                        {invoice.total}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Top Products */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Top Products</CardTitle>
              <Button variant="ghost" size="sm" className="text-orange-500">
                All products
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {data?.top_products?.map((product, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                    <img src={product.image} className="w-8 h-8 bg-orange-200 rounded"></img>
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium">{product.name.en}</div>
                    <div className="text-xs text-gray-500">{product.description.en}</div>
                  </div>
                  <div className="text-sm font-medium text-orange-500">
                    {product.price}
                  </div>
                </div>
              ))}
              <Button
                variant="ghost"
                size="sm"
                className="w-full text-orange-500"
              >
                Details
              </Button>
            </CardContent>
          </Card>

          {/* Add New Product */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Add New Product</CardTitle>
              <Link to='/dashboard/products/add' variant="ghost" size="sm" className="text-orange-500">
                <Plus className="h-4 w-4 mr-1" />
                Add New
              </Link>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="text-sm font-medium mb-3">Products</h4>
                {productsData?.map((product, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between py-2"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center">
                        <img src={product.images[0].path} className="w-6 h-6 bg-orange-200 rounded"></img>
                      </div>
                      <span className="text-sm">{product.name.en}</span>
                    </div>
                    <span className="text-gray-400">›</span>
                  </div>
                ))}
                <Link
                to='/dashboard/products'
                  variant="ghost"
                  size="sm"
                  className="w-full mt-2 text-orange-500"
                >
                  See more
                </Link>
              </div>

              <div>
                <h4 className="text-sm font-medium mb-3">Categories</h4>
                {categoriesData?.map((product, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between py-2"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center">
                        <img src={product.image} className="w-6 h-6 bg-orange-200 rounded"></img>
                      </div>
                      <div>
                        <div className="text-sm">{product.name}</div>
                        <div className="text-xs text-gray-500">
                          {product.price}
                        </div>
                      </div>
                    </div>
                    <Link
                    to='/dashboard/categories'
                      size="sm"
                      className="bg-orange-500 hover:bg-orange-600 text-white h-6 px-2 text-xs"
                    >
                      Add
                    </Link>
                  </div>
                ))}
                <Link
                    to='/dashboard/categories'

                  variant="ghost"
                  size="sm"
                  className="w-full mt-2 text-orange-500"
                >
                  See more
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Best Selling Products */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Best selling product</CardTitle>
            <Button variant="ghost" size="sm" className="text-orange-500">
              Details
            </Button>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-xs font-medium text-gray-500">
                    PRODUCT
                  </TableHead>
                  <TableHead className="text-xs font-medium text-gray-500">
                    TOTAL ORDER
                  </TableHead>
                  <TableHead className="text-xs font-medium text-gray-500">
                    STATUS
                  </TableHead>
                  <TableHead className="text-xs font-medium text-gray-500">
                    PRICE
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data?.best_selling_products?.map((product, index) => (
                  <TableRow key={index}>
                    <TableCell className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gray-100 rounded flex items-center justify-center">
                        <img src={product.images[0].path} className="w-8 h-8 bg-orange-200 rounded"></img>
                      </div>
                      <span className="font-medium">{product.name.en}</span>
                    </TableCell>
                    <TableCell className="font-medium">
                      {product.total_sold}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          product.status === "approved" ? "default" : "destructive"
                        }
                        className={
                          product.status === "approved"
                            ? "bg-green-100 text-green-700 hover:bg-green-100"
                            : "bg-red-100 text-red-700 hover:bg-red-100"
                        }
                      >
                        ● {product.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-orange-500 font-medium">
                      {product.price}
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
