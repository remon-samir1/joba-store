// "use client";
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
  Download,
} from "lucide-react";
import { Axios } from "../../../components/Helpers/Axios";
import { toast } from "react-toastify";
import Notifcation from "../../../components/Notification";
import * as XLSX from 'xlsx';
import StringSlice from "../../../components/Helpers/StringSlice";

const ITEMS_PER_PAGE = 8;

export default function BlogsManagement() {
  const [loading, setLoading] = useState(true);
  const [contacts, setContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectAll, setSelectAll] = useState(false);
  const [selectedContacts, setSelectedContacts] = useState(new Set());
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
            Loading Contacts
          </h2>
          <p className="text-orange-600 max-w-md mb-6">
            Fetching your contacts data, please wait...
          </p>

          <div className="w-64 h-2 bg-orange-100 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-orange-400 to-orange-600 animate-progress"></div>
          </div>
        </div>
      </div>
    </div>
  );

  const exportToExcel = () => {
    if (filteredContacts.length === 0) {
      toast.warning("No data to export");
      return;
    }

    const data = filteredContacts.map(contact => ({
      "Contact Name": contact.name,
      "Email": contact.email,
      "Subject": contact.subject,
      "Message": contact.message || "",
      "Created Date": new Date(contact.created_at).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    }));

    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Contacts");
    XLSX.writeFile(wb, "contacts_export.xlsx");
  };

  const fetchContacts = useCallback(async () => {
    setLoading(true);
    try {
      const res = await Axios.get("/posts");
      const data = Array.isArray(res.data?.data) ? res.data.data : [];
      setContacts(data);
      setFilteredContacts(data);
    } catch (err) {
      toast.error("Failed to load contacts. Please try again later.");
      setContacts([]);
      setFilteredContacts([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchContacts();
  }, [fetchContacts]);

  useEffect(() => {
    let filtered = [...contacts];

    if (searchQuery) {
      filtered = filtered.filter(
        (contact) =>
          contact.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          contact.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          contact.subject?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    filtered.sort((a, b) => {
      if (a[sortField] < b[sortField]) return sortDirection === "asc" ? -1 : 1;
      if (a[sortField] > b[sortField]) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });

    setFilteredContacts(filtered);
    setCurrentPage(1);
  }, [searchQuery, contacts, sortField, sortDirection]);

  const totalPages = Math.ceil(filteredContacts.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentItems = filteredContacts.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const handleSelectAll = (checked) => {
    setSelectAll(checked);
    setSelectedContacts(
      checked ? new Set(currentItems.map((c) => c.id)) : new Set()
    );
  };

  const handleSelectContact = (id, checked) => {
    const newSelected = new Set(selectedContacts);
    checked ? newSelected.add(id) : newSelected.delete(id);
    setSelectedContacts(newSelected);
  };

  const handleDelete = async (id) => {
  
    setDeleteLoading(id);
    try {
      await Axios.post(`admin/posts/${id}`, {_method:'DELETE'});
      toast.success("Post deleted successfully");
      const updated = contacts.filter((c) => c.slug !== id);
      setContacts(updated);
    } catch (err) {
      toast.error("Failed to delete post. Please try again.");
    } finally {
      setDeleteLoading(null);
    }
  };

  const handleBulkDelete = async () => {
    if (selectedContacts.size === 0) {
      toast.warning("Please select at least one contact to delete");
      return;
    }

    const ids = Array.from(selectedContacts);
    try {
      for (let id of ids) {
        await Axios.delete(`admin/contacts/${id}`);
      }
      toast.success(`${ids.length} contacts deleted successfully`);
      const updated = contacts.filter((c) => !ids.includes(c.id));
      setContacts(updated);
      setSelectedContacts(new Set());
      setSelectAll(false);
    } catch (err) {
      toast.error("Failed to delete contacts. Please try again.");
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
      <DashboardHeader title="Contacts Management" />

      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Manage Contacts</h2>
            <p className="text-gray-600 mt-1">View and manage contact messages</p>
          </div>
        </div>

        <Card className="shadow-lg border border-gray-200 rounded-xl overflow-hidden">
          <CardContent className="p-0">
            <div className="p-6 border-b border-gray-200 bg-white">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="flex items-center justify-between gap-4 w-full">
                  <div className="relative w-full md:w-80">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      type="text"
                      placeholder="Search posts..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 bg-gray-50 border-gray-200 rounded-lg"
                    />
                  </div>
                  
                <Link to='add' className="px-4 whitespace-nowrap py-2 rounded bg-primary text-white ">Add Post</Link>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-orange-500 to-orange-600 px-6 py-3">
              <div className="grid grid-cols-12 gap-4 items-center">
                <div className="col-span-2 flex items-center space-x-3">
              
                  <span className="text-sm font-medium text-white">
                    Blog name
                  </span>
                </div>
                <div className="col-span-2">
                  <span className="text-sm font-medium text-white">Image</span>
                </div>
                <div className="col-span-3">
                  <span className="text-sm font-medium text-white">
                    Content
                  </span>
                </div>
              
                <div className="col-span-2">
                  <button
                    className="text-sm font-medium text-white flex items-center"
                    onClick={() => toggleSort("created_at")}
                  >
                    Created Date {sortIndicator("created_at")}
                  </button>
                </div>
                <div className="col-span-3">
                  <span className="text-sm font-medium text-white">
                    Action
                  </span>
                </div>
              </div>
            </div>

            <div className="divide-y divide-gray-200 bg-white">
              {currentItems.length === 0 ? (
                <div className="text-center py-16">
                  <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                    <X className="h-8 w-8 text-gray-400" />
                  </div>
                  <h3 className="mt-4 text-lg font-medium text-gray-900">
                    No contacts found
                  </h3>
                  <p className="mt-1 text-gray-500 max-w-md mx-auto">
                    {searchQuery
                      ? "No contacts match your search. Try different keywords."
                      : "No contacts available."}
                  </p>
                </div>
              ) : (
                currentItems.map((contact) => (
                  <div
                    key={contact.id}
                    className="px-6 py-4 hover:bg-gray-50 transition-colors"
                  >
                    <div className="grid grid-cols-12 gap-4 items-center">
                      <div className="col-span-2 flex items-center space-x-3">
                    
                        <div className="flex items-center">
                          <span className="text-sm font-medium text-gray-900">
                            {contact.title}
                          </span>
                        </div>
                      </div>

                      <div className="col-span-2">
                        <span className="text-sm text-gray-600 line-clamp-2">
                      <img src={contact.image} className="w-10 h-10" />
                        </span>
                      </div>
                      <div className="col-span-3">
                        <span dangerouslySetInnerHTML={{__html: StringSlice(contact.content , 20)|| "No content"}}  className="text-sm truncate text-gray-600 line-clamp-2">
                          {/* {} */}
                        </span>
                      </div>
                    

                      <div className="col-span-2 ">
                        <span className="text-sm  text-gray-600">
                          {new Date(contact.created_at).toLocaleDateString(
                            "en-GB",
                            {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            },
                          )}
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
                              <Link to={`/dashboard/blogs/edit/${contact.slug}`}>
                                <Edit className="h-4 w-4 mr-2" />
                                Edit
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="text-red-600"
                              onClick={() => handleDelete(contact.slug)}
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

            {totalPages > 1 && (
              <div className="px-6 py-4 border-t border-gray-200 flex flex-col sm:flex-row justify-between items-center gap-4 bg-white">
                <div className="text-sm text-gray-600">
                  Showing {startIndex + 1} to{" "}
                  {Math.min(
                    startIndex + ITEMS_PER_PAGE,
                    filteredContacts.length,
                  )}{" "}
                  of {filteredContacts.length} contacts
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