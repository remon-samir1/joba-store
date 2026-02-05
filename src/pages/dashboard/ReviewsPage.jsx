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
import {
  Search,
  Filter,
  Star,
  Eye,
  MessageSquare,
  ThumbsUp,
  ThumbsDown,
  Flag,
  Trash2,
  Loader,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Axios } from "../../../components/Helpers/Axios";
import Notifcation from "../../../components/Notification";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

const StarRating = ({ rating, size = "sm" }) => {
  return (
    <div className="flex items-center space-x-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`${size === "sm" ? "h-4 w-4" : "h-5 w-5"} ${
            star <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
          }`}
        />
      ))}
      <span className="ml-1 text-sm text-gray-600">({rating})</span>
    </div>
  );
};

export default function ReviewsPage() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [spinnner, setSpinner] = useState(false);
  const [statusFilter, setStatusFilter] = useState('');
  const [ratingFilter, setRatingFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(10);
  const [pagination, setPagination] = useState(null);
  const [page, setPage] = useState(1);
  const [statusUpdating, setStatusUpdating] = useState(null);
  const { i18n } = useTranslation();

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await Axios.get(
          `/admin/reviews?page=${page}&status=${statusFilter}&q=${searchTerm}`,
        );
        setReviews(response.data.data.data);
        console.log(response);
        setPagination({
          from: response.data.data.from,
          to: response.data.data.to,
          total: response.data.data.total,
          next_page_url: response.data.data.next_page_url,
          prev_page_url: response.data.data.prev_page_url,
        });
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [page , statusFilter , searchTerm]);

  const filteredReviews = reviews?.filter((review) => {
    // const matchesSearch =
    //   review.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    //   review.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    //   (review.product &&
    //     review.product.name.en
    //       .toLowerCase()
    //       .includes(searchTerm.toLowerCase())) ||
    //   review.comment.toLowerCase().includes(searchTerm.toLowerCase());

    // const matchesStatus =
    //   statusFilter === "all" || review.status === statusFilter;

    const matchesRating =
      ratingFilter === "all" || review.rating === parseInt(ratingFilter);

    return  matchesRating;
  });

  const handleDelete = async (id) => {
    setSpinner(id);
    try {
      await Axios.delete(`admin/reviews/${id}`).then((data) => {
        setReviews(reviews.filter((data) => data.id != id));
        toast.success("Deleted Successfly");
        setSpinner(false);
      });
    } catch (err) {
      setSpinner(false);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    setStatusUpdating(id);
    try {
      setReviews((prev) =>
        prev.map((review) =>
          review.id === id ? { ...review, status: newStatus } : review,
        ),
      );

      await Axios.post(`admin/reviews/${id}`, {
        status: newStatus,
        _method: "PUT",
      });
      toast.success("Status updated successfully");
    } catch (error) {
      setReviews((prev) =>
        prev.map((review) =>
          review.id === id ? { ...review, status: review.status } : review,
        ),
      );
      toast.error("Failed to update status");
    } finally {
      setStatusUpdating(null);
    }
  };

  const reviewStats = [
    {
      title: "Total Reviews",
      value: reviews.length.toString(),
      change: "",
      rating:
        reviews?.length > 0
          ? (
              reviews.reduce((acc, review) => acc + review.rating, 0) /
              reviews.length
            ).toFixed(1)
          : "0.0",
    },
    {
      title: "Pending Reviews",
      value: reviews?.filter((r) => r.status === "pending").length.toString(),
      change: "",
      rating:
        reviews?.filter((r) => r.status === "pending").length > 0
          ? (
              reviews
                .filter((r) => r.status === "pending")
                .reduce((acc, review) => acc + review.rating, 0) /
              reviews?.filter((r) => r.status === "pending").length
            ).toFixed(1)
          : "0.0",
    },
    {
      title: "Average Rating",
      value:
        reviews.length > 0
          ? (
              reviews.reduce((acc, review) => acc + review.rating, 0) /
              reviews.length
            ).toFixed(1)
          : "0.0",
      change: "",
      rating:
        reviews.length > 0
          ? (
              reviews.reduce((acc, review) => acc + review.rating, 0) /
              reviews.length
            ).toFixed(1)
          : "0.0",
    },
    {
      title: "Reported Reviews",
      value: "0",
      change: "",
      rating: "0.0",
    },
  ];

  const totalPages = Math.ceil(filteredReviews.length / perPage);
  const paginatedReviews = filteredReviews.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage,
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  if (loading) {
    return (
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
              Loading Reviews
            </h2>
            <p className="text-orange-600 max-w-md mb-6">
              Fetching your reviews data, please wait...
            </p>

            <div className="w-64 h-2 bg-orange-100 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-orange-400 to-orange-600 animate-progress"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-auto">
      <DashboardHeader title="Product Reviews" />
      <Notifcation />
      <div className="md:p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {reviewStats?.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      {stat.title}
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      {stat.title === "Average Rating"
                        ? stat.value
                        : stat.value}
                    </p>
                    <p className="text-xs text-gray-500">{stat.change}</p>
                  </div>
                  <div className="text-right">
                    <StarRating rating={parseFloat(stat.rating)} size="sm" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-center md:justify-between flex-wrap md:gap-0 gap-3">
              <CardTitle>All Reviews ({filteredReviews.length})</CardTitle>
              <div className="flex items-center justify-start space-x-2 flex-wrap md:gap-0 gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Search reviews..."
                    className="pl-10 w-80"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value=" ">All Status</SelectItem>
                    <SelectItem value="approved">Approved</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={ratingFilter} onValueChange={setRatingFilter}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Rating" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Ratings</SelectItem>
                    <SelectItem value="5">5 Stars</SelectItem>
                    <SelectItem value="4">4 Stars</SelectItem>
                    <SelectItem value="3">3 Stars</SelectItem>
                    <SelectItem value="2">2 Stars</SelectItem>
                    <SelectItem value="1">1 Star</SelectItem>
                  </SelectContent>
                </Select>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchTerm("");
                    setStatusFilter("all");
                    setRatingFilter("all");
                    setCurrentPage(1);
                  }}
                >
                  <Filter className="h-4 w-4 mr-2" />
                  Reset Filters
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="w-[90vw] md:w-full">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Customer</TableHead>
                  <TableHead>Product</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead>Review</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="w-40">Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedReviews.length > 0 ? (
                  reviews?.map((review) => (
                    <TableRow key={review.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{review.name}</div>
                          <div className="text-sm text-gray-500">
                            {review.email}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">
                        {(
                          i18n.language === "ar"
                            ? review.product?.name?.ar ||
                              review.product?.name?.en
                            : review.product?.name?.en
                        ) || "N/A"}
                      </TableCell>
                      <TableCell>
                        <StarRating rating={review.rating} />
                      </TableCell>
                      <TableCell>
                        <div className="max-w-xs">
                          <div className="text-sm text-gray-600">
                            {review.comment}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm">
                        {new Date(review.created_at).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        {statusUpdating === review.id ? (
                          <Loader className="h-4 w-4 animate-spin" />
                        ) : (
                          <Select
                            value={review.status}
                            onValueChange={(value) =>
                              handleStatusChange(review.id, value)
                            }
                            disabled={statusUpdating !== null}
                          >
                            <SelectTrigger
                              className={`w-32 ${
                                review.status === "approved"
                                  ? "bg-green-100 text-green-700"
                                  : review.status === "pending"
                                  ? "bg-yellow-100 text-yellow-700"
                                  : "bg-red-100 text-red-700"
                              }`}
                            >
                              <SelectValue placeholder="Status" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="approved">Approved</SelectItem>
                              <SelectItem value="pending">Pending</SelectItem>
                              <SelectItem value="rejected">Rejected</SelectItem>
                            </SelectContent>
                          </Select>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-1">
                          <Button
                            onClick={() => {
                              setSpinner(review.id);
                              handleDelete(review.id);
                            }}
                            variant="ghost"
                            size="sm"
                            disabled={spinnner}
                            className={`text-red-600 ${
                              spinnner && "cursor-not-allowed"
                            }`}
                          >
                            {spinnner === review.id ? (
                              <Loader className="h-4 w-4" />
                            ) : (
                              <Trash2 className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8">
                      No reviews found matching your criteria
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>

            {pagination && reviews.length > 0 && (
              <div className="flex flex-col md:flex-row items-center justify-between mt-6 gap-4">
                <p className="text-sm text-gray-700">
                  Showing <span className="font-medium">{reviews.length}</span>{" "}
                  of <span className="font-medium">{pagination.total}</span>{" "}
                  customers
                </p>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      setPage((prev) => (prev !== 1 ? prev - 1 : prev))
                    }
                    disabled={!pagination.prev_page_url}
                  >
                    Previous
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setPage((prev) => prev + 1)}
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
