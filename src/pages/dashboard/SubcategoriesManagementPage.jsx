"use client";
import { useEffect, useState, useCallback, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
  MoreHorizontal,
  Plus,
  Edit,
  Trash2,
  Filter,
  X,
} from "lucide-react";
import { Axios } from "../../../components/Helpers/Axios";
import { toast } from "react-toastify";
import Notifcation from "../../../components/Notification";
import StringSlice from "../../../components/Helpers/StringSlice";

const ITEMS_PER_PAGE = 10;

export default function SubcategoriesManagementPage() {
  const { parentId } = useParams();
  const [loading, setLoading] = useState(true);
  const [subcategories, setSubcategories] = useState([]);
  const [parentCategory, setParentCategory] = useState(null);
  const [filteredSubcategories, setFilteredSubcategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectAll, setSelectAll] = useState(false);
  const [selectedSubcategories, setSelectedSubcategories] = useState(new Set());
  const [sortField, setSortField] = useState("name");
  const [sortDirection, setSortDirection] = useState("asc");
  const [showFilters, setShowFilters] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(null);
  const [pagination, setPagination] = useState(null);
  const [page, setPage] = useState(1);
  const scrollRef = useRef();

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
          <h2 className="text-2xl font-bold text-orange-700 mb-2">
            Loading Subcategories
          </h2>
          <p className="text-orange-600 max-w-md mb-6">
            Fetching your subcategories data, please wait...
          </p>

          <div className="w-64 h-2 bg-orange-100 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-orange-400 to-orange-600 animate-progress"></div>
          </div>
        </div>
      </div>
    </div>
  );

  const fetchSubcategories = useCallback(async () => {
    setLoading(true);
    try {
      const res = await Axios.get("/categories");
      console.log(res.data);
      const allCategories = res.data?.data?.data || res.data?.data || [];
      const parent = allCategories.find(
        (c) => c.id == parentId,
      );

      if (parent) {
        setParentCategory(parent);
        const children = parent.children || [];
        setSubcategories(children);
        setFilteredSubcategories(children);
        setPagination({
          from: 1,
          to: children.length,
          total: children.length,
          next_page_url: null,
          prev_page_url: null,
        });
      } else {
        setSubcategories([]);
        setFilteredSubcategories([]);
        setPagination(null);
      }
    } catch (err) {
      console.error("Error fetching subcategories:", err);
      toast.error("Failed to load subcategories. Please try again later.");
      setSubcategories([]);
      setFilteredSubcategories([]);
    } finally {
      setLoading(false);
    }
  }, [parentId]);

  useEffect(() => {
    fetchSubcategories();
  }, [fetchSubcategories]);

  useEffect(() => {
    let filtered = [...subcategories];

    if (searchQuery) {
      filtered = filtered.filter(
        (c) =>
          c.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          c.slug?.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }

    filtered.sort((a, b) => {
      if (a[sortField] < b[sortField]) return sortDirection === "asc" ? -1 : 1;
      if (a[sortField] > b[sortField]) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });

    setFilteredSubcategories(filtered);
    setCurrentPage(1);
  }, [searchQuery, subcategories, sortField, sortDirection]);

  const handleSelectAll = (checked) => {
    setSelectAll(checked);
    setSelectedSubcategories(
      checked ? new Set(subcategories.map((c) => c.slug)) : new Set(),
    );
  };

  const handleSelectSubcategory = (id, checked) => {
    const newSelected = new Set(selectedSubcategories);
    checked ? newSelected.add(id) : newSelected.delete(id);
    setSelectedSubcategories(newSelected);
  };

  const handleDeleteSubcategory = async (id) => {
    setDeleteLoading(id);
    try {
      await Axios.delete(`/admin/categories/${id}`);
      toast.success("Subcategory deleted successfully");
      const updated = subcategories.filter((c) => c.slug !== id);
      setSubcategories(updated);
    } catch (err) {
      toast.error("Failed to delete subcategory. Please try again.");
    } finally {
      setDeleteLoading(null);
    }
  };

  const handleBulkDelete = async () => {
    if (selectedSubcategories.size === 0) return;
    const slugs = Array.from(selectedSubcategories);
    try {
      for (let slug of slugs) {
        await Axios.delete(`/admin/categories/${slug}`);
      }
      toast.success(`${slugs.length} subcategories deleted successfully`);
      const updated = subcategories.filter((c) => !slugs.includes(c.slug));
      setSubcategories(updated);
      setSelectedSubcategories(new Set());
      setSelectAll(false);
    } catch (err) {
      toast.error("Failed to delete subcategories. Please try again.");
    }
  };

  const toggleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const sortIndicator = (field) => {
    if (sortField !== field) return null;
    return sortDirection === "asc" ? "↑" : "↓";
  };

  return (
    <div className="flex-1 overflow-auto bg-gray-50">
      <Notifcation />
      {loading && <OrangeLoader />}
      <DashboardHeader
        title={`Subcategories: ${parentCategory?.name || parentId}`}
      />

      <div ref={scrollRef} className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/dashboard/categories">
              <Button variant="outline" size="icon">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                Manage Subcategories
              </h2>
              <p className="text-gray-600 mt-1">
                Parent Category:{" "}
                <span className="font-semibold text-orange-600">
                  {parentCategory?.name || parentId}
                </span>
              </p>
            </div>
          </div>
          <Link to={`/dashboard/categories/${parentId}/subcategories/add`}>
            <Button className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-lg">
              <Plus className="h-4 w-4 mr-2" /> Add New Subcategory
            </Button>
          </Link>
        </div>

        <Card className="shadow-lg border border-gray-200 rounded-xl overflow-hidden">
          <CardContent className="p-0 overflow-auto w-full">
            <div className="p-6 border-b border-gray-200 bg-white">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="relative w-full md:w-80">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Search subcategories..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 bg-gray-50 border-gray-200 rounded-lg"
                  />
                </div>

                <div className="flex gap-2 w-full md:w-auto">
                  <Button
                    variant="outline"
                    className="flex items-center gap-2"
                    onClick={() => setShowFilters(!showFilters)}
                  >
                    <Filter className="h-4 w-4" />
                    {showFilters ? "Hide Filters" : "Show Filters"}
                  </Button>

                  <Button
                    onClick={handleBulkDelete}
                    className="bg-red-500 hover:bg-red-600 text-white shadow-md"
                    disabled={selectedSubcategories.size === 0}
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete ({selectedSubcategories.size})
                  </Button>
                </div>
              </div>

              {showFilters && (
                <div className="mt-4 bg-orange-50 p-4 rounded-lg border border-orange-100">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-medium text-orange-800">
                      Sort Options
                    </h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setSortField("name");
                        setSortDirection("asc");
                      }}
                    >
                      Reset
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Button
                      variant={sortField === "name" ? "secondary" : "outline"}
                      onClick={() => toggleSort("name")}
                    >
                      Name {sortIndicator("name")}
                    </Button>
                    <Button
                      variant={
                        sortField === "created_at" ? "secondary" : "outline"
                      }
                      onClick={() => toggleSort("created_at")}
                    >
                      Date {sortIndicator("created_at")}
                    </Button>
                  </div>
                </div>
              )}
            </div>

            <div className="bg-gradient-to-r from-orange-500 to-orange-600 px-6 py-3">
              <div className="grid grid-cols-12 gap-4 items-center w-full">
                <div className="col-span-6 flex items-center space-x-3">
                  <Checkbox
                    checked={selectAll}
                    onCheckedChange={handleSelectAll}
                    className="border-white data-[state=checked]:bg-white data-[state=checked]:text-orange-500"
                  />
                  <span className="text-sm font-medium text-white">
                    Subcategory name
                  </span>
                </div>
                <div className="col-span-2">
                  <span className="text-sm font-medium text-white">Slug</span>
                </div>
                <div className="col-span-2">
                  <button
                    className="text-sm font-medium text-white flex items-center"
                    onClick={() => toggleSort("created_at")}
                  >
                    Created Date {sortIndicator("created_at")}
                  </button>
                </div>
                <div className="col-span-2">
                  <span className="text-sm font-medium text-white text-end block">
                    Action
                  </span>
                </div>
              </div>
            </div>

            <div className="divide-y divide-gray-200 bg-white">
              {filteredSubcategories.length === 0 ? (
                <div className="text-center py-16">
                  <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                    <X className="h-8 w-8 text-gray-400" />
                  </div>
                  <h3 className="mt-4 text-lg font-medium text-gray-900">
                    No subcategories found
                  </h3>
                  <Link
                    to={`/dashboard/categories/${parentId}/subcategories/add`}
                    className="mt-4 inline-block"
                  >
                    <Button className="bg-orange-500 hover:bg-orange-600 text-white">
                      <Plus className="h-4 w-4 mr-2" /> Add Subcategory
                    </Button>
                  </Link>
                </div>
              ) : (
                filteredSubcategories.map((subcategory) => (
                  <div
                    key={subcategory.id}
                    className="px-6 py-4 hover:bg-gray-50 transition-colors"
                  >
                    <div className="grid grid-cols-12 gap-4 items-center">
                      <div className="col-span-6 flex items-center space-x-3">
                        <Checkbox
                          checked={selectedSubcategories.has(subcategory.slug)}
                          onCheckedChange={(checked) =>
                            handleSelectSubcategory(subcategory.slug, checked)
                          }
                        />
                        <div className="flex items-center">
                          <div className="rounded-xl w-10 h-10 flex items-center justify-center mr-3 bg-gray-100 overflow-hidden">
                            <img
                              src={subcategory.image}
                              alt=""
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <span className="text-sm font-medium text-gray-900">
                            {subcategory.name}
                          </span>
                        </div>
                      </div>

                      <div className="col-span-2">
                        <span className="text-sm text-gray-600">
                          {StringSlice(subcategory.slug, 15)}
                        </span>
                      </div>

                      <div className="col-span-2">
                        <span className="text-sm text-gray-600">
                          {new Date(subcategory.created_at).toLocaleDateString(
                            "en-GB",
                          )}
                        </span>
                      </div>

                      <div className="col-span-2 flex justify-end gap-2">
                        <Link
                          to={`/dashboard/categories/${parentId}/subcategories/edit/${subcategory.slug}`}
                        >
                          <Button
                            variant="ghost"
                            size="sm"
                            className="hover:bg-gray-200"
                          >
                            <Edit className="h-4 w-4 text-gray-600" />
                          </Button>
                        </Link>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="hover:bg-red-100 text-red-600"
                          onClick={() =>
                            handleDeleteSubcategory(subcategory.slug)
                          }
                          disabled={deleteLoading === subcategory.slug}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {pagination && subcategories.length > 0 && (
              <div className="flex flex-col md:flex-row items-center justify-between p-6 gap-4 border-t border-gray-100">
                <p className="text-sm text-gray-700">
                  Showing{" "}
                  <span className="font-medium">{subcategories.length}</span> of{" "}
                  <span className="font-medium">{pagination.total}</span>{" "}
                  subcategories
                </p>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={!pagination.prev_page_url}
                  >
                    Previous
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setPage((p) => p + 1)}
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

      <style jsx>{`
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        @keyframes spin-reverse {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(-360deg);
          }
        }
        @keyframes progress {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        @keyframes ping-slow {
          0% {
            transform: scale(0.9);
            opacity: 0.8;
          }
          100% {
            transform: scale(1.5);
            opacity: 0;
          }
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
