"use client";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { DashboardHeader } from "../..//components/dashboard/DashboardHeader";
import { Card, CardContent } from "../..//components/ui/card";
import { Button } from "../..//components/ui/button";
import { Input } from "../..//components/ui/input";
import { Badge } from "../..//components/ui/badge";
import { Checkbox } from "../..//components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../..//components/ui/dropdown-menu";
import {
  Search,
  Filter,
  ArrowUpDown,
  MoreHorizontal,
  Plus,
  Edit,
  Copy,
  Trash2,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";
import { Axios } from "../../../components/Helpers/Axios";
import { toast } from "react-toastify";

const ITEMS_PER_PAGE = 8;

const OrangeLoader = () => (
  <div className="fixed inset-0 z-50 bg-white bg-opacity-90 flex items-center justify-center">
    <div className="flex flex-col items-center">
      <div className="relative w-32 h-32 mb-8">
        <div className="absolute inset-0 rounded-full bg-orange-500 opacity-20 animate-ping-slow"></div>
        <div className="absolute inset-4 rounded-full border-8 border-orange-400 border-t-transparent animate-spin-slow"></div>
        <div className="absolute inset-8 rounded-full border-8 border-orange-300 border-b-transparent animate-spin-reverse"></div>
        <div className="absolute inset-12 rounded-full border-8 border-orange-200 border-l-transparent animate-ping"></div>
      </div>
      
      <div className="text-center">
        <h2 className="text-2xl font-bold text-orange-700 mb-2">Loading Products</h2>
        <p className="text-orange-600 max-w-md mb-6">
          Fetching your product data, please wait...
        </p>
        
        <div className="w-64 h-2 bg-orange-100 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-orange-400 to-orange-600 animate-progress"
          ></div>
        </div>
      </div>
    </div>
  </div>
);

export default function ProductListPage() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectAll, setSelectAll] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState(new Set());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    Axios.get("/products")
      .then((res) => {
        const data = res.data?.data || [];
        setProducts(data);
        setFilteredProducts(data);
      })
      .catch(error => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const filtered = products.filter((p) =>
      p.name?.en?.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredProducts(filtered);
    setCurrentPage(1);
  }, [searchQuery, products]);

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentProducts = filteredProducts.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const handleSelectAll = (checked) => {
    setSelectAll(checked);
    if (checked) {
      setSelectedProducts(new Set(currentProducts.map((p) => p.id)));
    } else {
      setSelectedProducts(new Set());
    }
  };

  const handleSelectProduct = (id, checked) => {
    const newSelected = new Set(selectedProducts);
    checked ? newSelected.add(id) : newSelected.delete(id);
    setSelectedProducts(newSelected);
  };

  const handleDeleteProduct = async (id) => {
    try {
      await Axios.delete(`admin/products/${id}`,{_method:'DELETE'});
      const updated = products.filter((p) => p.slug !== id);
      toast.success('Deleted Successfly')
      setProducts(updated);
    } catch (err) {
      console.error("Failed to delete", err);
    }
  };

  const handleBulkDelete = async () => {
    if (selectedProducts.size === 0) {
      alert("No products selected");
      return;
    }
    const ids = Array.from(selectedProducts);
    for (let id of ids) {
      await handleDeleteProduct(id);
    }
    setSelectedProducts(new Set());
    setSelectAll(false);
  };

  const getStockStatusColor = (stock) => {
    if (stock === 0) return "text-red-600 font-bold";
    if (stock < 50) return "text-yellow-600 font-bold";
    return "text-gray-600";
  };

  const getStatusBadge = (status) => {
    if (status === "approved") {
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
      {loading && <OrangeLoader />}
      
      <DashboardHeader title="Product List" />
      <div className="md:p-6 p-2 space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">Product List</h2>
          <Link to="/dashboard/products/add">
            <Button className="bg-orange-500 hover:bg-orange-600 text-white">
              <Plus className="h-4 w-4 mr-2" />
              Add Product
            </Button>
          </Link>
        </div>

        <Card className="shadow-lg md:w-full  w-[93vw] overflow-x-auto">
          <CardContent className="p-0">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="relative w-64">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Search your product"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 bg-gray-50 border-gray-200"
                  />
                </div>
                <div className="flex items-center space-x-3">
                  <Button onClick={handleBulkDelete} className="bg-red-500 text-white border-red-500 hover:bg-red-600">
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete ({selectedProducts.size})
                  </Button>
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <div className="min-w-[800px]">
                <div className="bg-orange-100 px-6 py-4">
                  <div className="grid grid-cols-12 gap-4 items-center">
                    <div className="col-span-4 flex items-center space-x-3">
                      <Checkbox checked={selectAll} onCheckedChange={handleSelectAll} />
                      <span className="text-sm font-medium text-gray-900">Product name</span>
                    </div>
                    <div className="col-span-2">Category</div>
                    <div className="col-span-1">Stock</div>
                    <div className="col-span-1">Price</div>
                    <div className="col-span-2">Status</div>
                    <div className="col-span-2">Action</div>
                  </div>
                </div>

                <div className="divide-y divide-gray-200">
                  {currentProducts.length === 0 ? (
                    <div className="text-center py-10 text-gray-500">No products found</div>
                  ) : (
                    currentProducts.map((product) => (
                      <div key={product.id} className="px-6 py-4 hover:bg-gray-50">
                        <div className="grid grid-cols-12 gap-4 items-center">
                          <div className="col-span-4 flex items-center space-x-3">
                            <Checkbox
                              checked={selectedProducts.has(product.id)}
                              onCheckedChange={(checked) => handleSelectProduct(product.id, checked)}
                            />
                            <div className="w-10 h-10 bg-gray-100 rounded">
                              <img src={product.images[0].path} className="w-full h-full object-cover rounded" />
                            </div>
                            <span className="text-sm font-medium text-gray-900">{product.name?.en}</span>
                          </div>
                          <div className="col-span-2">
                            <span className="text-sm text-gray-600">{product.category?.name}</span>
                          </div>
                          <div className="col-span-1">
                            <span className={`text-sm ${getStockStatusColor(product.stock)}`}>
                              {product.stock}
                            </span>
                          </div>
                          <div className="col-span-1">
                            <span className="text-sm text-gray-600">{product.price} EGP</span>
                          </div>
                          <div className="col-span-2">{getStatusBadge(product.status)}</div>
                          <div className="col-span-2">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem asChild>
                                  <Link to={`/dashboard/products/edit/${product.slug}`}>
                                    <Edit className="h-4 w-4 mr-2" />
                                    Edit
                                  </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  className="text-red-600"
                                  onClick={() => handleDeleteProduct(product.slug)}
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
              </div>
            </div>

            <div className="px-6 py-4 border-t border-gray-200 flex justify-between items-center">
              <Button
                variant="outline"
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
              >
                <ArrowLeft className="h-4 w-4 mr-1" />
                Previous
              </Button>
              <span className="text-sm">
                Page {currentPage} of {totalPages}
              </span>
              <Button
                variant="outline"
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
              >
                Next
                <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <style jsx>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes spin-reverse {
          from { transform: rotate(0deg); }
          to { transform: rotate(-360deg); }
        }
        
        @keyframes progress {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        @keyframes ping-slow {
          0% { transform: scale(0.9); opacity: 0.8; }
          100% { transform: scale(1.5); opacity: 0; }
        }
        
        .animate-spin-slow {
          animation: spin-slow 4s linear infinite;
        }
        
        .animate-spin-reverse {
          animation: spin-reverse 3s linear infinite;
        }
        
        .animate-progress {
          animation: progress 2s ease-in-out infinite alternate;
        }
        
        .animate-ping-slow {
          animation: ping-slow 1.5s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}