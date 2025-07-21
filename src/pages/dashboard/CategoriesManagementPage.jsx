"use client";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
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
  Search,
  ArrowLeft,
  ArrowRight,
  MoreHorizontal,
  Plus,
  Edit,
  Trash2,
} from "lucide-react";
import { Axios } from "../../../components/Helpers/Axios";

const ITEMS_PER_PAGE = 8;

export default function CategoriesManagementPage() {
  const [categories, setCategories] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectAll, setSelectAll] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState(new Set());

  useEffect(() => {
    Axios.get("/categories")
      .then((res) => {
      console.log(res);
        const data = Array.isArray(res.data?.data.data) ? res.data.data.data : [];
        setCategories(data);

        setFilteredCategories(data);
      })
      .catch((err) => {
        console.error("Failed to fetch categories", err);
        setCategories([]);
        setFilteredCategories([]);
      });
  }, []);
  

  useEffect(() => {
    const filtered = Array.isArray(categories)
      ? categories.filter((c) =>
          c.name?.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : [];
  
    setFilteredCategories(filtered);
    setCurrentPage(1);
  }, [searchQuery, categories]);
  

  const totalPages = Math.ceil(filteredCategories.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentCategories = Array.isArray(filteredCategories)
  ? filteredCategories.slice(startIndex, startIndex + ITEMS_PER_PAGE)
  : [];

  const handleSelectAll = (checked) => {
    setSelectAll(checked);
    setSelectedCategories(
      checked ? new Set(currentCategories.map((c) => c.id)) : new Set()
    );
  };

  const handleSelectCategory = (id, checked) => {
    const newSelected = new Set(selectedCategories);
    checked ? newSelected.add(id) : newSelected.delete(id);
    setSelectedCategories(newSelected);
  };

  const handleDeleteCategory = async (id) => {
    try {
      await Axios.delete(`/categories/${id}`);
      const updated = categories.filter((c) => c.id !== id);
      setCategories(updated);
    } catch (err) {
      console.error("Failed to delete", err);
    }
  };

  const handleBulkDelete = async () => {
    if (selectedCategories.size === 0) {
      alert("No categories selected");
      return;
    }
    const ids = Array.from(selectedCategories);
    for (let id of ids) {
      await handleDeleteCategory(id);
    }
    setSelectedCategories(new Set());
    setSelectAll(false);
  };

  return (
    <div className="flex-1 overflow-auto">
      <DashboardHeader title="Category List" />
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">Category List</h2>
          <Link to="/dashboard/categories/add">
            <Button className="bg-orange-500 hover:bg-orange-600 text-white">
              <Plus className="h-4 w-4 mr-2" /> Add Category
            </Button>
          </Link>
        </div>

        <Card className="shadow-lg">
          <CardContent className="p-0">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="relative w-64">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Search your category"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 bg-gray-50 border-gray-200"
                  />
                </div>
                <Button onClick={handleBulkDelete} className="bg-red-500 text-white border-red-500 hover:bg-red-600">
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete ({selectedCategories.size})
                </Button>
              </div>
            </div>

            <div className="bg-orange-100 px-6 py-4">
              <div className="grid grid-cols-12 gap-4 items-center">
                <div className="col-span-4 flex items-center space-x-3">
                  <Checkbox checked={selectAll} onCheckedChange={handleSelectAll} />
                  <span className="text-sm font-medium text-gray-900">Category name</span>
                </div>
                <div className="col-span-3">Description</div>
                <div className="col-span-3">Created Date</div>
                <div className="col-span-2">Action</div>
              </div>
            </div>

            <div className="divide-y divide-gray-200">
              {currentCategories.length === 0 ? (
                <div className="text-center py-10 text-gray-500">No categories found</div>
              ) : (
                currentCategories.map((category) => (
                  <div key={category.id} className="px-6 py-4 hover:bg-gray-50">
                  <div className="grid grid-cols-12 gap-4 items-center">
                    <div className="col-span-4 flex items-center space-x-3">
                      <Checkbox
                        checked={selectedCategories.has(category.id)}
                        onCheckedChange={(checked) =>
                          handleSelectCategory(category.id, checked)
                        }
                      />
                      <span className="text-sm font-medium text-gray-900">{category.name}</span>
                    </div>
                
                    <div className="col-span-3">
                      <span className="text-sm text-gray-600">
                        {category.description?.slice(0, 60)}
                      </span>
                    </div>
                
                    <div className="col-span-3">
                      <span className="text-sm text-gray-600">
                        {new Date(category.created_at).toLocaleDateString("en-GB", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                
                    <div className="col-span-2">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem asChild>
                            <Link to={`/dashboard/categories/edit/${category.id}`}>
                              <Edit className="h-4 w-4 mr-2" /> Edit
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-red-600"
                            onClick={() => handleDeleteCategory(category.id)}
                          >
                            <Trash2 className="h-4 w-4 mr-2" /> Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </div>
                
                ))
              )}
            </div>

            <div className="px-6 py-4 border-t border-gray-200 flex justify-between items-center">
              <Button
                variant="outline"
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
              >
                <ArrowLeft className="h-4 w-4 mr-1" /> Previous
              </Button>
              <span className="text-sm">Page {currentPage} of {totalPages}</span>
              <Button
                variant="outline"
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
              >
                Next <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
