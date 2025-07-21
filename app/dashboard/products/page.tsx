"use client";

import { useState } from "react";
import { DashboardHeader } from "@/components/dashboard/header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
  Filter,
  ArrowUpDown,
  MoreHorizontal,
  Plus,
  Edit,
  Copy,
  Trash2,
  ChevronLeft,
  ChevronRight,
  ArrowLeft,
  ArrowRight,
  Loader2,
} from "lucide-react";
import Link from "next/link";
import { useProducts, useDeleteProduct } from "@/lib/hooks/use-api";
import { Product as ApiProduct } from "@/lib/api";
import { toast } from "sonner";

interface Product {
  id: string;
  name: string;
  category: string;
  stock: number;
  stockStatus: "in-stock" | "low-stock" | "out-of-stock";
  price: string;
  status: "published" | "draft";
  image: string;
  checked?: boolean;
}

const ITEMS_PER_PAGE = 8;

// Fallback mock data
const mockProducts: Product[] = [
  {
    id: "1",
    name: "Neck & Back Pain",
    category: "Lorem ipsum",
    stock: 124,
    stockStatus: "low-stock",
    price: "500 EGP",
    status: "published",
    image: "/placeholder.svg",
  },
  {
    id: "2",
    name: "Neck & Back Pain",
    category: "Lorem ipsum",
    stock: 124,
    stockStatus: "low-stock",
    price: "500 EGP",
    status: "published",
    image: "/placeholder.svg",
  },
  {
    id: "3",
    name: "Neck & Back Pain",
    category: "Lorem ipsum",
    stock: 124,
    stockStatus: "low-stock",
    price: "500 EGP",
    status: "published",
    image: "/placeholder.svg",
  },
  {
    id: "4",
    name: "Neck & Back Pain",
    category: "Lorem ipsum",
    stock: 124,
    stockStatus: "low-stock",
    price: "500 EGP",
    status: "published",
    image: "/placeholder.svg",
  },
  {
    id: "5",
    name: "Neck & Back Pain",
    category: "Lorem ipsum",
    stock: 124,
    stockStatus: "low-stock",
    price: "500 EGP",
    status: "published",
    image: "/placeholder.svg",
  },
  {
    id: "6",
    name: "Neck & Back Pain",
    category: "Lorem ipsum",
    stock: 124,
    stockStatus: "low-stock",
    price: "500 EGP",
    status: "published",
    image: "/placeholder.svg",
  },
  {
    id: "7",
    name: "Neck & Back Pain",
    category: "Lorem ipsum",
    stock: 124,
    stockStatus: "low-stock",
    price: "500 EGP",
    status: "published",
    image: "/placeholder.svg",
  },
  {
    id: "8",
    name: "Neck & Back Pain",
    category: "Lorem ipsum",
    stock: 124,
    stockStatus: "low-stock",
    price: "500 EGP",
    status: "published",
    image: "/placeholder.svg",
  },
];

export default function ProductListPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectAll, setSelectAll] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState<Set<string>>(
    new Set(),
  );

  // API hooks
  const {
    data: productsResponse,
    isLoading,
    error,
  } = useProducts({
    page: currentPage,
    limit: ITEMS_PER_PAGE,
    search: searchQuery || undefined,
  });

  const deleteProductMutation = useDeleteProduct();

  // Convert API product to local product format
  const transformApiProduct = (apiProduct: ApiProduct): Product => ({
    id: apiProduct.id,
    name: apiProduct.name,
    category: apiProduct.category?.name || "Uncategorized",
    stock: apiProduct.stock_quantity,
    stockStatus: apiProduct.stock_status,
    price: `${apiProduct.price} EGP`,
    status: apiProduct.status,
    image: apiProduct.images?.[0] || "/placeholder.svg",
    checked: selectedProducts.has(apiProduct.id),
  });

  // Transform products or use fallback
  const products = productsResponse?.data?.map(transformApiProduct) || [];
  const totalPages = productsResponse?.pagination?.total_pages || 1;
  const currentProducts = products;

  const handleSelectAll = (checked: boolean) => {
    setSelectAll(checked);
    if (checked) {
      setSelectedProducts(new Set(products.map((p) => p.id)));
    } else {
      setSelectedProducts(new Set());
    }
  };

  const handleSelectProduct = (id: string, checked: boolean) => {
    const newSelected = new Set(selectedProducts);
    if (checked) {
      newSelected.add(id);
    } else {
      newSelected.delete(id);
    }
    setSelectedProducts(newSelected);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1); // Reset to first page when searching
  };

  const handleDeleteProduct = async (id: string) => {
    try {
      await deleteProductMutation.mutateAsync(id);
      toast.success("Product deleted successfully");
    } catch (error) {
      toast.error("Failed to delete product");
    }
  };

  const handleBulkDelete = async () => {
    if (selectedProducts.size === 0) {
      toast.error("No products selected");
      return;
    }

    try {
      await Promise.all(
        Array.from(selectedProducts).map((id) =>
          deleteProductMutation.mutateAsync(id),
        ),
      );
      toast.success(`${selectedProducts.size} products deleted successfully`);
      setSelectedProducts(new Set());
      setSelectAll(false);
    } catch (error) {
      toast.error("Failed to delete products");
    }
  };

  const getStockStatusColor = (status: string, stock: number) => {
    if (status === "out-of-stock") return "text-red-600 font-bold";
    if (status === "low-stock" || stock < 50)
      return "text-yellow-600 font-bold";
    return "text-gray-600";
  };

  const getStatusBadge = (status: string) => {
    if (status === "published") {
      return (
        <Badge className="bg-green-100 text-green-700 hover:bg-green-100 border-green-200">
          Published
        </Badge>
      );
    }
    return (
      <Badge className="bg-gray-100 text-gray-700 hover:bg-gray-100 border-gray-200">
        Draft
      </Badge>
    );
  };

  return (
    <div className="flex-1 overflow-auto">
      <DashboardHeader title="Product List" />

      <div className="p-6 space-y-6">
        {/* Header with Add Product Button */}
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">Product List</h2>
          <Link href="/dashboard/products/add">
            <Button className="bg-orange-500 hover:bg-orange-600 text-white">
              <Plus className="h-4 w-4 mr-2" />
              Add Product
            </Button>
          </Link>
        </div>

        {/* Main Content Card */}
        <Card className="shadow-lg">
          <CardContent className="p-0">
            {/* Search and Actions Bar */}
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="relative w-64">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Search your product"
                    value={searchQuery}
                    onChange={(e) => handleSearch(e.target.value)}
                    className="pl-10 bg-gray-50 border-gray-200"
                  />
                </div>
                <div className="flex items-center space-x-3">
                  {/* Action Buttons */}
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-yellow-500 text-white border-yellow-500 hover:bg-yellow-600"
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-blue-500 text-white border-blue-500 hover:bg-blue-600"
                  >
                    <Copy className="h-4 w-4 mr-2" />
                    Repetition
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleBulkDelete}
                    disabled={
                      selectedProducts.size === 0 ||
                      deleteProductMutation.isPending
                    }
                    className="bg-red-500 text-white border-red-500 hover:bg-red-600 disabled:opacity-50"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete ({selectedProducts.size})
                  </Button>
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <ArrowUpDown className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Table Header */}
            <div className="bg-orange-100 px-6 py-4">
              <div className="grid grid-cols-12 gap-4 items-center">
                <div className="col-span-4 flex items-center space-x-3">
                  <Checkbox
                    checked={selectAll}
                    onCheckedChange={handleSelectAll}
                  />
                  <span className="text-sm font-medium text-gray-900">
                    Product name
                  </span>
                </div>
                <div className="col-span-2">
                  <span className="text-sm font-medium text-gray-900">
                    Category
                  </span>
                </div>
                <div className="col-span-1">
                  <span className="text-sm font-medium text-gray-900">
                    Stock
                  </span>
                </div>
                <div className="col-span-1">
                  <span className="text-sm font-medium text-gray-900">
                    Price
                  </span>
                </div>
                <div className="col-span-2 flex items-center space-x-1">
                  <span className="text-sm font-medium text-gray-900">
                    Status
                  </span>
                  <ChevronRight className="h-4 w-4 transform rotate-90" />
                </div>
                <div className="col-span-2">
                  <span className="text-sm font-medium text-gray-900">
                    Action
                  </span>
                </div>
              </div>
            </div>

            {/* Table Body */}
            <div className="divide-y divide-gray-200">
              {isLoading ? (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="h-8 w-8 animate-spin text-orange-500" />
                  <span className="ml-2 text-gray-600">
                    Loading products...
                  </span>
                </div>
              ) : error ? (
                <div className="flex items-center justify-center py-12">
                  <div className="text-center">
                    <p className="text-red-500 text-lg">
                      Failed to load products
                    </p>
                    <p className="text-gray-400 text-sm mt-1">
                      Please check your connection and try again
                    </p>
                  </div>
                </div>
              ) : currentProducts.length === 0 ? (
                <div className="flex items-center justify-center py-12">
                  <div className="text-center">
                    <p className="text-gray-500 text-lg">No products found</p>
                    <p className="text-gray-400 text-sm mt-1">
                      Try adjusting your search criteria
                    </p>
                  </div>
                </div>
              ) : (
                currentProducts.map((product) => (
                  <div key={product.id} className="px-6 py-4 hover:bg-gray-50">
                    <div className="grid grid-cols-12 gap-4 items-center">
                      {/* Product Name with Image */}
                      <div className="col-span-4 flex items-center space-x-3">
                        <Checkbox
                          checked={product.checked || false}
                          onCheckedChange={(checked) =>
                            handleSelectProduct(product.id, checked as boolean)
                          }
                        />
                        <div className="w-10 h-10 bg-gray-100 rounded flex items-center justify-center flex-shrink-0">
                          <div className="w-8 h-8 bg-orange-200 rounded"></div>
                        </div>
                        <span className="text-sm font-medium text-gray-900">
                          {product.name}
                        </span>
                      </div>

                      {/* Category */}
                      <div className="col-span-2">
                        <span className="text-sm text-gray-600">
                          {product.category}
                        </span>
                      </div>

                      {/* Stock */}
                      <div className="col-span-1">
                        <span
                          className={`text-sm ${getStockStatusColor(product.stockStatus, product.stock)}`}
                        >
                          {product.stock}
                          {product.stockStatus === "low-stock" && (
                            <span className="font-bold text-yellow-600">
                              {" "}
                              low stock
                            </span>
                          )}
                        </span>
                      </div>

                      {/* Price */}
                      <div className="col-span-1">
                        <span className="text-sm text-gray-600">
                          {product.price}
                        </span>
                      </div>

                      {/* Status */}
                      <div className="col-span-2">
                        {getStatusBadge(product.status)}
                      </div>

                      {/* Actions */}
                      <div className="col-span-2">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem asChild>
                              <Link
                                href={`/dashboard/products/edit/${product.id}`}
                              >
                                <Edit className="h-4 w-4 mr-2" />
                                Edit
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Copy className="h-4 w-4 mr-2" />
                              Duplicate
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="text-red-600"
                              onClick={() => handleDeleteProduct(product.id)}
                              disabled={deleteProductMutation.isPending}
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Pagination */}
            <div className="px-6 py-4 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <Button
                  variant="outline"
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1 || isLoading}
                  className="flex items-center space-x-2"
                >
                  <ArrowLeft className="h-4 w-4" />
                  <span>Previous</span>
                </Button>

                <div className="flex items-center space-x-2">
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    const page = i + 1;
                    return (
                      <Button
                        key={page}
                        variant={currentPage === page ? "default" : "outline"}
                        size="sm"
                        onClick={() => setCurrentPage(page)}
                        disabled={isLoading}
                        className={
                          currentPage === page
                            ? "bg-orange-500 hover:bg-orange-600"
                            : ""
                        }
                      >
                        {page}
                      </Button>
                    );
                  })}
                  {totalPages > 5 && (
                    <>
                      <span className="px-2">...</span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage(totalPages)}
                        disabled={isLoading}
                        className={
                          currentPage === totalPages
                            ? "bg-orange-500 hover:bg-orange-600 text-white"
                            : ""
                        }
                      >
                        {totalPages}
                      </Button>
                    </>
                  )}
                </div>

                <Button
                  variant="outline"
                  onClick={() =>
                    setCurrentPage(Math.min(totalPages, currentPage + 1))
                  }
                  disabled={currentPage === totalPages || isLoading}
                  className="flex items-center space-x-2"
                >
                  <span>Next</span>
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
