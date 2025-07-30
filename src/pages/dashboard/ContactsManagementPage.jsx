"use client";
import { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
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
  ArrowRight,
  MoreHorizontal,
  Plus,
  Edit,
  Trash2,
  Filter,
  X,
} from "lucide-react";
import { Axios, baseURL } from "../../../components/Helpers/Axios";
import { toast } from "react-toastify";
import Notifcation from "../../../components/Notification";

const ITEMS_PER_PAGE = 8;

export default function ContactsManagementPage() {
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectAll, setSelectAll] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState(new Set());
  const [sortField, setSortField] = useState("name");
  const [sortDirection, setSortDirection] = useState("asc");
  const [showFilters, setShowFilters] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(null);

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
            Loading Contats
          </h2>
          <p className="text-orange-600 max-w-md mb-6">
            Fetching your Contats data, please wait...
          </p>

          <div className="w-64 h-2 bg-orange-100 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-orange-400 to-orange-600 animate-progress"></div>
          </div>
        </div>
      </div>
    </div>
  );

  const fetchCategories = useCallback(async () => {
    setLoading(true);
    try {
      const res = await Axios.get("/admin/contacts");
      console.log(res);
      const data = Array.isArray(res.data?.data) ? res.data.data : [];
      setCategories(data);
      setFilteredCategories(data);
    } catch (err) {
      console.error("Failed to fetch categories", err);
      toast.error("Failed to load categories. Please try again later.");
      setCategories([]);
      setFilteredCategories([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  useEffect(() => {
    let filtered = [...categories];

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (c) =>
          c.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          c.description?.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }

    // Apply sorting
    filtered.sort((a, b) => {
      if (a[sortField] < b[sortField]) return sortDirection === "asc" ? -1 : 1;
      if (a[sortField] > b[sortField]) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });

    setFilteredCategories(filtered);
    setCurrentPage(1);
  }, [searchQuery, categories, sortField, sortDirection]);

  const totalPages = Math.ceil(filteredCategories.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentCategories = filteredCategories.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE,
  );

  const handleSelectAll = (checked) => {
    setSelectAll(checked);
    setSelectedCategories(
      checked ? new Set(currentCategories.map((c) => c.slug)) : new Set(),
    );
  };

  const handleSelectCategory = (id, checked) => {
    const newSelected = new Set(selectedCategories);
    checked ? newSelected.add(id) : newSelected.delete(id);
    setSelectedCategories(newSelected);
  };

  const handleDeleteCategory = async (id) => {
    if (!window.confirm("Are you sure you want to delete this category?"))
      return;

    setDeleteLoading(id);
    try {
      await Axios.delete(`admin/categories/${id}`);
      toast.success("Category deleted successfully");

      // Update state by removing the deleted category
      const updated = categories.filter((c) => c.id !== id);
      setCategories(updated);
    } catch (err) {
      console.error("Failed to delete", err);
      toast.error("Failed to delete category. Please try again.");
    } finally {
      setDeleteLoading(null);
    }
  };

  const handleBulkDelete = async () => {
    if (selectedCategories.size === 0) {
      toast.warning("Please select at least one category to delete");
      return;
    }

    const slugs = Array.from(selectedCategories);
    try {
      for (let slug of slugs) {
        await Axios.delete(`admin/categories/${slug}`).then((data) =>
          console.log(data),
        );
      }
      toast.success(`${slugs.length} categories deleted successfully`);

      // Update state by removing all deleted categories
      const updated = categories.filter((c) => !slugs.includes(c.slug));
      setCategories(updated);

      setSelectedCategories(new Set());
      setSelectAll(false);
    } catch (err) {
      console.error("Bulk delete failed", err);
      toast.error("Failed to delete categories. Please try again.");
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
      <DashboardHeader title="Conatcts Management" />

      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Manage Conatcs</h2>
            <p className="text-gray-600 mt-1">See your Contacts Messages</p>
          </div>
        </div>

        <Card className="shadow-lg border border-gray-200 rounded-xl overflow-hidden">
          <CardContent className="p-0">
            <div className="p-6 border-b border-gray-200 bg-white">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="relative w-full md:w-80">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Search Contacts..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 bg-gray-50 border-gray-200 rounded-lg"
                  />
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-orange-500 to-orange-600 px-6 py-3">
              <div className="grid grid-cols-12 gap-4 items-center">
                <div className="col-span-3 flex items-center space-x-3">
                  {/* <Checkbox
                    checked={selectAll}
                    onCheckedChange={handleSelectAll}
                    className="border-white data-[state=checked]:bg-white data-[state=checked]:text-orange-500"
                  /> */}
                  <span className="text-sm font-medium text-white">
                    Contact name
                  </span>
                </div>
                <div className="col-span-3">
                  <span className="text-sm font-medium text-white">Email</span>
                </div>
                <div className="col-span-3">
                  <span className="text-sm font-medium text-white">
                    Subject
                  </span>
                </div>
                <div className="col-span-3">
                  <button
                    className="text-sm font-medium text-white flex items-center"
                    onClick={() => toggleSort("created_at")}
                  >
                    Created Date {sortIndicator("created_at")}
                  </button>
                </div>
              </div>
            </div>

            <div className="divide-y divide-gray-200 bg-white">
              {currentCategories.length === 0 ? (
                <div className="text-center py-16">
                  <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                    <X className="h-8 w-8 text-gray-400" />
                  </div>
                  <h3 className="mt-4 text-lg font-medium text-gray-900">
                    No categories found
                  </h3>
                  <p className="mt-1 text-gray-500 max-w-md mx-auto">
                    {searchQuery
                      ? "No categories match your search. Try different keywords."
                      : "You haven't created any categories yet. Get started by adding your first category."}
                  </p>
                  <Link
                    to="/dashboard/categories/add"
                    className="mt-4 inline-block"
                  >
                    <Button className="bg-orange-500 hover:bg-orange-600">
                      <Plus className="h-4 w-4 mr-2" /> Add Category
                    </Button>
                  </Link>
                </div>
              ) : (
                currentCategories.map((category) => (
                  <div
                    key={category.id}
                    className="px-6 py-4 hover:bg-gray-50 transition-colors"
                  >
                    <div className="grid grid-cols-12 gap-4 items-center">
                      <div className="col-span-3 flex items-center space-x-3">
                        {/* <Checkbox
                          checked={selectedCategories.has(category.slug)}
                          onCheckedChange={(checked) =>
                            handleSelectCategory(category.slug, checked)
                          }
                        /> */}
                        <div className="flex items-center">
                          {/* <div className="rounded-xl w-10 h-10 flex items-center justify-center mr-3">
                        <img src={`${category.image}`} alt=""  className="w-full h-full object-cover"/>
                          </div> */}
                          <span className="text-sm font-medium text-gray-900">
                            {category.name}
                          </span>
                        </div>
                      </div>

                      <div className="col-span-3">
                        <span className="text-sm text-gray-600 line-clamp-2">
                          {category.email || "No email"}
                        </span>
                      </div>
                      <div className="col-span-3">
                        <span className="text-sm text-gray-600 line-clamp-2">
                          {category.subject || "No subject"}
                        </span>
                      </div>

                      <div className="col-span-3">
                        <span className="text-sm text-gray-600">
                          {new Date(category.created_at).toLocaleDateString(
                            "en-GB",
                            {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            },
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {totalPages > 1 && (
              <div className="px-6 py-4 border-t border-gray-200 flex flex-col sm:flex-row justify-between items-center gap-4 bg-white">
                <div className="text-sm text-gray-600">
                  Showing {startIndex + 1} to{" "}
                  {Math.min(
                    startIndex + ITEMS_PER_PAGE,
                    filteredCategories.length,
                  )}{" "}
                  of {filteredCategories.length} Contacts
                </div>

                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="flex items-center"
                  >
                    <ArrowLeft className="h-4 w-4 mr-1" /> Previous
                  </Button>

                  <div className="flex items-center space-x-1">
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      const pageNum =
                        totalPages <= 5
                          ? i + 1
                          : currentPage <= 3
                          ? i + 1
                          : currentPage >= totalPages - 2
                          ? totalPages - 4 + i
                          : currentPage - 2 + i;

                      return (
                        <Button
                          key={pageNum}
                          variant={
                            currentPage === pageNum ? "solid" : "outline"
                          }
                          onClick={() => setCurrentPage(pageNum)}
                          className={`w-10 h-10 p-0 flex items-center justify-center ${
                            currentPage === pageNum
                              ? "bg-orange-500 text-white border-orange-500"
                              : ""
                          }`}
                        >
                          {pageNum}
                        </Button>
                      );
                    })}

                    {totalPages > 5 && currentPage < totalPages - 2 && (
                      <span className="px-2">...</span>
                    )}

                    {totalPages > 5 && currentPage < totalPages - 2 && (
                      <Button
                        variant={
                          currentPage === totalPages ? "solid" : "outline"
                        }
                        onClick={() => setCurrentPage(totalPages)}
                        className={`w-10 h-10 p-0 ${
                          currentPage === totalPages
                            ? "bg-orange-500 text-white border-orange-500"
                            : ""
                        }`}
                      >
                        {totalPages}
                      </Button>
                    )}
                  </div>

                  <Button
                    variant="outline"
                    onClick={() =>
                      setCurrentPage(Math.min(totalPages, currentPage + 1))
                    }
                    disabled={currentPage === totalPages}
                    className="flex items-center"
                  >
                    Next <ArrowRight className="h-4 w-4 ml-1" />
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
